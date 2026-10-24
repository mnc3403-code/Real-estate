import { assets, teamMembersData, companyMilestones, companyValues, awardsData } from '../../assets/data/assets.js'

function AboutPage({ onNavigate }) {
  return (
    <div className="about-page">
      {/* Top Banner */}
      <section className="about-hero-banner">
        <div className="section-container">
          <div className="breadcrumb-nav">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span>/</span>
            <span className="current">About Us</span>
          </div>
          <h1>Crafting Lifelong Sanctuaries & Inspiring Living Spaces</h1>
          <p className="about-hero-lead">
            For over 15 years, we have been reshaping how families discover, acquire, and cherish their homes — uniting legal certainty with architectural distinction.
          </p>

          <div className="about-hero-stats">
            <div className="hero-stat-box">
              <strong>15+</strong>
              <span>Years of Excellence</span>
            </div>
            <div className="hero-stat-box">
              <strong>2,500+</strong>
              <span>Families Settled</span>
            </div>
            <div className="hero-stat-box">
              <strong>180+</strong>
              <span>Developer Alliances</span>
            </div>
            <div className="hero-stat-box">
              <strong>99.4%</strong>
              <span>Legal Clean Record</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section className="about-story-section">
        <div className="section-container">
          <div className="about-story-grid">
            <div className="story-content">
              <span className="section-kicker">Our Heritage & Story</span>
              <h2>Built on Honesty, Elevated by Architecture</h2>
              <p>
                Founded in 2010 in Gulshan, Dhaka, our agency was born out of a clear realization: finding a home should be an empowering and joyful milestone, free from deceptive pricing, clouded title deeds, or pushy brokerage tactics.
              </p>
              <p>
                Over the past decade and a half, we have grown into one of the most respected property advisory firms in South Asia. We pair experienced property attorneys with visionary architects, ensuring that every residence in our portfolio meets exceptional standards of structural safety, aesthetic beauty, and long-term investment value.
              </p>

              <div className="mission-vision-grid">
                <div className="mv-card">
                  <div className="mv-icon">🎯</div>
                  <h4>Our Mission</h4>
                  <p>To provide clients with unwavering clarity, legally fortified property rights, and an effortless purchasing journey tailored to their lifestyle.</p>
                </div>
                <div className="mv-card">
                  <div className="mv-icon">👁️</div>
                  <h4>Our Vision</h4>
                  <p>To be the most trustworthy, tech-forward real estate ecosystem across Bangladesh and international expatriate communities.</p>
                </div>
              </div>
            </div>

            <div className="story-image-wrap">
              <img src={assets.brand_img} alt="Real Estate Headquarters" className="brand-photo" />
              <div className="story-floating-card">
                <span className="trophy-icon">🏆</span>
                <div>
                  <strong>Best Real Estate Agency 2024</strong>
                  <p>Recognized by Bangladesh Real Estate Forum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars / Core Values */}
      <section className="about-values-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">Our Core Foundations</span>
            <h2>The Four Pillars of Client Trust</h2>
            <p>Every transaction we manage is guided by strict professional standards and client-centric guarantees</p>
          </div>

          <div className="values-grid">
            {companyValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <span className="value-icon">{val.icon}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="about-timeline-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">Our Journey</span>
            <h2>Fifteen Years of Memorable Milestones</h2>
            <p>A look back at how continuous dedication and technological innovation propelled our growth</p>
          </div>

          <div className="timeline-wrap">
            {companyMilestones.map((item, idx) => (
              <div key={idx} className="timeline-node">
                <div className="timeline-year-badge">{item.year}</div>
                <div className="timeline-card">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Team */}
      <section className="about-team-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">Leadership & Experts</span>
            <h2>Meet the Advisors Behind Your Success</h2>
            <p>A multidisciplinary team of developers, senior architects, investment consultants, and legal advocates</p>
          </div>

          <div className="team-grid">
            {teamMembersData.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} />
                  <span className="experience-tag">{member.experience}</span>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-social-row">
                    <a href={`mailto:${member.social.email}`} className="team-email-link">
                      ✉ Contact {member.name.split(' ')[0]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="about-awards-section">
        <div className="section-container">
          <div className="section-header-compact">
            <span className="section-kicker">Industry Accolades</span>
            <h2>Awards & Verified Accreditations</h2>
          </div>

          <div className="awards-grid">
            {awardsData.map((award, idx) => (
              <div key={idx} className="award-badge-card">
                <span className="medal-icon">🎖️</span>
                <div className="award-copy">
                  <h4>{award.title}</h4>
                  <p>{award.org} · <strong>{award.year}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="about-cta-section">
        <div className="section-container">
          <div className="about-cta-box">
            <h2>Ready to Find Your Next Sanctuary?</h2>
            <p>
              Connect with our property advisors today for a personalized consultation, verified property tours, or home loan pre-qualification.
            </p>
            <div className="about-cta-buttons">
              <button 
                onClick={() => onNavigate('/properties')} 
                className="btn-primary-lg"
              >
                Browse All Properties
              </button>
              <button 
                onClick={() => onNavigate('/contact')} 
                className="btn-outline-white"
              >
                Contact Our Advisors
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
