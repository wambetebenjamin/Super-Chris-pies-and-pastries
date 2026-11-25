"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  return (
    <div id="footer" className="footer-main">
      <div className="footer-box pad-top-70">
        <div className="container">
          <div className="row">
            <div className="footer-in-main">
              <div className="footer-logo">
                <div className="text-center">
                  <Link href="/" aria-label="SUPER Chris Pies and Pastries home">
                    <span className="logo-text" style={{ fontSize: 40 }}>
                      <span>SUPER</span> Chris
                      <small>Pies and Pastries</small>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-box-a">
                  <h3>{t("nav.about")}</h3>
                  <p>{t("footer.about")}</p>
                  <p style={{ marginTop: 12, color: "#fff", fontStyle: "italic" }}>{t("footer.warmLine")}</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-box-b">
                  <h3>{t("footer.quickLinks")}</h3>
                  <ul>
                    <li><Link href="/menu">{t("nav.menu")}</Link></li>
                    <li><Link href="/custom">{t("nav.custom")}</Link></li>
                    <li><Link href="/classes">{t("nav.classes")}</Link></li>
                    <li><Link href="/gallery">{t("nav.gallery")}</Link></li>
                    <li><Link href="/order">{t("nav.order")}</Link></li>
                    <li><Link href="/contact">{t("nav.contact")}</Link></li>
                    <li><Link href="/privacy">Privacy</Link></li>
                    <li><Link href="/terms">Terms</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-box-c">
                  <h3>{t("footer.contact")}</h3>
                  <p>
                    <i className="fa fa-map-signs" aria-hidden="true"></i>
                    <span>{siteConfig.location}. {siteConfig.serviceArea}.</span>
                  </p>
                  <p>
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                    <span>
                      <a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.phone} ({siteConfig.whatsappDisplay})</a>
                    </span>
                  </p>
                  <p>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>
                      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                    </span>
                  </p>
                  <p>
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                    <span>
                      <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp: {siteConfig.whatsappDisplay}
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="footer-box-d">
                  <h3>{t("footer.hours")}</h3>
                  <ul>
                    <li>
                      <p>{t("footer.hoursWeek")}</p>
                      <span>{t("footer.hoursWeekTime")}</span>
                    </li>
                    <li>
                      <p>{t("footer.hoursSun")}</p>
                      <span>{t("footer.hoursSunTime")}</span>
                    </li>
                  </ul>
                  <div className="footer-cta">
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi SUPER Chris Pies and Pastries, I would like to place an order.")}`}
                      className="btn-primary-sc white-hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("common.orderOnWhatsApp")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="copyright" className="copyright-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h6 className="copy-title">
                  Copyright &copy; {year} {t("footer.copyright")}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
