import { useState } from 'react'
import { assets, testimonialsData } from '../../assets/data/assets.js'

function Testimonials() {
<<<<<<< HEAD
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const currentTestimonial = testimonialsData[testimonialIndex]

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length,
    )
  }

  return (
    <section id="testimonials" className="testimonials">
      <h2>What our clients say</h2>

      <div className="testimonial">
        <div className="testimonial-image">
          <img src={currentTestimonial.image} alt={currentTestimonial.alt} />
        </div>
        <div className="testimonial-content">
          <div className="stars">
            {Array.from({ length: currentTestimonial.rating }).map(
              (_, index) => (
                <img key={index} src={assets.star_icon} alt="star" />
              ),
            )}
          </div>
          <p className="quote">{currentTestimonial.text}</p>
          <h3>{currentTestimonial.name}</h3>
          <p className="role">{currentTestimonial.title}</p>
        </div>
      </div>

      <div className="arrows">
        <img src={assets.left_arrow} alt="Previous" onClick={prevTestimonial} />
        <img src={assets.right_arrow} alt="Next" onClick={nextTestimonial} />
=======
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = testimonialsData[currentIndex]

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">Client Stories</span>
          <h2>What Our Homeowners & Investors Say</h2>
          <p>Real stories of trust, transparency, and seamless moves from families and investors who found their space with us</p>
        </div>

        {/* Rating overview badge */}
        <div className="rating-overview-card">
          <div className="rating-score">
            <span className="num">4.9</span>
            <div className="stars-row">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="star-char">{s}</span>
              ))}
            </div>
            <span className="count">from 3,500+ Verified Reviews</span>
          </div>
          <div className="rating-badge-item">
            <span>🛡️ 100% Verified Purchase Records</span>
          </div>
          <div className="rating-badge-item">
            <span>🤝 Zero Litigation Settlement</span>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-stage">
          <div className="testimonial-main-card">
            <div className="testimonial-author-col">
              <div className="avatar-frame">
                <img src={current.image} alt={current.alt} />
                <span className="verified-check" title="Verified Customer">✓</span>
              </div>
              <h3 className="author-name">{current.name}</h3>
              <p className="author-role">{current.title}</p>
              <span className="author-loc">📍 {current.location}</span>
            </div>

            <div className="testimonial-quote-col">
              <div className="stars-inline">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="Star" className="star-icon" />
                ))}
              </div>

              <blockquote className="quote-text">
                "{current.text}"
              </blockquote>

              <div className="testimonial-card-bottom">
                <span className="deal-verified-pill">Verified Purchase & Title Handover</span>
                <span className="review-date">Recent Review</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testimonial-controls">
            <button 
              className="testimonial-arrow-btn prev" 
              onClick={prev}
              aria-label="Previous review"
            >
              <img src={assets.left_arrow} alt="Previous" />
            </button>

            {/* Dots */}
            <div className="testimonial-dots">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              className="testimonial-arrow-btn next" 
              onClick={next}
              aria-label="Next review"
            >
              <img src={assets.right_arrow} alt="Next" />
            </button>
          </div>
        </div>
>>>>>>> 9c75aec (Update Real Estate project)
      </div>
    </section>
  )
}

export default Testimonials
