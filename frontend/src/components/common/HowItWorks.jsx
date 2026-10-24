function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Search & Shortlist',
      desc: 'Browse our curated, verified listings with smart filters for bedrooms, budget, and neighborhood ambiance.'
    },
    {
      num: '02',
      title: 'Guided or 3D Tour',
      desc: 'Experience a high-definition 3D virtual walkthrough or schedule an accompanied private visit with our property consultant.'
    },
    {
      num: '03',
      title: 'Title Check & Offer',
      desc: 'Our legal advocates verify ownership title deeds and ensure 100% clean documentation with transparent negotiation.'
    },
    {
      num: '04',
      title: 'Key Handover & Move-In',
      desc: 'Fast bank mortgage processing, hassle-free registration, and formal key handover to your new sanctuary.'
    }
  ]

  return (
    <section className="how-it-works-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">Simple & Transparent</span>
          <h2>How We Make It Effortless</h2>
          <p>Four easy steps separating you from unlocking the door to your dream residence</p>
        </div>

        <div className="steps-grid">
          {steps.map((st, i) => (
            <div key={i} className="step-card">
              <span className="step-number">{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
