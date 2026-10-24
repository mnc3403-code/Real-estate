import { categoriesData } from '../../../assets/data/assets.js'

function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <section className="category-section">
      <div className="section-container">
        <div className="section-header-compact">
          <span className="section-kicker">Diverse Portfolio</span>
          <h2>Explore by Property Type</h2>
          <p>Find the exact architecture and space that matches your lifestyle and investment ambition</p>
        </div>

        <div className="category-grid">
          {categoriesData.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                className={`category-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count} listings</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryPills
