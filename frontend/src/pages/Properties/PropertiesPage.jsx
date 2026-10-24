import PropertyList from '../../features/properties/components/PropertyList.jsx'
import CategoryPills from '../../features/properties/components/CategoryPills.jsx'
import { assets } from '../../assets/data/assets.js'

function PropertiesPage({ 
  currency = 'BDT', 
  savedIds = [], 
  onToggleSave, 
  onSelectProperty,
  onNavigate 
}) {
  return (
    <div className="subpage-wrapper">
      {/* Dedicated Header Banner with Image */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-bg">
          <img src={assets.project_img_1} alt="Luxury Properties Catalog" />
          <div className="subpage-hero-overlay" />
        </div>
        <div className="section-container subpage-hero-content">
          <div className="breadcrumb-nav">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span>/</span>
            <span className="current">Properties Catalog</span>
          </div>
          <h1>Explore Prime Properties & Residencies</h1>
          <p className="subpage-hero-desc">
            Discover verified luxury villas, skyline penthouses, duplexes, and corporate commercial spaces with 100% legal title clearance across Bangladesh and overseas.
          </p>

          <div className="subpage-stats-pill-row">
            <span className="subpage-pill">🏢 120+ Verified Listings</span>
            <span className="subpage-pill">🛡️ 100% Legal Title Audited</span>
            <span className="subpage-pill">🕶️ 3D Virtual Tours Ready</span>
          </div>
        </div>
      </section>

      {/* Category Pills Filter */}
      <CategoryPills 
        selectedCategory="all"
        onSelectCategory={(cat) => {
          const el = document.getElementById('projects')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Full Properties List Component */}
      <PropertyList
        currency={currency}
        savedIds={savedIds}
        onToggleSave={onToggleSave}
        onSelectProperty={onSelectProperty}
      />
    </div>
  )
}

export default PropertiesPage
