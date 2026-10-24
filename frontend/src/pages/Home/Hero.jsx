<<<<<<< HEAD
import { assets } from '../../assets/data/assets.js'

function Hero() {
  return (
    <section id="home" className="hero">
      <img src={assets.header_img} alt="City skyline" />
      <div className="hero-content">
        <h1>
          Find Your Dream
          <br />
          <span>Home</span>
        </h1>
        <p>
          Discover the perfect property that fits your lifestyle, budget, and
          dreams — with trusted guidance every step of the way.
        </p>
=======
import { useState } from 'react'
import { assets } from '../../assets/data/assets.js'

function Hero({ onSearchSubmit }) {
  const [activeTab, setActiveTab] = useState('sale') // 'sale' or 'rent'
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBudget, setSelectedBudget] = useState('all')

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearchSubmit) {
      onSearchSubmit({
        purpose: activeTab,
        city: selectedCity,
        category: selectedCategory,
        budget: selectedBudget
      })
    }
    const projectsEl = document.getElementById('projects')
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero-section">
      {/* Background Image with Dark Vignette */}
      <div className="hero-media">
        <img src={assets.header_img} alt="Luxury Skyline & Architectural Estates" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>

      <div className="section-container hero-inner">
        <div className="hero-text-wrap">
          <div className="hero-announcement-badge">
            <span className="badge-sparkle">✨</span>
            <span>Over 2,500+ Verified Prime Properties in Bangladesh & Overseas</span>
          </div>

          <h1 className="hero-headline">
            Find Your Sanctuary — From <span className="highlight-text">Urban Penthouses</span> to Serene Family Villas
          </h1>

          <p className="hero-subtext">
            Discover handpicked, legally audited residential and commercial properties with verified ownership records, 3D virtual walkthroughs, and zero hidden markups.
          </p>

          <div className="hero-trust-row">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <span>100% Legal Title Audited</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💎</span>
              <span>Transparent Developer Pricing</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🕶️</span>
              <span>3D Virtual Walkthroughs</span>
            </div>
          </div>
        </div>

        {/* Interactive Search Console */}
        <div className="hero-search-console">
          {/* Tab Selector */}
          <div className="console-tabs">
            <button
              type="button"
              className={`console-tab ${activeTab === 'sale' ? 'active' : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              Buy Property
            </button>
            <button
              type="button"
              className={`console-tab ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              Rent Residence
            </button>
          </div>

          {/* Form */}
          <form className="console-form" onSubmit={handleSearch}>
            <div className="console-field">
              <label>Location / Neighborhood</label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All Locations (Any City)</option>
                <option value="Gulshan">Gulshan & Banani, Dhaka</option>
                <option value="Dhanmondi">Dhanmondi Lakeview, Dhaka</option>
                <option value="Uttara">Uttara Expressway, Dhaka</option>
                <option value="Chittagong">Patenga Bay, Chittagong</option>
                <option value="Sylhet">Tea Gardens, Sylhet</option>
                <option value="California">California & Overseas</option>
              </select>
            </div>

            <div className="console-field">
              <label>Property Type</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Architecture Types</option>
                <option value="apartment">Modern Apartments</option>
                <option value="villa">Luxury Garden Villas</option>
                <option value="penthouse">Skyline Penthouses</option>
                <option value="duplex">Double-Height Duplexes</option>
                <option value="commercial">Commercial Corporate Offices</option>
                <option value="studio">Modern Studio Lofts</option>
                <option value="townhouse">Gated Townhouses</option>
              </select>
            </div>

            <div className="console-field">
              <label>Estimated Budget</label>
              <select 
                value={selectedBudget} 
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="all">Any Price Range</option>
                <option value="under1cr">Under ৳ 1.5 Crore ($140k)</option>
                <option value="mid">৳ 1.5 Cr – ৳ 4.0 Crore</option>
                <option value="luxury">৳ 4.0 Cr – ৳ 8.0 Crore</option>
                <option value="ultra">Ultra Luxury ৳ 8.0 Crore+ ($750k+)</option>
              </select>
            </div>

            <button type="submit" className="console-search-btn">
              <span>Search Properties</span>
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </div>
>>>>>>> 9c75aec (Update Real Estate project)
      </div>
    </section>
  )
}

export default Hero
