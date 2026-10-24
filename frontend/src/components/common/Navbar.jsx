<<<<<<< HEAD
import { useState } from 'react'
import { assets } from '../../assets/data/assets.js'

function Navbar() {
  const [menu, setMenu] = useState(false)

  return (
    <>
      <nav className="navbar">
        <img className="logo" src={assets.logo} alt="Logo" />

        <ul className={menu ? 'menu open' : 'menu'}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="/login" className="sign-in">Sign in</a>
          <a href="/signup" className="sign-up">
            Sign up
          </a>
          <img
            className="menu-icon"
            src={assets.menu_icon}
            alt="Open menu"
            onClick={() => setMenu(true)}
          />
        </div>
      </nav>

      {menu && (
        <div className="mobile-menu">
          <img
            src={assets.cross_icon}
            alt="Close menu"
            onClick={() => setMenu(false)}
          />
          <ul>
            <li>
              <a href="#home" onClick={() => setMenu(false)}>
=======
import { useState, useEffect } from 'react'
import { assets } from '../../assets/data/assets.js'

function Navbar({ 
  currentRoute = '/', 
  onNavigate, 
  currency = 'BDT', 
  onToggleCurrency, 
  savedCount = 0,
  onOpenWishlist 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavLinkClick = (e, path) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(path)
    }
  }

  return (
    <header className={`header-master ${scrolled ? 'scrolled' : ''}`}>
      {/* Top utility ticker bar */}
      <div className="top-utility-bar">
        <div className="utility-container">
          <div className="utility-left">
            <span className="ticker-badge">Notice</span>
            <span className="ticker-text">
              0% Legal Title Verification Fee on all Featured Partner Residencies this month!
            </span>
          </div>

          <div className="utility-right">
            <a href="tel:+8801711223344" className="utility-contact">
              📞 +880 1711-223344
            </a>
            <span className="utility-sep">|</span>
            {/* Currency Switcher */}
            <button 
              className="currency-toggle-btn" 
              onClick={onToggleCurrency}
              title="Toggle Currency between BDT (৳) and USD ($)"
            >
              Currency: <strong>{currency === 'BDT' ? 'BDT (৳)' : 'USD ($)'}</strong>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="nav-container">
          {/* Logo */}
          <div 
            className="brand-logo-wrap" 
            onClick={(e) => handleNavLinkClick(e, '/')}
          >
            <img className="nav-logo" src={assets.logo} alt="Real Estate Logo" />
            <span className="brand-tagline">ESTATE</span>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className="desktop-nav-menu">
            <li>
              <a 
                href="/" 
                className={currentRoute === '/' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/')}
              >
>>>>>>> 9c75aec (Update Real Estate project)
                Home
              </a>
            </li>
            <li>
<<<<<<< HEAD
              <a href="#about" onClick={() => setMenu(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setMenu(false)}>
                Projects
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setMenu(false)}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenu(false)}>
                Contact
              </a>
            </li>
            <li>
              <a href="/login" onClick={() => setMenu(false)}>
                Sign in
              </a>
            </li>
            <li>
              <a href="/signup" onClick={() => setMenu(false)}>
                Sign up
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
=======
              <a 
                href="/about" 
                className={currentRoute === '/about' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/about')}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="/properties" 
                className={currentRoute === '/properties' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/properties')}
              >
                Properties
              </a>
            </li>
            <li>
              <a 
                href="/services" 
                className={currentRoute === '/services' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/services')}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="/reviews" 
                className={currentRoute === '/reviews' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/reviews')}
              >
                Reviews
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className={currentRoute === '/contact' ? 'active-link' : ''}
                onClick={(e) => handleNavLinkClick(e, '/contact')}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions-group">
            {/* Wishlist Button */}
            <button 
              className="wishlist-nav-btn"
              onClick={onOpenWishlist}
              title="View your saved shortlist"
              aria-label="Wishlist"
            >
              <span className="heart-icon">♥</span>
              <span className="wishlist-label">Saved</span>
              {savedCount > 0 && <span className="wishlist-badge">{savedCount}</span>}
            </button>

            {/* Sign In & Sign Up */}
            <a href="/login" className="nav-signin-link">
              Sign In
            </a>
            <a href="/signup" className="nav-signup-btn">
              Get Started
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <img 
                src={mobileMenuOpen ? assets.cross_icon : assets.menu_icon} 
                alt="Menu" 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <div className="drawer-logo">
                <img src={assets.logo_dark} alt="Logo" />
              </div>
              <button 
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Currency selector inside mobile menu */}
            <div className="mobile-currency-bar">
              <span>Display Currency:</span>
              <button onClick={onToggleCurrency} className="mobile-currency-pill">
                {currency === 'BDT' ? '৳ BDT (Bangladeshi Taka)' : '$ USD (US Dollar)'}
              </button>
            </div>

            <ul className="drawer-nav-list">
              <li>
                <a 
                  href="/" 
                  className={currentRoute === '/' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className={currentRoute === '/about' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/about')}
                >
                  About Us (Company Heritage)
                </a>
              </li>
              <li>
                <a 
                  href="/properties" 
                  className={currentRoute === '/properties' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/properties')}
                >
                  Properties Catalog
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className={currentRoute === '/services' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/services')}
                >
                  Our Services
                </a>
              </li>
              <li>
                <a 
                  href="/reviews" 
                  className={currentRoute === '/reviews' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/reviews')}
                >
                  Client Reviews & Stories
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className={currentRoute === '/contact' ? 'active-link' : ''}
                  onClick={(e) => handleNavLinkClick(e, '/contact')}
                >
                  Contact Advisors & Offices
                </a>
              </li>
            </ul>

            <div className="drawer-auth-buttons">
              <button 
                className="drawer-wishlist-action"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onOpenWishlist) onOpenWishlist()
                }}
              >
                ♥ Saved Shortlist ({savedCount})
              </button>
              <a href="/login" className="drawer-login-btn">
                Sign In
              </a>
              <a href="/signup" className="drawer-signup-btn">
                Create Account
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
>>>>>>> 9c75aec (Update Real Estate project)
  )
}

export default Navbar
