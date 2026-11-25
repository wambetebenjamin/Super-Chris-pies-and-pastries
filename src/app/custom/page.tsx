"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

export default function CustomPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-20.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Oda Maalum" : "Custom Orders"}</h1>
          <p>
            {isSw
              ? "Keki, pai, na vitafunwa maalum kwa sherehe yako. Tuambie wazo lako, tutalifanya liwe kweli."
              : "Custom cakes, pies, and event treats made for your celebration. Tell us your idea and we will bring it to life."}
          </p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <h2 className="block-title">{isSw ? "Imeundwa kwa Ajili Yako" : "Made for Your Moment"}</h2>
              <h3>{isSw ? "KILA SHEREHE INASTAHILI KITU MAALUM" : "EVERY CELEBRATION DESERVES SOMETHING SPECIAL"}</h3>
              <p>
                {isSw
                  ? "Iwe ni siku ya kuzaliwa, harusi, sherehe ya ofisi, au mkusanyiko wa familia, tunaweza kutengeneza oda maalum inayofaa tukio lako."
                  : "Whether it is a birthday, wedding, office celebration, or family gathering, we can create a custom order that fits your occasion perfectly."}
              </p>
              <p>
                {isSw
                  ? "Tunakusikiliza, tunashauri ladha na ukubwa, na tunathibitisha kila kitu kupitia WhatsApp kabla ya kuanza."
                  : "We listen to your idea, suggest flavours and sizes, and confirm every detail on WhatsApp before we start baking."}
              </p>
              <div style={{ marginTop: 24 }}>
                <a
                  href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to place a custom order. Occasion: ____. Flavour: ____. Size/quantity: ____. Date needed: ____.")}
                  className="btn-primary-sc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isSw ? "Agiza Maalum kwenye WhatsApp" : "Start Custom Order on WhatsApp"}
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <Image src="/images/repo/repo-23.jpg" alt="Custom cake and pastry order from SUPER Chris Pies and Pastries" width={900} height={700} style={{ width: "100%", height: "auto", border: "10px solid #f1f1f1" }} />
            </div>
          </div>

          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Ladha" : "Flavours"}</h3>
                <ul>
                  <li>{isSw ? "Vanilla, chocolate, red velvet, na ladha za matunda" : "Vanilla, chocolate, red velvet, and fruit flavours"}</li>
                  <li>{isSw ? "Pai za nyama, kuku, au mboga" : "Meat, chicken, or vegetable pies"}</li>
                  <li>{isSw ? "Vitafunwa vitamu na vya chumvi" : "Sweet and savoury pastry assortments"}</li>
                  <li>{isSw ? "Ladha maalum zinaweza kujadiliwa" : "Special flavour requests can be discussed"}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Ukubwa na Wingi" : "Sizes and Quantities"}</h3>
                <ul>
                  <li>{isSw ? "Keki ndogo hadi kubwa za sherehe" : "Small to large celebration cakes"}</li>
                  <li>{isSw ? "Sanduku za cupcakes na vitafunwa" : "Cupcake boxes and pastry boxes"}</li>
                  <li>{isSw ? "Pai za mtu mmoja au sahani za tukio" : "Individual pies or event platters"}</li>
                  <li>{isSw ? "Bei inategemea ukubwa na muundo" : "Pricing depends on size and design"}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Muda wa Kuagiza" : "Lead Time"}</h3>
                <ul>
                  <li>{isSw ? "Oda rahisi: angalau saa 24 kabla" : "Simple orders: at least 24 hours notice"}</li>
                  <li>{isSw ? "Keki maalum: siku 2 hadi 5 mapema" : "Custom cakes: 2 to 5 days notice"}</li>
                  <li>{isSw ? "Oda kubwa za matukio: wiki 1 inapendekezwa" : "Large event orders: 1 week recommended"}</li>
                  <li>{isSw ? "Tunahakikisha muda kupitia WhatsApp" : "We confirm timing on WhatsApp"}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="info-strip">
            <h3>{isSw ? "Maelezo Muhimu" : "Important Notes"}</h3>
            <ul>
              <li>{isSw ? "Oda zote huthibitishwa kupitia WhatsApp." : "All orders confirmed on WhatsApp."}</li>
              <li>{isSw ? "Maelezo ya mzio yanapatikana ukiomba." : "Allergen notes available on request."}</li>
              <li>{isSw ? "Tafadhali eleza kama kuna mzio au mahitaji maalum ya chakula." : "Please let us know about allergies or dietary requirements when ordering."}</li>
            </ul>
            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={siteConfig.driveMenuUrl} className="btn-outline-sc" target="_blank" rel="noopener noreferrer">
                {isSw ? "Tazama menyu kamili" : "View full menu on Google Drive"}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-outline-sc">{siteConfig.email}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
