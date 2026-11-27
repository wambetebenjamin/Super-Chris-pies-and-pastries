"use client";

import { useCallback, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { RecaptchaFields } from "@/components/RecaptchaFields";

export default function OrderPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [v2Token, setV2Token] = useState("");
  const [v2Required, setV2Required] = useState(false);

  const onTokenChange = useCallback((t: string) => setRecaptchaToken(t), []);
  const onV2TokenChange = useCallback((t: string) => setV2Token(t), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey) {
      const tokenToVerify = v2Required ? v2Token : recaptchaToken;
      if (tokenToVerify) {
        try {
          const res = await fetch("/api/verify-recaptcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: tokenToVerify }),
          });
          const data = await res.json();
          if (!data.ok) {
            if (!v2Required) {
              setV2Required(true);
              setStatus(isSw ? "Tafadhali kamilisha uthibitishaji." : "Please complete the verification challenge.");
              return;
            }
            setStatus(isSw ? "Uthibitishaji umeshindwa. Jaribu tena." : "Verification failed. Please try again.");
            return;
          }
        } catch {
          // allow submission if verification unavailable
        }
      }
    }
    const msg = `Hi SUPER Chris Pies and Pastries, I would like to place an order.\nName: ${name}\nOrder: ${item}\nDate needed: ${date}\nNotes: ${notes}`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setStatus(isSw ? "WhatsApp imefunguliwa na oda yako." : "WhatsApp opened with your order details.");
  };

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-15.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Agiza" : "Order"}</h1>
          <p>{isSw ? "Kuagiza ni rahisi. Tuma maelezo yako kupitia WhatsApp na tutathibitisha kila kitu." : "Ordering is easy. Send your details on WhatsApp and we will confirm everything with you."}</p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <h2 className="block-title">{isSw ? "Jinsi ya Kuagiza" : "How to Order"}</h2>
              <div className="info-strip">
                <h3>{isSw ? "Hatua Rahisi" : "Simple Steps"}</h3>
                <ul>
                  <li>{isSw ? "Chagua bidhaa kutoka menyu au eleza oda yako maalum." : "Choose items from the menu or describe your custom order."}</li>
                  <li>{isSw ? "Tuma maelezo yako kupitia WhatsApp au tumia fomu hii." : "Send your details on WhatsApp or use this form."}</li>
                  <li>{isSw ? "Tutathibitisha upatikanaji, bei, na muda wa kuchukua au usafirishaji." : "We will confirm availability, price, and pickup or delivery timing."}</li>
                  <li>{isSw ? "Oda zote huthibitishwa kupitia WhatsApp." : "All orders are confirmed on WhatsApp."}</li>
                </ul>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <a href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to place an order. Please share your menu and availability.")} className="btn-primary-sc" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-whatsapp" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  {isSw ? "Agiza kwenye WhatsApp" : "Order on WhatsApp"}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn-outline-sc">
                  <i className="fa fa-envelope" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  {siteConfig.email}
                </a>
              </div>
              <p style={{ marginTop: 20, color: "#686868" }}>{isSw ? "Maelezo ya mzio yanapatikana ukiomba." : "Allergen notes available on request."}</p>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <div className="sc-card">
                <div className="sc-card-body">
                  <h3>{isSw ? "Fomu ya Kuagiza Haraka" : "Quick Order Form"}</h3>
                  <p>{isSw ? "Jaza fomu hii na tutafungua WhatsApp na maelezo yako." : "Fill this form and we will open WhatsApp with your details."}</p>
                  <form className="sc-form" onSubmit={handleSubmit}>
                    <div className="form-box">
                      <label htmlFor="order-name">{isSw ? "Jina lako" : "Your name"}</label>
                      <input id="order-name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-box">
                      <label htmlFor="order-item">{isSw ? "Unataka kuagiza nini?" : "What would you like to order?"}</label>
                      <textarea id="order-item" value={item} onChange={(e) => setItem(e.target.value)} required />
                    </div>
                    <div className="form-box">
                      <label htmlFor="order-date">{isSw ? "Tarehe unayohitaji" : "Date needed"}</label>
                      <input id="order-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="form-box">
                      <label htmlFor="order-notes">{isSw ? "Maelezo zaidi" : "Extra notes"}</label>
                      <textarea id="order-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={isSw ? "Mzio, ukubwa, ladha, nk." : "Allergies, size, flavour, etc."} />
                    </div>
                    <RecaptchaFields onTokenChange={onTokenChange} onV2TokenChange={onV2TokenChange} v2Required={v2Required} />
                    <button type="submit" className="btn-primary-sc" style={{ width: "100%" }}>{isSw ? "Tuma kupitia WhatsApp" : "Send via WhatsApp"}</button>
                    {status && <p role="status" style={{ marginTop: 12 }}>{status}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
