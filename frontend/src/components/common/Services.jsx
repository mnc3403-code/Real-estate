import { servicesData } from '../../assets/data/assets.js'

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">End-to-End Capabilities</span>
          <h2>Our Comprehensive Services</h2>
          <p>From initial title searches to bank loans and interior handover, our specialized divisions provide seamless expertise</p>
        </div>

        <div className="services-grid">
          {servicesData.map((svc, idx) => (
            <div key={idx} className="service-card">
              <span className="service-icon">{svc.icon}</span>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <a href="#contact" className="service-link">
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
