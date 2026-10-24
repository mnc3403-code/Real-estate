function WishlistDrawer({ isOpen, onClose, savedProperties, currency = 'BDT', onRemove, onSelectProperty }) {
  if (!isOpen) return null

  const totalEstimate = savedProperties.reduce((acc, p) => {
    return acc + (currency === 'USD' ? (p.priceNumUSD || 0) : (p.priceNum || 0))
  }, 0)

  const formatTotal = (num) => {
    if (currency === 'USD') {
      return `$${num.toLocaleString()}`
    }
    return `৳ ${(num / 10000000).toFixed(2)} Crore (${num.toLocaleString()} BDT)`
  }

  return (
    <div className="wishlist-drawer-backdrop" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-drawer-header">
          <div>
            <h3>My Saved Properties ({savedProperties.length})</h3>
            <p>Shortlist for your future home or investment</p>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        <div className="wishlist-drawer-content">
          {savedProperties.length === 0 ? (
            <div className="wishlist-empty-state">
              <span className="empty-heart-icon">♡</span>
              <h4>Your Shortlist is Empty</h4>
              <p>Explore our wide selection of luxury villas, penthouses, and apartments and click the heart icon to save your favorites!</p>
              <button 
                className="btn-primary-sm" 
                onClick={() => {
                  onClose()
                  const el = document.getElementById('projects')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {savedProperties.map((p) => {
                const displayPrice = currency === 'USD' 
                  ? (p.priceUSD || `$${Number(p.price || 0).toLocaleString()}`) 
                  : (p.priceBDT || `৳ ${Number(p.price || 0).toLocaleString()}`)

                return (
                  <div key={p.id} className="wishlist-item-card">
                    <img 
                      src={p.image || p.image_url} 
                      alt={p.title} 
                      className="wishlist-item-img"
                      onClick={() => {
                        onSelectProperty(p)
                        onClose()
                      }}
                    />
                    <div className="wishlist-item-info">
                      <div className="item-title-row">
                        <h4 
                          onClick={() => {
                            onSelectProperty(p)
                            onClose()
                          }}
                        >
                          {p.title}
                        </h4>
                        <button 
                          className="item-remove-btn" 
                          onClick={() => onRemove(p.id)}
                          title="Remove from saved"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="item-location">📍 {p.location || p.city}</p>
                      <div className="item-specs-compact">
                        <span>{p.bedrooms || 3} Beds</span> · <span>{p.bathrooms || 3} Baths</span> · <span>{p.area_sqft || 2200} sqft</span>
                      </div>
                      <div className="item-price-actions">
                        <strong className="item-price">{displayPrice}</strong>
                        <button 
                          className="item-view-btn"
                          onClick={() => {
                            onSelectProperty(p)
                            onClose()
                          }}
                        >
                          Quick View →
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {savedProperties.length > 0 && (
          <div className="wishlist-drawer-footer">
            <div className="total-row">
              <span>Combined Value:</span>
              <strong>{formatTotal(totalEstimate)}</strong>
            </div>
            <div className="footer-actions-row">
              <button 
                className="btn-outline-full"
                onClick={() => {
                  onClose()
                  const contactSection = document.getElementById('contact')
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Inquire About All Saved ({savedProperties.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistDrawer
