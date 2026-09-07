import { useState } from 'react'
import { assets, testimonialsData } from '../../assets/data/assets.js'

function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const currentTestimonial = testimonialsData[testimonialIndex]

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length,
    )
  }

  return (
    <section id="testimonials" className="testimonials">
      <h2>What our clients say</h2>

      <div className="testimonial">
        <div className="testimonial-image">
          <img src={currentTestimonial.image} alt={currentTestimonial.alt} />
        </div>
        <div className="testimonial-content">
          <div className="stars">
            {Array.from({ length: currentTestimonial.rating }).map(
              (_, index) => (
                <img key={index} src={assets.star_icon} alt="star" />
              ),
            )}
          </div>
          <p className="quote">{currentTestimonial.text}</p>
          <h3>{currentTestimonial.name}</h3>
          <p className="role">{currentTestimonial.title}</p>
        </div>
      </div>

      <div className="arrows">
        <img src={assets.left_arrow} alt="Previous" onClick={prevTestimonial} />
        <img src={assets.right_arrow} alt="Next" onClick={nextTestimonial} />
      </div>
    </section>
  )
}

export default Testimonials
