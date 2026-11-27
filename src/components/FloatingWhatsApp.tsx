"use client";

import { siteConfig, whatsappUrl } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

export function FloatingWhatsApp() {
  const { t } = useLocale();
  const href = whatsappUrl(
    "Hi SUPER Chris Pies and Pastries, I would like to place an order or ask about a baking class. Please share details."
  );
  return (
    <a
      href={href}
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("common.whatsappUs")}
      title={t("common.whatsappUs")}
    >
      <i className="fa fa-whatsapp" aria-hidden="true"></i>
    </a>
  );
}
