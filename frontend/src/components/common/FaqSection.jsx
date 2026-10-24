import { useState } from 'react'
import { faqsData } from '../../assets/data/assets.js'

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section className="faq-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-kicker">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Clear, direct answers regarding property ownership, legal safeguards, and purchasing steps</p>
        </div>

        <div className="faq-list">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
