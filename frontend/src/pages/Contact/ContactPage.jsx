import ContactForm from '../../features/inquiries/components/ContactForm.jsx'
import { assets } from '../../assets/data/assets.js'

function ContactPage({ onNavigate }) {
  return (
    <div className="subpage-wrapper">
      {/* Dedicated Header Banner with Image */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-bg">
          <img src={assets.brand_img} alt="Contact Real Estate Headquarters" />
          <div className="subpage-hero-overlay" />
        </div>
        <div className="section-container subpage-hero-content">
          <div className="breadcrumb-nav">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span>/</span>
            <span className="current">Contact Us</span>
          </div>
          <h1>Visit Our Offices or Connect With An Advisor</h1>
          <p className="subpage-hero-desc">
            Our senior property consultants, valuation experts, and Supreme Court legal advocates are ready to guide you at our corporate offices in Dhaka and Chittagong.
          </p>

          <div className="subpage-stats-pill-row">
            <span className="subpage-pill">📍 Banani & Gulshan Corporate HQ</span>
            <span className="subpage-pill">📞 Hotline: +880 1711-223344</span>
            <span className="subpage-pill">💬 Instant WhatsApp Advisory</span>
          </div>
        </div>
      </section>

      {/* Main Contact Form & Office Info */}
      <ContactForm />
    </div>
  )
}

export default ContactPage
