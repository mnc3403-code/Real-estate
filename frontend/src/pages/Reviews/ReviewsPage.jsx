import Testimonials from '../../components/common/Testimonials.jsx'
import FaqSection from '../../components/common/FaqSection.jsx'
import { assets, testimonialsData } from '../../assets/data/assets.js'

function ReviewsPage({ onNavigate }) {
  return (
    <div className="subpage-wrapper">
      {/* Dedicated Header Banner with Image */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-bg">
          <img src={assets.project_img_2} alt="Client Stories and Reviews" />
          <div className="subpage-hero-overlay" />
        </div>
        <div className="section-container subpage-hero-content">
          <div className="breadcrumb-nav">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span>/</span>
            <span className="current">Client Reviews</span>
          </div>
          <h1>Verified Client Stories & Testimonials</h1>
          <p className="subpage-hero-desc">
            Discover how we have helped over 2,500 families, entrepreneurs, and expatriate investors secure their ideal properties with unwavering integrity.
          </p>

          <div className="subpage-stats-pill-row">
            <span className="subpage-pill">⭐ 4.9/5 Average Rating</span>
            <span className="subpage-pill">🏆 3,500+ Verified Buyers</span>
            <span className="subpage-pill">💬 99.2% Client Recommendation</span>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Stage */}
      <Testimonials />

      {/* Grid of All Client Stories */}
      <section className="all-reviews-grid-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">All Customer Feedback</span>
            <h2>Authentic Experiences From Real Buyers</h2>
            <p>Every review below represents a fully concluded, registered real estate transaction</p>
          </div>

          <div className="reviews-all-grid">
            {testimonialsData.map((rev, idx) => (
              <div key={idx} className="review-story-card">
                <div className="review-card-header">
                  <img src={rev.image} alt={rev.name} className="review-user-avatar" />
                  <div>
                    <h4>{rev.name}</h4>
                    <span className="review-user-role">{rev.title}</span>
                    <span className="review-user-loc">📍 {rev.location}</span>
                  </div>
                </div>

                <div className="stars-inline">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <img key={i} src={assets.star_icon} alt="Star" className="star-icon" />
                  ))}
                </div>

                <p className="review-text">"{rev.text}"</p>

                <div className="review-verified-badge">
                  <span>✓ 100% Verified Buyer & Key Handover</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  )
}

export default ReviewsPage
