"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: any;
    onRecaptchaV2Load?: () => void;
  }
}

type Props = {
  onTokenChange: (token: string) => void;
  onV2TokenChange: (token: string) => void;
  v2Required: boolean;
};

export function RecaptchaFields({ onTokenChange, onV2TokenChange, v2Required }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const v2Ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    if (document.querySelector('script[data-recaptcha-v3="true"]')) {
      setLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.defer = true;
    s.dataset.recaptchaV3 = "true";
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, [siteKey]);

  useEffect(() => {
    if (!v2Required || !siteKey || !v2Ref.current) return;
    const renderV2 = () => {
      if (!window.grecaptcha?.render || widgetId.current !== null) return;
      widgetId.current = window.grecaptcha.render(v2Ref.current, {
        sitekey: siteKey,
        callback: (token: string) => onV2TokenChange(token),
        "expired-callback": () => onV2TokenChange(""),
      });
    };
    if (window.grecaptcha?.render) {
      renderV2();
      return;
    }
    const existing = document.querySelector('script[data-recaptcha-v2="true"]') as HTMLScriptElement | null;
    if (!existing) {
      window.onRecaptchaV2Load = renderV2;
      const s = document.createElement("script");
      s.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaV2Load&render=explicit";
      s.async = true;
      s.defer = true;
      s.dataset.recaptchaV2 = "true";
      document.head.appendChild(s);
    } else {
      existing.addEventListener("load", renderV2);
    }
  }, [v2Required, siteKey, onV2TokenChange]);

  useEffect(() => {
    if (!siteKey || !loaded || v2Required) return;
    let cancelled = false;
    const run = async () => {
      try {
        if (!window.grecaptcha?.execute) return;
        const token = await window.grecaptcha.execute(siteKey, { action: "submit" });
        if (!cancelled) onTokenChange(token);
      } catch {
        if (!cancelled) onTokenChange("");
      }
    };
    run();
    const id = window.setInterval(run, 90_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [siteKey, loaded, v2Required, onTokenChange]);

  if (!siteKey) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      {v2Required ? (
        <div>
          <p style={{ fontSize: 13, color: "#686868", marginBottom: 8 }}>Please complete the verification below.</p>
          <div ref={v2Ref} />
        </div>
      ) : (
        <p style={{ fontSize: 12, color: "#888", marginBottom: 0 }}>This form is protected by reCAPTCHA.</p>
      )}
    </div>
  );
}
