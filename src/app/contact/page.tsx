"use client";

import { useCallback, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { RecaptchaFields } from "@/components/RecaptchaFields";

export default function ContactPage() {
  const { locale } = useLocale();
  const isSw = locale === "sw";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [v2Token, setV2Token] = useState("");
  const [v2Required, setV2Required] = useState(false);

  const onTokenChange = useCallback((t: string) => setRecaptchaToken(t), []);
  const onV2TokenChange = useCallback((t: string) => setV2Token(t), []);

  const onSubmit = async (e: React.FormEvent) => {
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
          // allow submission if verification service is unavailable
        }
      }
    }
    const msg = `Hi SUPER Chris Pies and Pastries, my name is ${name} (${email}).\n${message}`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setStatus(isSw ? "WhatsApp imefunguliwa na ujumbe wako." : "WhatsApp opened with your message.");
  };

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-22.jpg)" }}>
        <div className="container">
          <h1>{isSw ? "Wasiliana Nasi" : "Contact Us"}</h1>
          <p>{isSw ? "Tuko tayari kusikia kutoka kwako. Agiza, uliza, au jiandikishe kwa darasa." : "We would love to hear from you. Place an order, ask a question, or book a class."}</p>
        </div>
      </div>

      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <h2 className="block-title">{isSw ? "Tuwasiliane" : "Get in Touch"}</h2>
              <div className="info-strip">
                <h3>{isSw ? "Maelezo ya Mawasiliano" : "Contact Details"}</h3>
                <p><strong>WhatsApp / Phone:</strong> <a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.phone} ({siteConfig.whatsappDisplay})</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                <p><strong>{isSw ? "Eneo" : "Location"}:</strong> {siteConfig.location}</p>
                <p><strong>{isSw ? "Huduma" : "Service Area"}:</strong> {siteConfig.serviceArea}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
                  <a href={whatsappUrl("Hi SUPER Chris Pies and Pastries, I would like to make an enquiry.")} className="btn-primary-sc" target="_blank" rel="noopener noreferrer">{isSw ? "WhatsApp Sasa" : "WhatsApp Now"}</a>
                  <a href={`mailto:${siteConfig.email}`} className="btn-outline-sc">{isSw ? "Tuma Barua Pepe" : "Send Email"}</a>
                </div>
              </div>
              <div className="info-strip">
                <h3>Google Drive</h3>
                <ul>
                  <li><a href={siteConfig.driveMenuUrl} target="_blank" rel="noopener noreferrer">{isSw ? "Menyu kamili (PDF)" : "Full menu (PDF)"}</a></li>
                  <li><a href={siteConfig.driveClassesUrl} target="_blank" rel="noopener noreferrer">{isSw ? "Ratiba ya mafunzo" : "Class schedule"}</a></li>
                  <li><a href={siteConfig.driveGalleryUrl} target="_blank" rel="noopener noreferrer">{isSw ? "Picha zaidi" : "Photo gallery"}</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12" style={{ marginBottom: 30 }}>
              <div className="sc-card">
                <div className="sc-card-body">
                  <h3>{isSw ? "Tuma Ujumbe" : "Send a Message"}</h3>
                  <p>{isSw ? "Fomu hii itafungua WhatsApp na ujumbe wako kwa urahisi." : "This form opens WhatsApp with your message for quick confirmation."}</p>
                  <form className="sc-form" onSubmit={onSubmit}>
                    <div className="form-box">
                      <label htmlFor="contact-name">{isSw ? "Jina" : "Name"}</label>
                      <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-box">
                      <label htmlFor="contact-email">Email</label>
                      <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-box">
                      <label htmlFor="contact-message">{isSw ? "Ujumbe" : "Message"}</label>
                      <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div>
                    <RecaptchaFields onTokenChange={onTokenChange} onV2TokenChange={onV2TokenChange} v2Required={v2Required} />
                    <button type="submit" className="btn-primary-sc" style={{ width: "100%" }}>{isSw ? "Tuma kupitia WhatsApp" : "Send via WhatsApp"}</button>
                    {status && <p role="status" style={{ marginTop: 12, color: "#1f1f1f" }}>{status}</p>}
                  </form>
                </div>
              </div>
              <div className="info-strip" style={{ marginTop: 24 }}>
                <h3>{isSw ? "Ramani" : "Map Note"}</h3>
                <p>{isSw ? "Tupo Nairobi, Kenya. Kwa maelekezo ya kuchukua oda au eneo la darasa, tafadhali wasiliana nasi kupitia WhatsApp." : "We are based in Nairobi, Kenya. For pickup directions or class location details, please contact us on WhatsApp."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
