"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

export function VoiceTour() {
  const { t } = useLocale();
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggle = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(t("voice.text"));
    utterance.lang = "en-KE";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    const voices = synth.getVoices();
    const enKe = voices.find((v) => v.lang.toLowerCase() === "en-ke");
    const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (enKe) utterance.voice = enKe;
    else if (enVoice) utterance.voice = enVoice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      className="voice-tour-btn"
      onClick={toggle}
      aria-pressed={speaking}
      aria-label={speaking ? t("voice.stop") : t("voice.start")}
      title={speaking ? t("voice.stop") : t("voice.start")}
    >
      <i className={`fa ${speaking ? "fa-stop" : "fa-volume-up"}`} aria-hidden="true"></i>
    </button>
  );
}
