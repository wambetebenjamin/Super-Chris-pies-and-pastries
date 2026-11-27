import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-17.jpg)" }}>
        <div className="container">
          <h1>Terms</h1>
          <p>Simple terms for orders and classes at SUPER Chris Pies and Pastries.</p>
        </div>
      </div>
      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="info-strip">
                <h3>Orders</h3>
                <ul>
                  <li>SUPER Chris Pies and Pastries is an artisan bakery. Product appearance may vary slightly from photos.</li>
                  <li>All orders are confirmed on WhatsApp before preparation begins.</li>
                  <li>Prices shown are guides and may vary based on size, design, and custom requirements.</li>
                  <li>Please share order details early, especially for custom or large orders.</li>
                </ul>
              </div>
              <div className="info-strip">
                <h3>Allergens and Dietary Notes</h3>
                <ul>
                  <li>Allergen notes are available on request.</li>
                  <li>Please inform us of allergies or dietary requirements before placing an order.</li>
                </ul>
              </div>
              <div className="info-strip">
                <h3>Classes</h3>
                <ul>
                  <li>Classes are subject to availability and are confirmed on WhatsApp.</li>
                  <li>Class schedules, pricing, and content may change based on availability and group needs.</li>
                  <li>Please contact us in advance for private or group class arrangements.</li>
                </ul>
              </div>
              <div className="info-strip">
                <h3>Contact</h3>
                <p>For questions about these terms, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or WhatsApp <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{siteConfig.whatsappDisplay}</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
