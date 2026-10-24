<<<<<<< HEAD
import { assets } from '../../assets/data/assets.js'

function About() {
  return (
    <section id="about" className="about">
      <div className="about-text">
        <h2>Why choose us?</h2>
        <p>
          We are a team of dedicated real estate professionals with decades of
          combined experience. From buying your first home to investing in
          premium properties, our personalized approach ensures you always
          find the right place at the right price.
        </p>
        <div className="stats">
          <div>
            <span>50+</span>
            <p>Partners</p>
          </div>
          <div>
            <span>120+</span>
            <p>Projects</p>
          </div>
          <div>
            <span>100+</span>
            <p>Homes</p>
          </div>
          <div>
            <span>20+</span>
            <p>Years</p>
          </div>
        </div>
      </div>

      <div className="about-img">
        <img src={assets.brand_img} alt="Our brand" />
      </div>
=======
import { assets, companyValues } from '../../assets/data/assets.js'

function About({ onOpenAboutPage }) {
  return (
    <section id="about" className="about-home-section">
      <div className="section-container">
        <div className="about-home-layout">
          {/* Left Column: Image with badges */}
          <div className="about-visual">
            <div className="about-img-frame">
              <img src={assets.brand_img} alt="About our agency" className="about-main-img" />
              <div className="experience-badge">
                <span className="years">15+</span>
                <span className="label">Years of Real Estate Integrity</span>
              </div>
            </div>
            
            <div className="trust-pills-row">
              <div className="trust-pill">
                <span className="pill-icon">🛡️</span>
                <span>100% Legal Title Verification</span>
              </div>
              <div className="trust-pill">
                <span className="pill-icon">✓</span>
                <span>Zero Hidden Brokerage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Stats */}
          <div className="about-home-content">
            <span className="section-kicker">Why Choose Our Agency</span>
            <h2>We Don’t Just Sell Properties — We Help You Build Your Future</h2>
            <p className="about-lead">
              We are a dedicated team of real estate chartered consultants, architects, and Supreme Court legal advocates with decades of collective experience in prime residential and commercial spaces.
            </p>
            <p className="about-subtext">
              From purchasing your first family apartment in Dhanmondi to securing high-yield commercial floors in Gulshan or bespoke luxury villas in Banani, our transparent end-to-end guidance guarantees you secure the right address at honest market valuation.
            </p>

            {/* Core Pillars */}
            <div className="about-mini-pillars">
              {companyValues.slice(0, 2).map((item, idx) => (
                <div key={idx} className="mini-pillar">
                  <span className="pillar-ico">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="about-stats-grid">
              <div className="stat-card">
                <span className="stat-number">2,500+</span>
                <span className="stat-desc">Homes Delivered</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">180+</span>
                <span className="stat-desc">Developer Partners</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">99.2%</span>
                <span className="stat-desc">Client Satisfaction</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">৳ 850 Cr+</span>
                <span className="stat-desc">Property Value Managed</span>
              </div>
            </div>

            <div className="about-cta-row">
              <button 
                onClick={onOpenAboutPage} 
                className="btn-primary"
              >
                Explore Our Heritage & Team →
              </button>
              <a href="#projects" className="btn-secondary">
                View Available Homes
              </a>
            </div>
          </div>
        </div>
      </div>
>>>>>>> 9c75aec (Update Real Estate project)
    </section>
  )
}

export default About
