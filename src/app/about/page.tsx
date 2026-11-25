"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

export default function AboutPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-06.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Kuhusu Sisi" : "About Us"}</h1>
          <p>
            {isSw
              ? "Hadithi ya SUPER Chris Pies and Pastries, bakery ya Kenya inayooka kwa upendo na kujali ubora."
              : "The story behind SUPER Chris Pies and Pastries, a Kenyan bakery built on love, skill, and quality."}
          </p>
        </div>
      </div>

      <div className="about-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h2 className="block-title">{isSw ? "Hadithi ya Chris" : "Chris's Story"}</h2>
              <h3>{isSw ? "KUOKA KWA MOYO, KUTUMIKIA KWA FURAHA" : "BAKING WITH HEART, SERVING WITH JOY"}</h3>
              <p>
                {isSw
                  ? "SUPER Chris Pies and Pastries ilianza kwa upendo rahisi wa kuoka. Kile kilichoanza kama shauku ya jikoni kimekua kuwa bakery inayowahudumia wateja kwa pai safi, vitafunwa, keki maalum, na mafunzo ya vitendo."
                  : "SUPER Chris Pies and Pastries started with a simple love for baking. What began as a passion in the kitchen has grown into a bakery that serves customers with fresh pies, pastries, custom cakes, and hands-on classes."}
              </p>
              <p>
                {isSw
                  ? "Kila kitu tunachotengeneza kinaandaliwa kwa uangalifu, kwa viungo vizuri, na kwa lengo la kufanya kila mtu ajisikie nyumbani. Tunathamini ladha ya asili, mwonekano mzuri, na huduma ya ukaribu."
                  : "Everything we make is prepared with care, good ingredients, and the goal of making people feel at home. We value honest flavour, beautiful presentation, and friendly service."}
              </p>
              <p>
                {isSw
                  ? "Pia tunapenda kufundisha. Kupitia mafunzo yetu ya uokaji, tunashiriki ujuzi na kuwasaidia wengine kujifunza ufundi wa pai, vitafunwa, na keki."
                  : "We also love to teach. Through our baking classes, we share skills and help others learn the craft of pies, pastries, and cakes."}
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="about-images">
                <Image className="about-main" src="/images/repo/repo-08.jpg" alt="SUPER Chris Pies and Pastries kitchen and baked goods" width={500} height={500} style={{ width: "100%", height: "auto" }} />
                <Image className="about-inset" src="/images/repo/repo-04.jpg" alt="Fresh pastry detail from SUPER Chris kitchen" width={200} height={200} />
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: 50 }}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Thamani Zetu" : "Our Values"}</h3>
                <ul>
                  <li>{isSw ? "Ubora na usafi katika kila hatua" : "Quality and cleanliness in every step"}</li>
                  <li>{isSw ? "Ladha ya nyumbani na viungo vizuri" : "Homemade flavour and good ingredients"}</li>
                  <li>{isSw ? "Huduma ya ukaribu na uaminifu" : "Friendly and honest service"}</li>
                  <li>{isSw ? "Kujifunza na kushiriki ufundi" : "Learning and sharing the craft"}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Ubora na Usafi" : "Quality and Hygiene"}</h3>
                <ul>
                  <li>{isSw ? "Tunaandaa oda kwa uangalifu na usafi" : "We prepare orders with care and cleanliness"}</li>
                  <li>{isSw ? "Tunahakikisha kila oda inaonekana na kuonja vizuri" : "We aim for bakes that look and taste great"}</li>
                  <li>{isSw ? "Maelezo ya mzio yanapatikana ukiomba" : "Allergen notes available on request"}</li>
                  <li>{isSw ? "Oda zote huthibitishwa kupitia WhatsApp" : "All orders confirmed on WhatsApp"}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Eneo la Huduma" : "Service Area"}</h3>
                <ul>
                  <li>{isSw ? "Tupo Nairobi, Kenya" : "Based in Nairobi, Kenya"}</li>
                  <li>{isSw ? "Tunahudumia Nairobi na maeneo ya karibu" : "Serving Nairobi and surrounding areas"}</li>
                  <li>{isSw ? "Uwasilishaji au kuchukua kunaweza kupangwa" : "Delivery or pickup can be arranged"}</li>
                  <li>{isSw ? "Wasiliana nasi kwa maelezo" : "Contact us for details"}</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a
              href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to learn more about your bakery.")}
              className="btn-primary-sc"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isSw ? "Wasiliana nasi kwenye WhatsApp" : "Chat with us on WhatsApp"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
