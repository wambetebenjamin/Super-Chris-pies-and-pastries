"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const galleryImages = [
  { src: "/images/repo/repo-01.jpg", alt: "SUPER Chris Pies and Pastries baked product" },
  { src: "/images/repo/repo-02.jpg", alt: "Fresh pastry from SUPER Chris Pies and Pastries" },
  { src: "/images/repo/repo-03.jpg", alt: "Bakery item close up" },
  { src: "/images/repo/repo-04.jpg", alt: "Fresh baked treat" },
  { src: "/images/repo/repo-05.jpg", alt: "Pie from SUPER Chris Pies and Pastries" },
  { src: "/images/repo/repo-06.jpg", alt: "Pastry selection" },
  { src: "/images/repo/repo-07.jpg", alt: "Fresh pie on display" },
  { src: "/images/repo/repo-08.jpg", alt: "Baked goods from the kitchen" },
  { src: "/images/repo/repo-09.jpg", alt: "Savoury pie" },
  { src: "/images/repo/repo-10.jpg", alt: "Freshly baked pies" },
  { src: "/images/repo/repo-11.jpg", alt: "Pastry assortment" },
  { src: "/images/repo/repo-12.jpg", alt: "Bakery display" },
  { src: "/images/repo/repo-13.jpg", alt: "Sausage roll or savoury pastry" },
  { src: "/images/repo/repo-14.jpg", alt: "Sweet pastry" },
  { src: "/images/repo/repo-15.jpg", alt: "Flaky pastry" },
  { src: "/images/repo/repo-16.jpg", alt: "Baked treat from SUPER Chris" },
  { src: "/images/repo/repo-17.jpg", alt: "Fresh bakery product" },
  { src: "/images/repo/repo-18.jpg", alt: "Pastries and pies" },
  { src: "/images/repo/repo-19.jpg", alt: "Bakery creation" },
  { src: "/images/repo/repo-20.jpg", alt: "Custom cake or celebration bake" },
  { src: "/images/repo/repo-21.jpg", alt: "Cupcakes or sweet bakes" },
  { src: "/images/repo/repo-22.jpg", alt: "Decorated baked goods" },
  { src: "/images/repo/repo-23.jpg", alt: "Custom order bake" },
  { src: "/images/repo/repo-24.jpg", alt: "Event platter or savoury bites" },
  { src: "/images/repo/repo-25.jpg", alt: "Savoury pastry selection" },
  { src: "/images/repo/repo-26.jpg", alt: "Spiced savoury bake" },
  { src: "/images/repo/repo-27.jpg", alt: "Bakery product photo" },
  { src: "/images/repo/repo-28.jpg", alt: "Sweet treat box" },
  { src: "/images/repo/repo-29.jpg", alt: "Fruit pastry or sweet bake" },
  { src: "/images/repo/repo-30.jpg", alt: "Fresh bakes from SUPER Chris" },
  { src: "/images/repo/repo-31.jpg", alt: "Seasonal baked item" },
  { src: "/images/repo/repo-32.jpg", alt: "Bakery showcase" },
  { src: "/images/repo/repo-33.jpg", alt: "Custom pastry order" },
  { src: "/images/repo/repo-34.jpg", alt: "Fresh from the oven" },
  { src: "/images/repo/repo-35.jpg", alt: "Baking class or kitchen moment" },
  { src: "/images/repo/repo-36.jpg", alt: "Pastry making class" },
  { src: "/images/repo/repo-37.jpg", alt: "Baking in progress" },
  { src: "/images/repo/repo-38.jpg", alt: "Cake decorating class" },
  { src: "/images/repo/repo-39.jpg", alt: "Class activity" },
  { src: "/images/repo/repo-40.jpg", alt: "Hands-on baking session" },
  { src: "/images/repo/repo-41.jpg", alt: "Baking class participants or result" },
  { src: "/images/repo/repo-42.jpg", alt: "Fresh baked product" },
  { src: "/images/repo/repo-43.jpg", alt: "Bakery treat" },
  { src: "/images/repo/repo-44.jpg", alt: "Pies and pastries display" },
  { src: "/images/repo/repo-45.jpg", alt: "Baked goods close up" },
  { src: "/images/repo/repo-46.jpg", alt: "SUPER Chris bakery item" },
  { src: "/images/repo/repo-47.jpg", alt: "Fresh pastry product" },
  { src: "/images/repo/repo-48.jpg", alt: "Bakery creation" },
  { src: "/images/repo/repo-49.jpg", alt: "Sweet or savoury bake" },
  { src: "/images/repo/repo-50.jpg", alt: "Fresh baked goods" },
  { src: "/images/repo/repo-51.jpg", alt: "Bakery selection" },
  { src: "/images/repo/repo-52.jpg", alt: "SUPER Chris Pies and Pastries product" },
];

export default function GalleryPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-18.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Picha Zetu" : "Gallery"}</h1>
          <p>
            {isSw
              ? "Picha halisi za bidhaa zetu, mafunzo, na matukio ya SUPER Chris Pies and Pastries."
              : "Real photos of our bakes, classes, and moments from SUPER Chris Pies and Pastries."}
          </p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className="block-title text-center">{isSw ? "Safi Kutoka Jikoni" : "Fresh from the Kitchen"}</h2>
              <p className="section-lead">
                {isSw
                  ? "Hizi ni picha halisi kutoka kwenye repository ya SUPER Chris Pies and Pastries."
                  : "These are real photos from the SUPER Chris Pies and Pastries repository."}
              </p>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <a href={siteConfig.driveGalleryUrl} className="btn-outline-sc" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-google" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  {isSw ? "Tazama picha zaidi kwenye Google Drive" : "View photo gallery on Google Drive"}
                </a>
              </div>
              <div className="gallery-grid">
                {galleryImages.map((img, i) => (
                  <div key={img.src} className="gallery-item">
                    <Image src={img.src} alt={img.alt} width={900} height={700} style={{ width: "100%", height: "100%", minHeight: 260, objectFit: "cover" }} />
                    <div className="gallery-caption">{img.alt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
