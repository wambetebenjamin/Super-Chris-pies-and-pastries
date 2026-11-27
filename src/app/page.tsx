"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

const specials = [
  {
    title: "Fresh Meat Pies",
    titleSw: "Pai za Nyama Safi",
    desc: "Golden crust, savoury filling, and that homemade taste that goes perfectly with chai.",
    descSw: "Ukoko wa dhahabu, kujazwa kitamu, na ladha ya nyumbani inayofaa sana na chai.",
    image: "/images/repo/repo-10.jpg",
  },
  {
    title: "Flaky Pastries",
    titleSw: "Vitafunwa Vitamu",
    desc: "Light, buttery layers baked fresh for breakfast, tea time, or a sweet treat any day.",
    descSw: "Tabaka nyepesi na laini zilizookwa fresh kwa kifungua kinywa au chai.",
    image: "/images/repo/repo-15.jpg",
  },
  {
    title: "Custom Celebration Cakes",
    titleSw: "Keki Maalum za Sherehe",
    desc: "Beautiful cakes made to order for birthdays, weddings, and every special moment.",
    descSw: "Keki nzuri zilizotengenezwa kwa oda kwa siku za kuzaliwa, harusi, na sherehe.",
    image: "/images/repo/repo-20.jpg",
  },
  {
    title: "Savoury Bites",
    titleSw: "Vitafunwa vya Chumvi",
    desc: "Tasty snacks and savoury pastries, perfect for events, meetings, and family gatherings.",
    descSw: "Vitafunwa vitamu vinavyofaa kwa matukio, mikutano, na familia.",
    image: "/images/repo/repo-25.jpg",
  },
];

const heroSlides = [
  "/images/repo/repo-10.jpg",
  "/images/repo/repo-15.jpg",
  "/images/repo/repo-20.jpg",
  "/images/repo/repo-25.jpg",
];

const galleryPreview = [
  "/images/repo/repo-05.jpg",
  "/images/repo/repo-08.jpg",
  "/images/repo/repo-12.jpg",
  "/images/repo/repo-18.jpg",
  "/images/repo/repo-22.jpg",
  "/images/repo/repo-30.jpg",
];

export default function HomePage() {
  const { locale, t } = useLocale();
  const isSw = locale === "sw";
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div
        id="banner"
        className="banner static-banner full-screen-mode parallax"
        aria-label={isSw ? "SUPER Chris Bakery" : "SUPER Chris Pies and Pastries"}
      >
        <div className="home-hero-slides" aria-hidden="true">
          {heroSlides.map((image, index) => (
            <div
              key={image}
              className={`home-hero-slide${index === activeHeroSlide ? " is-active" : ""}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <h1>
                    {isSw ? "Pai safi za " : "Fresh bakes with "}
                    <span className="typer" style={{ color: "#e75b1e" }}>
                      {isSw ? "upendo wa SUPER" : "SUPER heart"}
                    </span>
                  </h1>
                  <h2>{t("home.heroSubtitle")}</h2>
                  <p>{t("home.heroBody")}</p>
                  <div className="book-btn" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                      href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to place an order. Please help me with your menu and availability.")}
                      className="table-btn hvr-underline-from-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("common.orderNow")}
                    </a>
                    <Link href="/classes" className="table-btn hvr-underline-from-center" style={{ background: "transparent" }}>
                      {t("common.bookClass")}
                    </Link>
                  </div>
                  <a href="#about" aria-label="Scroll to about section">
                    <div className="mouse"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="about-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title">{t("home.storyTitle")}</h2>
                <h3>{t("home.storyHeading")}</h3>
                <p>{t("home.storyP1")}</p>
                <p>{t("home.storyP2")}</p>
                <p>{t("home.storyP3")}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <Link href="/about" className="btn-primary-sc">{t("common.learnMore")}</Link>
                  <a
                    href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to know more about your bakery and place an order.")}
                    className="btn-outline-sc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("common.whatsappUs")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <div className="about-images">
                  <Image className="about-main" src="/images/repo/repo-06.jpg" alt="Fresh pies and pastries from SUPER Chris Pies and Pastries" width={500} height={500} style={{ width: "100%", height: "auto" }} />
                  <Image className="about-inset" src="/images/repo/repo-03.jpg" alt="Close up of a freshly baked pastry" width={200} height={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="special-menu pad-top-100 parallax" style={{ backgroundImage: "url(/images/repo/repo-30.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title color-white text-center">{t("home.specialTitle")}</h2>
                <h5 className="title-caption text-center">{t("home.specialCaption")}</h5>
              </div>
              <div className="special-box">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  {specials.map((item) => (
                    <div key={item.title} className="item item-type-zoom" style={{ margin: 0 }}>
                      <div className="item-hover" style={{ position: "absolute" }}>
                        <div className="item-info">
                          <div className="headline">
                            {isSw ? item.titleSw : item.title}
                            <div className="line"></div>
                            <div className="dit-line">{isSw ? item.descSw : item.desc}</div>
                          </div>
                        </div>
                      </div>
                      <div className="item-img">
                        <Image src={item.image} alt={isSw ? item.titleSw : item.title} width={600} height={450} style={{ width: "100%", height: 320, objectFit: "cover" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Link href="/menu" className="btn-primary-sc white-hover">{t("common.viewMenu")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className="block-title text-center">{t("home.howToOrderTitle")}</h2>
              <p className="title-caption text-center" style={{ color: "#666" }}>{t("home.howToOrderCaption")}</p>
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            {[
              { icon: "fa-search", title: t("home.step1Title"), body: t("home.step1Body") },
              { icon: "fa-whatsapp", title: t("home.step2Title"), body: t("home.step2Body") },
              { icon: "fa-heart", title: t("home.step3Title"), body: t("home.step3Body") },
            ].map((step, idx) => (
              <div key={step.title} className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
                <div className="sc-card" style={{ textAlign: "center" }}>
                  <div className="sc-card-body" style={{ padding: 32 }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e75b1e", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 18 }}>
                      <i className={`fa ${step.icon}`} aria-hidden="true"></i>
                    </div>
                    <div style={{ fontFamily: "'nautilus_pompiliusregular'", fontSize: 22, color: "#e75b1e", marginBottom: 8 }}>Step {idx + 1}</div>
                    <h3 style={{ fontSize: 28 }}>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <a
              href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to place an order. Here is what I need:")}
              className="btn-primary-sc"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("common.orderOnWhatsApp")}
            </a>
          </div>
        </div>
      </div>

      <div className="team-main pad-top-100 pad-bottom-100 parallax" style={{ backgroundImage: "url(/images/repo/repo-35.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title text-center">{t("home.classesTeaserTitle")}</h2>
                <p className="title-caption text-center">{t("home.classesTeaserBody")}</p>
                <div style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/classes" className="btn-primary-sc white-hover">{t("common.viewClasses")}</Link>
                  <a
                    href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to book a baking class. Please share the schedule and availability.")}
                    className="btn-outline-sc"
                    style={{ color: "#fff", borderColor: "#fff" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("common.reserveOnWhatsApp")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title text-center">{t("home.galleryTitle")}</h2>
                <p className="title-caption text-center" style={{ color: "#666" }}>{t("home.galleryCaption")}</p>
              </div>
              <div className="gallery-grid" style={{ marginTop: 24 }}>
                {galleryPreview.map((src, i) => (
                  <div key={src} className="gallery-item">
                    <Image src={src} alt={`SUPER Chris Pies and Pastries baked goods photo ${i + 1}`} width={800} height={600} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <Link href="/gallery" className="btn-primary-sc">{isSw ? "Tazama Picha Zote" : "View full gallery"}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-band">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <h2>{isSw ? "Tayari kuagiza kitu kitamu?" : "Ready for something delicious?"}</h2>
              <p>
                {isSw
                  ? "Tuma oda yako au swali lako kupitia WhatsApp. Tutakujibu haraka na kukuthibitishia maelezo."
                  : "Send your order or question on WhatsApp. We will respond quickly and confirm every detail with you."}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to place an order.")}
                  className="btn-primary-sc white-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("common.orderOnWhatsApp")}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn-outline-sc" style={{ borderColor: "#fff", color: "#fff" }}>
                  {t("common.emailUs")}
                </a>
              </div>
              <p style={{ marginTop: 20, fontSize: 14, color: "#ddd" }}>{t("common.artisanNote")} {t("common.allergenNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
