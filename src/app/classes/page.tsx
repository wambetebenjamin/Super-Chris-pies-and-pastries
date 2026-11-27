"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";

const classes = [
  {
    name: "Beginner Pie Making",
    nameSw: "Kutengeneza Pai kwa Wanaoanza",
    desc: "Learn how to make golden, flaky pies from scratch. We cover dough, filling, seasoning, and baking tips.",
    descSw: "Jifunze kutengeneza pai za dhahabu kuanzia mwanzo. Tunafundisha unga, kujaza, viungo, na vidokezo vya kuoka.",
    price: "From KES 3,500 per person",
    duration: "3 hours",
    durationSw: "Masaa 3",
    image: "/images/repo/repo-35.jpg",
  },
  {
    name: "Pastry Fundamentals",
    nameSw: "Misingi ya Vitafunwa",
    desc: "Master the basics of pastry making, from mixing and folding to baking crisp, beautiful pastries.",
    descSw: "Jifunze misingi ya kutengeneza vitafunwa, kutoka kuchanganya hadi kuoka.",
    price: "From KES 3,000 per person",
    duration: "2.5 hours",
    durationSw: "Masaa 2.5",
    image: "/images/repo/repo-36.jpg",
  },
  {
    name: "Cake Decorating",
    nameSw: "Kupamba Keki",
    desc: "Learn simple and beautiful cake finishing techniques for birthdays, celebrations, and custom orders.",
    descSw: "Jifunze mbinu rahisi na nzuri za kupamba keki kwa sherehe na oda maalum.",
    price: "From KES 4,000 per person",
    duration: "3 hours",
    durationSw: "Masaa 3",
    image: "/images/repo/repo-38.jpg",
  },
  {
    name: "Private or Group Session",
    nameSw: "Darasa la Kibinafsi au Kikundi",
    desc: "A tailored class for friends, family, team events, or one-on-one learning. We plan the session around your goals.",
    descSw: "Darasa lililobinafsishwa kwa marafiki, familia, au kujifunza peke yako.",
    price: "Quote on request",
    duration: "Flexible",
    durationSw: "Inayobadilika",
    image: "/images/repo/repo-40.jpg",
  },
];

export default function ClassesPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-35.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Mafunzo ya Kuoka" : "Baking Classes"}</h1>
          <p>
            {isSw
              ? "Jifunze ufundi wa kuoka kwa vitendo. Darasa rafiki kwa wanaoanza, lenye furaha, na linafaa kwa kila mtu."
              : "Learn the craft of baking in a warm, hands-on class. Beginner friendly, practical, and fun for everyone."}
          </p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className="block-title text-center">{isSw ? "Jifunze na SUPER Chris" : "Learn with SUPER Chris"}</h2>
              <p className="section-lead">
                {isSw
                  ? "Mafunzo yetu ni ya vitendo na yanafaa kwa wanaoanza na wale wanaotaka kuboresha ujuzi wao. Tunathibitisha upatikanaji kupitia WhatsApp."
                  : "Our classes are hands-on and perfect for beginners or anyone looking to sharpen their baking skills. We confirm availability on WhatsApp."}
              </p>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <a href={siteConfig.driveClassesUrl} className="btn-outline-sc" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-calendar" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  {isSw ? "Tazama ratiba ya mafunzo kwenye Google Drive" : "View class schedule on Google Drive"}
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            {classes.map((item) => (
              <div key={item.name} className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
                <div className="sc-card">
                  <Image src={item.image} alt={isSw ? item.nameSw : item.name} width={900} height={600} style={{ width: "100%", height: 260, objectFit: "cover" }} />
                  <div className="sc-card-body">
                    <h3>{isSw ? item.nameSw : item.name}</h3>
                    <p>{isSw ? item.descSw : item.desc}</p>
                    <div className="price-band">
                      {item.price} · {isSw ? item.durationSw : item.duration}
                    </div>
                    <a
                      href={whatsappUrl(`Hi SUPER Chris Pies and Pastries, I would like to reserve a baking class: ${item.name}. Please share the next available date and details.`)}
                      className="btn-primary-sc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isSw ? "Hifadhi kupitia WhatsApp" : "Reserve on WhatsApp"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Kila Darasa Linajumuisha" : "What Is Included"}</h3>
                <ul>
                  <li>{isSw ? "Mafunzo ya vitendo hatua kwa hatua" : "Step-by-step hands-on guidance"}</li>
                  <li>{isSw ? "Viungo na vifaa vya msingi darasani" : "Ingredients and basic tools during class"}</li>
                  <li>{isSw ? "Vidokezo vya mapishi na mbinu za kuoka" : "Recipe tips and baking techniques"}</li>
                  <li>{isSw ? "Mazoezi rafiki kwa wanaoanza" : "Beginner friendly practice"}</li>
                  <li>{isSw ? "Unaondoka na kitu ulichoandika au kuoka" : "You leave with something you baked or learned to make"}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 24 }}>
              <div className="info-strip" style={{ height: "100%" }}>
                <h3>{isSw ? "Maelezo ya Darasa" : "Class Details"}</h3>
                <ul>
                  <li>{isSw ? "Ratiba inathibitishwa kupitia WhatsApp" : "Schedule is confirmed on WhatsApp"}</li>
                  <li>{isSw ? "Mafunzo yanategemea upatikanaji" : "Classes subject to availability"}</li>
                  <li>{isSw ? "Darasa la kibinafsi au kikundi linaweza kupangwa" : "Private or group sessions can be arranged"}</li>
                  <li>{isSw ? "Maelezo ya mzio yanapatikana ukiomba" : "Allergen notes available on request"}</li>
                </ul>
                <div style={{ marginTop: 16 }}>
                  <a href={`mailto:${siteConfig.email}`} className="btn-outline-sc">{siteConfig.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
