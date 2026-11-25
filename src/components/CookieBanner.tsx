"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { siteConfig } from "@/lib/site";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(siteConfig.cookieConsentKey);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    Cookies.set(siteConfig.cookieConsentKey, "accepted", { expires: 180, sameSite: "lax" });
    setVisible(false);
  };

  const decline = () => {
    Cookies.set(siteConfig.cookieConsentKey, "declined", { expires: 180, sameSite: "lax" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p>
        We use cookies to remember your preferences and improve your experience on SUPER Chris Pies and Pastries.
        You can accept or decline non-essential cookies.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn accept" onClick={accept}>
          Accept
        </button>
        <button type="button" className="cookie-btn decline" onClick={decline}>
          Decline
        </button>
      </div>
    </div>
  );
}
