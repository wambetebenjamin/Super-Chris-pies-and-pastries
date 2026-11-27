import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-16.jpg)" }}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How SUPER Chris Pies and Pastries handles your information.</p>
        </div>
      </div>
      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="info-strip">
                <h3>Overview</h3>
                <p>SUPER Chris Pies and Pastries respects your privacy. This page explains what information we may collect when you contact us, place an order, or book a class.</p>
              </div>
              <div className="info-strip">
                <h3>Information We Collect</h3>
                <ul>
                  <li>Contact details you provide, such as your name, email address, and phone number.</li>
                  <li>Order or class details you send through WhatsApp, email, or forms.</li>
                  <li>Basic website preferences, such as language and cookie consent.</li>
                </ul>
              </div>
              <div className="info-strip">
                <h3>How We Use Information</h3>
                <ul>
                  <li>To respond to enquiries, confirm orders, and manage class bookings.</li>
                  <li>To improve your experience on the website.</li>
                  <li>To communicate important order or class updates.</li>
                </ul>
              </div>
              <div className="info-strip">
                <h3>Cookies</h3>
                <p>We use a cookie consent preference key ({siteConfig.cookieConsentKey}) to remember your choice. You can accept or decline non-essential cookies through the cookie banner.</p>
              </div>
              <div className="info-strip">
                <h3>Contact</h3>
                <p>For privacy questions, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or WhatsApp <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{siteConfig.whatsappDisplay}</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
