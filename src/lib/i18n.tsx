"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import en from "@/messages/en.json";
import sw from "@/messages/sw.json";

export type Locale = "en" | "sw";

type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, sw };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getByPath(obj: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : undefined;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = Cookies.get("sc-locale");
    if (saved === "en" || saved === "sw") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    Cookies.set("sc-locale", next, { expires: 365, sameSite: "lax" });
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (path: string) => getByPath(messages[locale], path) ?? getByPath(messages.en, path) ?? path,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
