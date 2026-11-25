"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

type MenuItem = {
  name: string;
  nameSw: string;
  desc: string;
  descSw: string;
  price: string;
  image: string;
  category: string;
};

const categories = [
  { id: "pies", en: "Pies", sw: "Pai" },
  { id: "pastries", en: "Pastries", sw: "Vitafunwa" },
  { id: "cakes", en: "Cakes", sw: "Keki" },
  { id: "savoury", en: "Savoury", sw: "Vya Chumvi" },
  { id: "sweet", en: "Sweet", sw: "Vitamu" },
  { id: "seasonal", en: "Seasonal", sw: "Msimu" },
  { id: "custom", en: "Custom", sw: "Maalum" },
];

const items: MenuItem[] = [
  { category: "pies", name: "Classic Meat Pie", nameSw: "Pai ya Nyama ya Kawaida", desc: "Golden, flaky crust filled with well-seasoned minced meat. A perfect pair with Kenyan chai.", descSw: "Ukoko wa dhahabu uliojazwa nyama iliyokolezwa vizuri. Inafaa sana na chai ya Kenya.", price: "From KES 150", image: "/images/repo/repo-05.jpg" },
  { category: "pies", name: "Chicken Pie", nameSw: "Pai ya Kuku", desc: "Tender chicken in a creamy, savoury filling wrapped in a crisp pastry shell.", descSw: "Kuku laini katika kujazwa kitamu ndani ya ukoko mkali.", price: "From KES 180", image: "/images/repo/repo-07.jpg" },
  { category: "pies", name: "Vegetable Pie", nameSw: "Pai ya Mboga", desc: "A hearty mix of fresh vegetables and spices in our signature golden crust.", descSw: "Mchanganyiko wa mboga safi na viungo katika ukoko wetu wa dhahabu.", price: "From KES 140", image: "/images/repo/repo-09.jpg" },
  { category: "pastries", name: "Butter Pastry", nameSw: "Kifungua Kinywa cha Siagi", desc: "Light, layered, and buttery. Freshly baked for breakfast or tea time.", descSw: "Nyepesi, tabaka, na siagi. Imeokwa fresh kwa kifungua kinywa au chai.", price: "From KES 120", image: "/images/repo/repo-11.jpg" },
  { category: "pastries", name: "Sausage Roll", nameSw: "Roli ya Soseji", desc: "Seasoned sausage wrapped in flaky pastry, baked until golden and crisp.", descSw: "Soseji iliyokolezwa imefungwa kwenye vitafunwa na kuokwa hadi dhahabu.", price: "From KES 130", image: "/images/repo/repo-13.jpg" },
  { category: "pastries", name: "Danish Pastry", nameSw: "Vitafunwa vya Danish", desc: "Soft, sweet pastry with a delicate finish. Great for gifting or a personal treat.", descSw: "Vitafunwa laini na vitamu. Vizuri kwa zawadi au kujifurahisha.", price: "From KES 160", image: "/images/repo/repo-14.jpg" },
  { category: "cakes", name: "Celebration Cake", nameSw: "Keki ya Sherehe", desc: "Custom decorated cake for birthdays, anniversaries, and special moments.", descSw: "Keki iliyopambwa maalum kwa siku za kuzaliwa na sherehe.", price: "From KES 2,500", image: "/images/repo/repo-20.jpg" },
  { category: "cakes", name: "Cupcake Box", nameSw: "Sanduku la Cupcakes", desc: "A box of freshly baked cupcakes with your choice of flavour and simple decoration.", descSw: "Sanduku la cupcakes fresh na ladha unayopenda.", price: "From KES 1,200 / box", image: "/images/repo/repo-21.jpg" },
  { category: "cakes", name: "Custom Event Cake", nameSw: "Keki ya Tukio Maalum", desc: "Made to your design, flavour, and size. We confirm every detail on WhatsApp.", descSw: "Imetengenezwa kwa muundo, ladha, na ukubwa wako. Tunathibitisha kupitia WhatsApp.", price: "Quote on request", image: "/images/repo/repo-23.jpg" },
  { category: "savoury", name: "Mini Savoury Platter", nameSw: "Sahani Ndogo ya Vitafunwa", desc: "A mix of bite-sized savoury pastries for meetings, parties, and family gatherings.", descSw: "Mchanganyiko wa vitafunwa vya chumvi kwa mikutano na sherehe.", price: "From KES 1,500", image: "/images/repo/repo-24.jpg" },
  { category: "savoury", name: "Spiced Beef Bake", nameSw: "Kitafunwa cha Nyama", desc: "Crisp outside, flavourful spiced filling inside. A crowd favourite.", descSw: "Nje mkali, ndani kujazwa kwa viungo. Kipendwa na wengi.", price: "From KES 100", image: "/images/repo/repo-26.jpg" },
  { category: "sweet", name: "Sweet Treat Box", nameSw: "Sanduku la Vitamu", desc: "An assortment of sweet pastries and bites, perfect for sharing over chai.", descSw: "Mchanganyiko wa vitafunwa vitamu, vizuri kushiriki na chai.", price: "From KES 1,000", image: "/images/repo/repo-28.jpg" },
  { category: "sweet", name: "Fruit Pastry", nameSw: "Kifungua Kinywa cha Matunda", desc: "Fresh pastry topped with sweet fruit notes for a light, satisfying treat.", descSw: "Kitafunwa fresh chenye ladha ya matunda.", price: "From KES 160", image: "/images/repo/repo-29.jpg" },
  { category: "seasonal", name: "Seasonal Special", nameSw: "Maalum ya Msimu", desc: "Ask us what is fresh this season. We love creating limited bakes with local flavour.", descSw: "Tuulize ni nini kipya msimu huu. Tunapenda kuunda vitafunwa vya msimu.", price: "Price varies", image: "/images/repo/repo-31.jpg" },
  { category: "custom", name: "Custom Order", nameSw: "Oda Maalum", desc: "Have something special in mind? Tell us your flavour, size, and occasion on WhatsApp.", descSw: "Una wazo maalum? Tuambie ladha, ukubwa, na tukio lako kupitia WhatsApp.", price: "Quote on request", image: "/images/repo/repo-33.jpg" },
];

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
                  ? "Bei ni makadirio na zinaweza kutofautiana kulingana na ukubwa na maelezo. Tunathibitisha kila oda kupitia WhatsApp."
                  : "Prices are a guide and may vary based on size and details. We confirm every order on WhatsApp."}
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
                        <Image src={item.image} alt={isSw ? item.nameSw : item.name} width={800} height={600} style={{ width: "100%", height: 240, objectFit: "cover" }} />
                        <div className="sc-card-body">
                          <h3>{isSw ? item.nameSw : item.name}</h3>
                          <p>{isSw ? item.descSw : item.desc}</p>
                          <div className="price-band">{item.price}</div>
                          <a
                            href={whatsappUrl(`Hi SUPER Chris Pies and Pastries, I would like to order: ${item.name} (${item.price}). Please confirm availability and details.`)}
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
