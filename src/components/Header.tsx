"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/menu", key: "nav.menu" },
  { href: "/custom", key: "nav.custom" },
  { href: "/classes", key: "nav.classes" },
  { href: "/about", key: "nav.about" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/order", key: "nav.order" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [fixed, setFixed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div id="site-header">
      <header id="header" className={`header-block-top${fixed ? " fixed-menu" : ""}`}>
        <div className="container">
          <div className="row">
            <div className="main-menu">
              <nav className="navbar navbar-default" id="mainNav" aria-label="Main navigation">
                <div className="navbar-header">
                  <button
                    type="button"
                    className={`navbar-toggle${open ? " active" : ""}`}
                    aria-expanded={open}
                    aria-controls="navbar"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen((v) => !v)}
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <div className="logo">
                    <Link className="navbar-brand js-scroll-trigger logo-header" href="/" aria-label="SUPER Chris Pies and Pastries home">
                      <span className="logo-text">
                        <span>SUPER</span> Chris
                        <small>Pies and Pastries</small>
                      </span>
                    </Link>
                  </div>
                </div>
                <div id="navbar" className={`navbar-collapse collapse${open ? " in show" : ""}`}>
                  <ul className="nav navbar-nav navbar-right">
                    {navItems.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <li key={item.href} className={active ? "active" : undefined}>
                          <Link href={item.href} onClick={() => setOpen(false)}>
                            {t(item.key)}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <div className="lang-switch" aria-label="Language switcher">
                        <button
                          type="button"
                          className={locale === "en" ? "active" : ""}
                          onClick={() => setLocale("en")}
                          aria-pressed={locale === "en"}
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          className={locale === "sw" ? "active" : ""}
                          onClick={() => setLocale("sw")}
                          aria-pressed={locale === "sw"}
                        >
                          SW
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
