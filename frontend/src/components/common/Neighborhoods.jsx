import { neighborhoodsData, assets } from '../../assets/data/assets.js'

function Neighborhoods({ onSelectCity }) {
  return (
    <section className="neighborhoods-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">Prime Destinations</span>
          <h2>Explore Prime Neighborhoods</h2>
          <p>Discover premier locations known for vibrant living, top educational institutes, serene parks, and highest capital appreciation</p>
        </div>

        <div className="neighborhoods-grid">
          {neighborhoodsData.map((item, idx) => (
            <div 
              key={idx} 
              className="neighborhood-card"
              onClick={() => {
                if (onSelectCity) onSelectCity(item.city)
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <div className="neighborhood-image-wrap">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = assets.project_img_1
                  }}
                />
                <div className="neighborhood-overlay">
                  <span className="neighborhood-tag">{item.tag}</span>
                  <div className="neighborhood-info">
                    <h3>{item.name}</h3>
                    <p>{item.city} · {item.count}</p>
                    <span className="avg-price">{item.avgPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Neighborhoods
