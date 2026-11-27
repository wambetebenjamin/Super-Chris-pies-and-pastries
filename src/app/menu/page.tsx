"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

type MenuItem = {
  name: string;
  category: string;
  image: string;
};

const categories = [
  { id: "pies", en: "Pies", sw: "Pai" },
  { id: "savoury", en: "Savoury", sw: "Vya Chumvi" },
  { id: "croissants-danish", en: "Croissants & Danish", sw: "Croissant na Danish" },
  { id: "rolls", en: "Cinnamon Rolls", sw: "Roli za Mdalasini" },
  { id: "cookies-treats", en: "Cookies & Treats", sw: "Biskuti na Vitamu" },
];

const productNames: { name: string; category: string }[] = [
  { name: "Minced Beef Pie", category: "pies" },
  { name: "Chicken Pie", category: "pies" },
  { name: "Classic Butter Croissant", category: "croissants-danish" },
  { name: "Classic Cinnamon Roll", category: "rolls" },
  { name: "Blueberry Danish", category: "croissants-danish" },
  { name: "Sausage Roll", category: "savoury" },
  { name: "Samosa", category: "savoury" },
  { name: "Vegetable Pie", category: "pies" },
  { name: "Apple Pie", category: "pies" },
  { name: "Cherry Pie", category: "pies" },
  { name: "Chocolate Pie", category: "pies" },
  { name: "Lemon Meringue", category: "pies" },
  { name: "Chocolate Croissant", category: "croissants-danish" },
  { name: "Almond Croissant", category: "croissants-danish" },
  { name: "Pecan Cinnamon Roll", category: "rolls" },
  { name: "Blueberry Pie", category: "pies" },
  { name: "Pumpkin Pie", category: "pies" },
  { name: "Pecan Pie", category: "pies" },
  { name: "Key Lime Pie", category: "pies" },
  { name: "Peach Pie", category: "pies" },
  { name: "Banana Cream", category: "pies" },
  { name: "Coconut Cream", category: "pies" },
  { name: "Sweet Potato Pie", category: "pies" },
  { name: "Blackberry Pie", category: "pies" },
  { name: "Cheese Croissant", category: "croissants-danish" },
  { name: "Raspberry Danish", category: "croissants-danish" },
  { name: "Apple Danish", category: "croissants-danish" },
  { name: "Almond Danish", category: "croissants-danish" },
  { name: "Peach Danish", category: "croissants-danish" },
  { name: "Cherry Danish", category: "croissants-danish" },
  { name: "Cheese Danish", category: "croissants-danish" },
  { name: "Chocolate Danish", category: "croissants-danish" },
  { name: "Blueberry Cinnamon Roll", category: "rolls" },
  { name: "Apple Cinnamon Roll", category: "rolls" },
  { name: "Chocolate Cinnamon Roll", category: "rolls" },
  { name: "Lemon Cinnamon Roll", category: "rolls" },
  { name: "Strawberry Cinnamon Roll", category: "rolls" },
  { name: "Pumpkin Cinnamon Roll", category: "rolls" },
  { name: "Salted Caramel Roll", category: "rolls" },
  { name: "Ginger Cookie", category: "cookies-treats" },
  { name: "Rich Chocolate Cookie", category: "cookies-treats" },
  { name: "Danish Cookie", category: "cookies-treats" },
  { name: "Double Chocolate Cookie", category: "cookies-treats" },
  { name: "Chocolate Fingers - NEW", category: "cookies-treats" },
  { name: "Coconut Oat Cookies - NEW", category: "cookies-treats" },
  { name: "Coffee Kisses", category: "cookies-treats" },
  { name: "Melting Moments", category: "cookies-treats" },
  { name: "Strawberry Stars", category: "cookies-treats" },
  { name: "Tart Shells - 6pcs", category: "cookies-treats" },
  { name: "Strawberry Rhubarb Pie", category: "pies" },
];

const items: MenuItem[] = productNames.map((product, index) => ({
  ...product,
  image: `/images/repo/repo-${String((index % 52) + 1).padStart(2, "0")}.jpg`,
}));

export default function MenuPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";

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
                  {catItems.map((item) => (
                    <div key={item.name} className="col-lg-4 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
                      <div className="sc-card">
                        <Image src={item.image} alt={item.name} width={800} height={600} style={{ width: "100%", height: 240, objectFit: "cover" }} />
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
                  ))}
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
