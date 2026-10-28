import { useEffect, useState, useMemo, useRef } from 'react'
import { getProperties } from '../services/propertyApi.js'
import { projectsData, categoriesData, assets } from '../../../assets/data/assets.js'

function PropertyList({ 
  currency = 'BDT', 
  savedIds = [], 
  onToggleSave, 
  onSelectProperty,
  externalFilter = {}
}) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(externalFilter.category || 'all')
  const [selectedPurpose, setSelectedPurpose] = useState(externalFilter.purpose || 'all')
  const [selectedCity, setSelectedCity] = useState(externalFilter.city || 'all')
  const [selectedBedrooms, setSelectedBedrooms] = useState('all') // 'all', '1', '2', '3', '4+'
  const [selectedBudget, setSelectedBudget] = useState('all') // 'all', 'under1.5cr', '1.5-4cr', '4-8cr', '8cr+'
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [poolOnly, setPoolOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [visibleCount, setVisibleCount] = useState(9)

  const categoryScrollRef = useRef(null)

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      })
    }
  }

  // Sync external filters if passed from Hero search
  useEffect(() => {
    if (externalFilter.category) setSelectedCategory(externalFilter.category)
    if (externalFilter.purpose) setSelectedPurpose(externalFilter.purpose)
    if (externalFilter.city) setSelectedCity(externalFilter.city)
    if (externalFilter.search) setSearchQuery(externalFilter.search)
    if (externalFilter.budget) setSelectedBudget(externalFilter.budget)
  }, [externalFilter])

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    getProperties({ limit: 15 })
      .then((r) => {
        if (!isMounted) return
        if (r && r.properties && r.properties.length > 0) {
          const merged = r.properties.map((backendProp, idx) => {
            const fallback = projectsData[idx % projectsData.length]
            return {
              ...fallback,
              ...backendProp,
              id: backendProp.id || fallback.id,
              title: backendProp.title || fallback.title,
              city: backendProp.city || fallback.city,
              price: backendProp.price || fallback.priceNum,
              priceBDT: `৳ ${Number(backendProp.price || fallback.priceNum).toLocaleString()}`,
              priceUSD: `$${Math.round(Number(backendProp.price || fallback.priceNum) / 110).toLocaleString()}`,
              image: backendProp.image_url || fallback.image,
              gallery: fallback.gallery,
              bedrooms: backendProp.bedrooms ?? fallback.bedrooms,
              bathrooms: backendProp.bathrooms ?? fallback.bathrooms,
              area_sqft: backendProp.area_sqft ?? fallback.area_sqft,
              purpose: backendProp.listing_type || fallback.purpose || 'sale',
              category: backendProp.property_type || fallback.category || 'apartment'
            }
          })
          setProperties(merged)
        } else {
          setProperties(projectsData)
        }
      })
      .catch(() => {
        if (isMounted) setProperties(projectsData)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all') {
          const cat = (p.category || '').toLowerCase()
          if (cat !== selectedCategory.toLowerCase()) return false
        }
        // Purpose filter
        if (selectedPurpose !== 'all') {
          const pur = (p.purpose || 'sale').toLowerCase()
          if (pur !== selectedPurpose.toLowerCase()) return false
        }
        // City filter
        if (selectedCity !== 'all') {
          const c = (p.city || p.location || '').toLowerCase()
          if (!c.includes(selectedCity.toLowerCase())) return false
        }
        // Bedrooms filter
        if (selectedBedrooms !== 'all') {
          const beds = Number(p.bedrooms || 0)
          if (selectedBedrooms === '1' && beds !== 1) return false
          if (selectedBedrooms === '2' && beds !== 2) return false
          if (selectedBedrooms === '3' && beds !== 3) return false
          if (selectedBedrooms === '4+' && beds < 4) return false
        }
        // Budget filter
        if (selectedBudget !== 'all') {
          const price = Number(p.priceNum || p.price || 0)
          if (selectedBudget === 'under1.5cr' && price > 15000000) return false
          if (selectedBudget === '1.5-4cr' && (price < 15000000 || price > 40000000)) return false
          if (selectedBudget === '4-8cr' && (price < 40000000 || price > 80000000)) return false
          if (selectedBudget === '8cr+' && price < 80000000) return false
        }
        // Featured only
        if (featuredOnly && p.badge !== 'Featured' && p.badgeType !== 'featured') {
          return false
        }
        // Pool only
        if (poolOnly) {
          const hasPool = (p.amenities || []).some((am) => am.toLowerCase().includes('pool'))
          if (!hasPool) return false
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase()
          const matchTitle = (p.title || '').toLowerCase().includes(q)
          const matchLoc = (p.location || p.city || '').toLowerCase().includes(q)
          const matchDesc = (p.description || '').toLowerCase().includes(q)
          const matchCat = (p.category || '').toLowerCase().includes(q)
          if (!matchTitle && !matchLoc && !matchDesc && !matchCat) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          const priceA = currency === 'USD' ? (a.priceNumUSD || 0) : (a.priceNum || Number(a.price) || 0)
          const priceB = currency === 'USD' ? (b.priceNumUSD || 0) : (b.priceNum || Number(b.price) || 0)
          return priceA - priceB
        }
        if (sortBy === 'price-high') {
          const priceA = currency === 'USD' ? (a.priceNumUSD || 0) : (a.priceNum || Number(a.price) || 0)
          const priceB = currency === 'USD' ? (b.priceNumUSD || 0) : (b.priceNum || Number(b.price) || 0)
          return priceB - priceA
        }
        if (sortBy === 'sqft') {
          return (b.area_sqft || 0) - (a.area_sqft || 0)
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0)
        }
        return (b.badge === 'Featured' ? 1 : 0) - (a.badge === 'Featured' ? 1 : 0)
      })
  }, [
    properties, 
    selectedCategory, 
    selectedPurpose, 
    selectedCity, 
    selectedBedrooms, 
    selectedBudget, 
    featuredOnly, 
    poolOnly, 
    searchQuery, 
    sortBy, 
    currency
  ])

  const visibleProperties = filteredProperties.slice(0, visibleCount)

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedPurpose('all')
    setSelectedCity('all')
    setSelectedBedrooms('all')
    setSelectedBudget('all')
    setFeaturedOnly(false)
    setPoolOnly(false)
    setSearchQuery('')
    setSortBy('featured')
  }

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedPurpose !== 'all',
    selectedCity !== 'all',
    selectedBedrooms !== 'all',
    selectedBudget !== 'all',
    featuredOnly,
    poolOnly,
    Boolean(searchQuery.trim())
  ].filter(Boolean).length

  return (
    <section id="projects" className="projects-showcase-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-kicker">Curated Portfolio</span>
          <h2>Featured Properties & Residencies</h2>
          <p>
            Explore our hand-inspected luxury villas, lakeview apartments, penthouses, duplexes, and corporate commercial spaces
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="property-filter-toolbar">
          {/* Top row: Search input + Purpose + Sort + View */}
          <div className="toolbar-top-row">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search by title, neighborhood (e.g. Gulshan, Banani, Lakeview), or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')} title="Clear search">
                  ✕
                </button>
              )}
            </div>

            <div className="toolbar-right-controls">
              {/* Purpose Tabs */}
              <div className="purpose-pill-toggle">
                <button 
                  className={selectedPurpose === 'all' ? 'active' : ''} 
                  onClick={() => setSelectedPurpose('all')}
                >
                  All
                </button>
                <button 
                  className={selectedPurpose === 'sale' ? 'active' : ''} 
                  onClick={() => setSelectedPurpose('sale')}
                >
                  For Sale
                </button>
                <button 
                  className={selectedPurpose === 'rent' ? 'active' : ''} 
                  onClick={() => setSelectedPurpose('rent')}
                >
                  For Rent
                </button>
              </div>

              {/* Sort By */}
              <select 
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort properties"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="sqft">Most Spacious (Sqft)</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Toggle */}
              <div className="view-mode-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  ☵
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                  aria-label="List View"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Category Tabs with Left / Right Scroll Buttons */}
          <div className="category-scroll-container">
            <button 
              className="cat-scroll-arrow left" 
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
            >
              ‹
            </button>

            <div className="category-tabs-scroll" ref={categoryScrollRef}>
              {categoriesData.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="pill-icon">{cat.icon}</span>
                  <span className="pill-title">{cat.name}</span>
                  <span className="pill-badge">{cat.count}</span>
                </button>
              ))}
            </div>

            <button 
              className="cat-scroll-arrow right" 
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
            >
              ›
            </button>
          </div>

          {/* Row 3: Extended Variety Filters (Bedrooms, Price, Special) */}
          <div className="extended-filters-row">
            {/* Bedrooms selector */}
            <div className="filter-chip-group">
              <span className="filter-chip-label">Bedrooms:</span>
              <div className="filter-chips">
                {[
                  { id: 'all', label: 'Any' },
                  { id: '1', label: '1 Bed' },
                  { id: '2', label: '2 Beds' },
                  { id: '3', label: '3 Beds' },
                  { id: '4+', label: '4+ Beds' }
                ].map((b) => (
                  <button
                    key={b.id}
                    className={`filter-chip ${selectedBedrooms === b.id ? 'active' : ''}`}
                    onClick={() => setSelectedBedrooms(b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget selector */}
            <div className="filter-chip-group">
              <span className="filter-chip-label">Budget:</span>
              <div className="filter-chips">
                {[
                  { id: 'all', label: 'Any Price' },
                  { id: 'under1.5cr', label: '< ৳1.5 Cr' },
                  { id: '1.5-4cr', label: '৳1.5 - 4 Cr' },
                  { id: '4-8cr', label: '৳4 - 8 Cr' },
                  { id: '8cr+', label: '৳8 Cr+' }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    className={`filter-chip ${selectedBudget === bg.id ? 'active' : ''}`}
                    onClick={() => setSelectedBudget(bg.id)}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick toggles */}
            <div className="filter-chip-group special-toggles">
              <button
                className={`filter-chip toggle-chip ${featuredOnly ? 'active' : ''}`}
                onClick={() => setFeaturedOnly(!featuredOnly)}
              >
                ⭐ Featured Only
              </button>
              <button
                className={`filter-chip toggle-chip ${poolOnly ? 'active' : ''}`}
                onClick={() => setPoolOnly(!poolOnly)}
              >
                🏊 With Pool
              </button>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="active-filters-row">
              <span className="filters-label">Active filters ({activeFiltersCount}):</span>
              {selectedCategory !== 'all' && (
                <span className="filter-tag">
                  Type: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>✕</button>
                </span>
              )}
              {selectedPurpose !== 'all' && (
                <span className="filter-tag">
                  Purpose: {selectedPurpose === 'sale' ? 'For Sale' : 'For Rent'}
                  <button onClick={() => setSelectedPurpose('all')}>✕</button>
                </span>
              )}
              {selectedCity !== 'all' && (
                <span className="filter-tag">
                  City: {selectedCity}
                  <button onClick={() => setSelectedCity('all')}>✕</button>
                </span>
              )}
              {selectedBedrooms !== 'all' && (
                <span className="filter-tag">
                  Beds: {selectedBedrooms}
                  <button onClick={() => setSelectedBedrooms('all')}>✕</button>
                </span>
              )}
              {selectedBudget !== 'all' && (
                <span className="filter-tag">
                  Budget: {selectedBudget}
                  <button onClick={() => setSelectedBudget('all')}>✕</button>
                </span>
              )}
              {featuredOnly && (
                <span className="filter-tag">
                  Featured
                  <button onClick={() => setFeaturedOnly(false)}>✕</button>
                </span>
              )}
              {poolOnly && (
                <span className="filter-tag">
                  With Pool
                  <button onClick={() => setPoolOnly(false)}>✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-tag">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>✕</button>
                </span>
              )}
              <button className="reset-all-link" onClick={clearAllFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Counter */}
        <div className="results-counter-bar">
          <p>
            Showing <strong>{visibleProperties.length}</strong> of <strong>{filteredProperties.length}</strong> available properties
            {activeFiltersCount > 0 && <span className="filtered-hint"> (Filters active)</span>}
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="properties-loading-state">
            <div className="spinner-loader" />
            <p>Loading curated real estate listings...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          /* Empty state */
          <div className="properties-empty-card">
            <span className="empty-icon">🏠</span>
            <h3>No Properties Match Your Current Filter</h3>
            <p>Try resetting the search keyword or broadening your category selection</p>
            <button className="btn-primary" onClick={clearAllFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Property Grid / List */
          <div className={`projects-${viewMode}`}>
            {visibleProperties.map((p) => {
              const isSaved = savedIds.includes(p.id)
              const displayPrice = currency === 'USD' 
                ? (p.priceUSD || `$${Number(p.price || 0).toLocaleString()}`) 
                : (p.priceBDT || `৳ ${Number(p.price || 0).toLocaleString()}`)

              return (
                <article key={p.id} className="project-card">
                  {/* Image container */}
                  <div className="card-media-wrap">
                    <img 
                      src={p.image || p.image_url} 
                      alt={p.title} 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = assets.project_img_1
                      }}
                      onClick={() => onSelectProperty && onSelectProperty(p)}
                    />
                    
                    {/* Badges */}
                    <div className="card-badges">
                      {p.badge && (
                        <span className={`badge-pill ${p.badgeType || 'featured'}`}>
                          {p.badge}
                        </span>
                      )}
                      <span className="badge-purpose">
                        {p.purpose === 'rent' ? 'Rent' : 'Sale'}
                      </span>
                    </div>

                    {/* Heart button */}
                    <button 
                      className={`card-wishlist-btn ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onToggleSave) onToggleSave(p.id)
                      }}
                      title={isSaved ? 'Remove from saved' : 'Save property'}
                      aria-label="Save property"
                    >
                      {isSaved ? '♥' : '♡'}
                    </button>

                    {/* Quick view hover button */}
                    <button 
                      className="card-quickview-btn"
                      onClick={() => onSelectProperty && onSelectProperty(p)}
                    >
                      Quick View
                    </button>
                  </div>

                  {/* Info */}
                  <div className="card-content">
                    <div className="card-meta-top">
                      <span className="card-location">📍 {p.location || p.city}</span>
                      <span className="card-rating">★ {p.rating || '4.9'}</span>
                    </div>

                    <h3 
                      className="card-title" 
                      onClick={() => onSelectProperty && onSelectProperty(p)}
                    >
                      {p.title}
                    </h3>

                    {/* Specs chips */}
                    <div className="card-specs-row">
                      <div className="spec-item" title="Bedrooms">
                        <span className="spec-ico">🛏️</span>
                        <span>{p.bedrooms ?? 3} Beds</span>
                      </div>
                      <div className="spec-item" title="Bathrooms">
                        <span className="spec-ico">🚿</span>
                        <span>{p.bathrooms ?? 3} Baths</span>
                      </div>
                      <div className="spec-item" title="Area">
                        <span className="spec-ico">📐</span>
                        <span>{p.area_sqft || 2400} sqft</span>
                      </div>
                    </div>

                    {/* Footer price & action */}
                    <div className="card-footer-row">
                      <div className="price-stack">
                        <span className="price-label">Price</span>
                        <strong className="price-amount">{displayPrice}</strong>
                      </div>

                      <button 
                        className="btn-details"
                        onClick={() => onSelectProperty && onSelectProperty(p)}
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredProperties.length > visibleCount && (
          <div className="load-more-wrap">
            <button 
              className="btn-load-more"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Properties ({filteredProperties.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertyList
