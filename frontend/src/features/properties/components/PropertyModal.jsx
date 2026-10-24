import { useState, useEffect } from 'react'
import { assets } from '../../../assets/data/assets.js'

function PropertyModal({ property, currency = 'BDT', onClose, isSaved, onToggleSave, onInquire }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [inquirySent, setInquirySent] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!property) return null

  const images = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image || property.image_url]

  const displayPrice = currency === 'USD' 
    ? (property.priceUSD || `$${Number(property.price || 0).toLocaleString()}`) 
    : (property.priceBDT || `৳ ${Number(property.price || 0).toLocaleString()}`)

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    setInquirySent(true)
    if (onInquire) {
      onInquire(property, formData)
    }
  }

  return (
    <div className="property-modal-backdrop" onClick={onClose}>
      <div className="property-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>

        <div className="modal-scroll-body">
          {/* Main Gallery */}
          <div className="modal-gallery">
            <div className="modal-main-image-wrap">
              <img 
                src={images[activeImageIndex]} 
                alt={property.title} 
                className="modal-main-image" 
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = assets.project_img_1
                }}
              />
              <div className="modal-image-badges">
                {property.badge && (
                  <span className={`modal-badge ${property.badgeType || 'featured'}`}>
                    {property.badge}
                  </span>
                )}
                <span className="modal-purpose-badge">
                  {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
              </div>
              <button 
                className={`modal-wishlist-btn ${isSaved ? 'active' : ''}`}
                onClick={() => onToggleSave && onToggleSave(property.id)}
                title={isSaved ? 'Remove from saved' : 'Save property'}
              >
                {isSaved ? '♥ Saved' : '♡ Save'}
              </button>
            </div>

            {images.length > 1 && (
              <div className="modal-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="modal-content-grid">
            <div className="modal-primary-info">
              <div className="modal-header-meta">
                <span className="modal-category">{property.category ? property.category.toUpperCase() : 'RESIDENTIAL'}</span>
                <span className="modal-rating">★ {property.rating || '4.9'} ({property.reviewsCount || 12} reviews)</span>
              </div>
              
              <h2 className="modal-property-title">{property.title}</h2>
              <p className="modal-property-location">
                📍 {property.location || property.city || 'Prime Location'}
              </p>

              <div className="modal-price-box">
                <span className="modal-price-tag">{displayPrice}</span>
              </div>

              {/* Key Specs Grid */}
              <div className="modal-specs-grid">
                <div className="spec-card">
                  <span className="spec-icon">🛏️</span>
                  <div>
                    <strong>{property.bedrooms ?? '3'} Bedrooms</strong>
                    <small>Spacious & ventilated</small>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">🚿</span>
                  <div>
                    <strong>{property.bathrooms ?? '3'} Bathrooms</strong>
                    <small>Modern fittings</small>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">📐</span>
                  <div>
                    <strong>{property.area_sqft ? `${property.area_sqft} sq.ft` : '2,400 sq.ft'}</strong>
                    <small>Carpet Area</small>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">🚗</span>
                  <div>
                    <strong>{property.parking ?? 1} Covered Parkings</strong>
                    <small>Dedicated space</small>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="modal-section">
                <h3>About This Property</h3>
                <p className="modal-desc-text">
                  {property.description || 'Luxurious architectural property built with premier craftsmanship, energy efficiency, and modern aesthetic elegance. Close to international schools, commercial centers, and healthcare hubs.'}
                </p>
              </div>

              {/* Amenities */}
              <div className="modal-section">
                <h3>Key Features & Amenities</h3>
                <div className="modal-amenities-list">
                  {(property.amenities || [
                    '24/7 Armed Security & CCTV',
                    '100% Power Generator Backup',
                    'High Speed Capsule Lifts',
                    'Rooftop Garden & Terrace',
                    'Dedicated Parking Spot',
                    'Modern Kitchen Cabinetry',
                    'Rainwater Harvesting',
                    'Smart Intercom System'
                  ]).map((item, i) => (
                    <span key={i} className="amenity-chip">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Certificate */}
              <div className="modal-verification-card">
                <span className="cert-icon">🛡️</span>
                <div>
                  <strong>Legal Due Diligence Completed</strong>
                  <p>Title deed, mutation record, and municipal approvals have been verified by our legal advocates.</p>
                </div>
              </div>
            </div>

            {/* Sidebar: Agent & Inquiry */}
            <div className="modal-agent-sidebar">
              <div className="agent-card">
                <div className="agent-header">
                  <img 
                    src={property.agent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                    alt={property.agent?.name || 'Assigned Advisor'} 
                    className="agent-avatar"
                  />
                  <div>
                    <span className="agent-tag">Certified Property Advisor</span>
                    <h4>{property.agent?.name || 'Tanvir Hossain'}</h4>
                    <p>Real Estate Consultant (8+ yrs exp)</p>
                  </div>
                </div>

                <div className="agent-quick-actions">
                  <a 
                    href={`tel:${property.agent?.phone || '+8801700000000'}`} 
                    className="agent-btn call-btn"
                  >
                    📞 Call Advisor
                  </a>
                  <a 
                    href={`https://wa.me/8801711223344?text=Hi, I am interested in ${encodeURIComponent(property.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="agent-btn wa-btn"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Direct Inquiry Box */}
                <div className="modal-inquiry-box">
                  <h4>Schedule a Tour or Inquire</h4>
                  {inquirySent ? (
                    <div className="inquiry-success-message">
                      <span className="check-icon">✓</span>
                      <h5>Inquiry Sent Successfully!</h5>
                      <p>Our advisor {property.agent?.name || 'Tanvir'} will contact you within 2 business hours.</p>
                      <button 
                        className="btn-outline-sm" 
                        onClick={() => setInquirySent(false)}
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="modal-inquiry-form">
                      <div className="form-group-compact">
                        <label>Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Arif Chowdhury" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group-compact">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. +880 1712-345678" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group-compact">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="e.g. arif@gmail.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group-compact">
                        <label>Message / Viewing Preference</label>
                        <textarea 
                          rows="3" 
                          placeholder="I would like to schedule a private visit this weekend..." 
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="submit-inquiry-btn">
                        Request Viewing & Details
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal
