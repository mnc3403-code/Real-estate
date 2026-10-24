import Services from '../../components/common/Services.jsx'
import HowItWorks from '../../components/common/HowItWorks.jsx'
import { assets } from '../../assets/data/assets.js'

function ServicesPage({ onNavigate }) {
  return (
    <div className="subpage-wrapper">
      {/* Dedicated Header Banner with Image */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-bg">
          <img src={assets.project_img_4} alt="Real Estate Services" />
          <div className="subpage-hero-overlay" />
        </div>
        <div className="section-container subpage-hero-content">
          <div className="breadcrumb-nav">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span>/</span>
            <span className="current">Our Services</span>
          </div>
          <h1>End-to-End Real Estate Expertise & Advisory</h1>
          <p className="subpage-hero-desc">
            From legal title verification and bank mortgage processing to turnkey interior styling and property management — we handle every detail with precision.
          </p>

          <div className="subpage-stats-pill-row">
            <span className="subpage-pill">⚖️ Supreme Court Legal Team</span>
            <span className="subpage-pill">🏦 14+ Partner Banks</span>
            <span className="subpage-pill">🔑 2,500+ Seamless Key Deliveries</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* How it works 4-step */}
      <HowItWorks />

      {/* Services Consultation CTA */}
      <section className="services-page-cta">
        <div className="section-container">
          <div className="about-cta-box">
            <h2>Need Personalized Property Guidance?</h2>
            <p>
              Schedule a 1-on-1 strategy consultation with our senior chartered consultants and property attorneys today.
            </p>
            <div className="about-cta-buttons">
              <button 
                onClick={() => onNavigate('/contact')} 
                className="btn-primary-lg"
              >
                Book Free Consultation
              </button>
              <button 
                onClick={() => onNavigate('/properties')} 
                className="btn-outline-white"
              >
                Browse Listings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
