<<<<<<< HEAD
function ContactForm() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>

      <div className="contact-body">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Tell us about your property needs"
            />
          </div>
          <button type="submit">Send</button>
        </form>

        <div className="contact-info">
          <div>
            <h3>Company Name</h3>
            <p>123 Main Street, Suite 400</p>
            <p>New York, NY 10001</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>+1 234 567 8900</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>hello@realestate.com</p>
=======
import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'apartment',
    budget: 'mid',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <section id="contact" className="contact-main-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">Get in Touch</span>
          <h2>Connect With Our Senior Property Advisors</h2>
          <p>
            Whether you are buying a lakefront sanctuary, leasing corporate headquarters, or need legal title vetting — we are ready to assist.
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Form Side */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <span className="success-check-big">✓</span>
                <h3>Thank You for Reaching Out!</h3>
                <p>
                  Your inquiry has been routed to our senior relationship manager for your selected property type. We will call you back within <strong>2 business hours</strong>.
                </p>
                <div className="submitted-summary">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Contact:</strong> {formData.phone} ({formData.email})</p>
                  <p><strong>Interest:</strong> {formData.propertyType.toUpperCase()} - {formData.budget}</p>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', propertyType: 'apartment', budget: 'mid', message: '' })
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-actual-form">
                <div className="form-row-2">
                  <div className="input-field-wrap">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input 
                      id="contact-name"
                      name="name"
                      type="text" 
                      required 
                      placeholder="e.g. Mahbubur Rahman"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-field-wrap">
                    <label htmlFor="contact-phone">Phone / WhatsApp Number *</label>
                    <input 
                      id="contact-phone"
                      name="phone"
                      type="tel" 
                      required 
                      placeholder="e.g. +880 1712-000000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-field-wrap">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    id="contact-email"
                    name="email"
                    type="email" 
                    required 
                    placeholder="e.g. mahbub@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-2">
                  <div className="input-field-wrap">
                    <label htmlFor="contact-type">Preferred Property Type</label>
                    <select 
                      id="contact-type"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                    >
                      <option value="apartment">Modern Apartment</option>
                      <option value="villa">Luxury Garden Villa</option>
                      <option value="penthouse">Skyline Penthouse</option>
                      <option value="duplex">Double-Height Duplex</option>
                      <option value="commercial">Commercial Floor / Office</option>
                      <option value="studio">Studio Flat / Loft</option>
                    </select>
                  </div>

                  <div className="input-field-wrap">
                    <label htmlFor="contact-budget">Estimated Budget Range</label>
                    <select 
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="under1cr">Under ৳ 1.5 Crore ($140k)</option>
                      <option value="mid">৳ 1.5 Cr – ৳ 4.0 Crore ($140k-$360k)</option>
                      <option value="luxury">৳ 4.0 Cr – ৳ 8.0 Crore ($360k-$750k)</option>
                      <option value="ultra">Ultra Luxury ৳ 8.0 Cr+ ($750k+)</option>
                    </select>
                  </div>
                </div>

                <div className="input-field-wrap">
                  <label htmlFor="contact-message">Property Requirements / Questions</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    rows="4" 
                    placeholder="Tell us about desired location, bedrooms, expected move-in date, or loan assistance needed..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button 
                  type="submit" 
                  className="contact-submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Details...' : 'Send Inquiry to Senior Advisor →'}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="contact-details-col">
            {/* Direct WhatsApp Callout */}
            <div className="whatsapp-callout-card">
              <span className="wa-icon">💬</span>
              <div>
                <h4>Fast Assistance via WhatsApp</h4>
                <p>Chat directly with our property concierge for instant brochures & floor plans.</p>
                <a 
                  href="https://wa.me/8801711223344?text=Hi,%20I%20would%20like%20to%20inquire%20about%20your%20properties" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="wa-chat-link"
                >
                  Open WhatsApp Chat (+880 1711-223344) →
                </a>
              </div>
            </div>

            {/* Office locations */}
            <div className="office-card">
              <span className="office-pin">📍</span>
              <div>
                <h4>Corporate Headquarters</h4>
                <p>Tower 71, Level 14, Road 11, Block D</p>
                <p>Banani & Gulshan Commercial Zone, Dhaka 1213</p>
              </div>
            </div>

            <div className="office-card">
              <span className="office-pin">📍</span>
              <div>
                <h4>Chittagong Regional Office</h4>
                <p>Amanat Heights, Level 6, GEC Circle</p>
                <p>Nasirabad, Chittagong 4000</p>
              </div>
            </div>

            <div className="office-card">
              <span className="office-pin">📞</span>
              <div>
                <h4>Direct Phone Inquiries</h4>
                <p><a href="tel:+8801711223344">+880 1711-223344</a> (Advisory)</p>
                <p><a href="tel:+8801800112233">+880 1800-112233</a> (Toll-Free Customer Desk)</p>
              </div>
            </div>

            <div className="office-card">
              <span className="office-pin">✉️</span>
              <div>
                <h4>Electronic Inquiries</h4>
                <p><a href="mailto:advisory@realestate.com">advisory@realestate.com</a></p>
                <p><a href="mailto:support@realestate.com">support@realestate.com</a></p>
              </div>
            </div>

            <div className="office-card hours-card">
              <span className="office-pin">🕒</span>
              <div>
                <h4>Consultation Hours</h4>
                <p>Saturday – Thursday: 9:00 AM – 7:30 PM</p>
                <p>Friday: By Advance Appointment (VIP Visits)</p>
              </div>
            </div>
>>>>>>> 9c75aec (Update Real Estate project)
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
