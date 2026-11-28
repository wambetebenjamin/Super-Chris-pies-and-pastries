"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { categories, items } from "@/lib/products";

export default function MenuPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";
  const [sharedLabels, setSharedLabels] = useState<Record<string, string>>({});
  const [hasSharedLabels, setHasSharedLabels] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/photo-labels", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data: { labels?: Record<string, string> } | null) => {
        if (!active || !data?.labels) return;
        setSharedLabels(data.labels);
        setHasSharedLabels(Object.keys(data.labels).length > 0);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const sharedImageByName = Object.fromEntries(
    Object.entries(sharedLabels)
      .filter(([, label]) => label && label !== "__skip__")
      .map(([filename, label]) => [label, `/images/repo/${filename}`]),
  );

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-12.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Menyu Yetu" : "Our Menu"}</h1>
          <p>
            {isSw
              ? "Pai safi, vitafunwa, keki, na zaidi. Chagua unachopenda na uagize kupitia WhatsApp."
              : "Fresh pies, pastries, cakes, and more. Choose your favourite and order directly on WhatsApp."}
          </p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className="block-title text-center">{isSw ? "Kila Kitu Kimeokwa kwa Upendo" : "Baked with Love"}</h2>
              <p className="section-lead">
                {isSw
                  ? "Bidhaa zote 50 zimeorodheshwa moja moja. Tunathibitisha upatikanaji na bei kupitia WhatsApp."
                  : "All 50 items are listed individually. We confirm availability and pricing on WhatsApp."}
              </p>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <a href={siteConfig.driveMenuUrl} className="btn-outline-sc" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-file-pdf-o" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  {isSw ? "Tazama menyu kamili kwenye Google Drive" : "View full menu on Google Drive"}
                </a>
              </div>
            </div>
          </div>

          {categories.map((cat) => {
            const catItems = items.filter((i) => i.category === cat.id);
            if (catItems.length === 0) return null;
            return (
              <div key={cat.id} style={{ marginBottom: 50 }}>
                <h3 className="block-title" style={{ fontSize: 40, marginBottom: 24 }}>{isSw ? cat.sw : cat.en}</h3>
                <div className="row">
                  {catItems.map((item) => {
                    const itemImage = hasSharedLabels ? sharedImageByName[item.name] : item.image;
                    return (
                    <div key={item.name} className="col-lg-4 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
                      <div className="sc-card">
                        {itemImage ? (
                          <Image src={itemImage} alt={item.name} width={800} height={600} style={{ width: "100%", height: 240, objectFit: "cover" }} />
                        ) : null}
                        <div className="sc-card-body">
                          <h3>{item.name}</h3>
                          <p>{isSw ? "Tuulize kuhusu upatikanaji na bei." : "Ask us about availability and pricing."}</p>
                          <div className="price-band">{isSw ? "Uliza bei" : "Ask for price"}</div>
                          <a
                            href={whatsappUrl(`Hi SUPER Chris Pies and Pastries, I would like to order: ${item.name}. Please confirm availability and price.`)}
                            className="btn-primary-sc"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: "100%" }}
                          >
                            {isSw ? "Agiza kupitia WhatsApp" : "Order on WhatsApp"}
                          </a>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="info-strip">
            <h3>{isSw ? "Maelezo Muhimu" : "Good to Know"}</h3>
            <ul>
              <li>{isSw ? "Bakery ya ufundi. Oda zote huthibitishwa kupitia WhatsApp." : "Artisan bakery. All orders confirmed on WhatsApp."}</li>
              <li>{isSw ? "Maelezo ya mzio yanapatikana ukiomba." : "Allergen notes available on request."}</li>
              <li>{isSw ? "Kwa oda kubwa au maalum, tafadhali wasiliana mapema." : "For large or custom orders, please reach out in advance."}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
