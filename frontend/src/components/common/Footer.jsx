import { useState } from 'react'
import { assets } from '../../assets/data/assets.js'

function Footer({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setSubscribed(true)
    setTimeout(() => {
      setNewsletterEmail('')
    }, 4000)
  }

  const handleNav = (e, path, sectionId) => {
    e.preventDefault()
    if (path === '/about') {
      if (onNavigate) onNavigate('/about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (onNavigate) onNavigate('/')
    setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <footer className="footer-master">
      {/* Newsletter Strip */}
      <div className="newsletter-strip">
        <div className="section-container newsletter-flex">
          <div className="newsletter-text">
            <h3>Subscribe to Off-Market & Exclusive Property Deals</h3>
            <p>Get priority access to pre-launch developer rates, luxury penthouse viewings, and market insights.</p>
          </div>

          <div className="newsletter-form-wrap">
            {subscribed ? (
              <div className="newsletter-success">
                ✓ Thank you! You will receive our weekly curated property brief.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit">Subscribe Free</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="footer-columns-area">
        <div className="section-container footer-cols-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img src={assets.logo} alt="Real Estate" className="footer-logo-img" />
              <span className="footer-brand-name">ESTATE HUB</span>
            </div>
            <p className="footer-bio">
              Bangladesh’s premier real estate consultancy. Delivering uncompromising legal due diligence, architectural distinction, and seamless property acquisition since 2010.
            </p>
            <div className="footer-contact-mini">
              <p>📍 Road 11, Banani Commercial Zone, Dhaka</p>
              <p>📞 Hotline: +880 1711-223344</p>
              <p>✉️ info@realestate.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => handleNav(e, '/', 'home')}>Home</a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNav(e, '/about', 'about')}>About Our Heritage</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Featured Properties</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNav(e, '/', 'services')}>Our Capabilities</a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleNav(e, '/', 'testimonials')}>Client Testimonials</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNav(e, '/', 'contact')}>Contact Advisors</a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="footer-col">
            <h4>Property Categories</h4>
            <ul>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Luxury Garden Villas</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Skyline Penthouses</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Lakeview Apartments</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Double-Height Duplexes</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Corporate Office Floors</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Studio Lofts & Apartments</a></li>
            </ul>
          </div>

          {/* Prime Neighborhoods */}
          <div className="footer-col">
            <h4>Prime Locations</h4>
            <ul>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Gulshan & Banani, Dhaka</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Dhanmondi Lakeview, Dhaka</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Uttara Expressway, Dhaka</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Patenga Bay, Chittagong</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Tea Estate Valley, Sylhet</a></li>
              <li><a href="#projects" onClick={(e) => handleNav(e, '/', 'projects')}>Overseas & Diaspora Hubs</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="section-container bottom-flex">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Estate Hub Inc. All rights reserved. 100% Legal Title Protected.
          </p>
          <div className="footer-legal-links">
            <a href="#home">Privacy Policy</a>
            <span>•</span>
            <a href="#home">Terms of Service</a>
            <span>•</span>
            <a href="#home">RAJUK Guidelines</a>
            <span>•</span>
            <a href="#home">Title Verification Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
