import { assets } from '../assets/assets.js'

function About() {
  return (
    <section id="about" className="about">
      <div className="about-text">
        <h2>Why choose us?</h2>
        <p>
          We are a team of dedicated real estate professionals with decades of
          combined experience. From buying your first home to investing in
          premium properties, our personalized approach ensures you always
          find the right place at the right price.
        </p>
        <div className="stats">
          <div>
            <span>50+</span>
            <p>Partners</p>
          </div>
          <div>
            <span>120+</span>
            <p>Projects</p>
          </div>
          <div>
            <span>100+</span>
            <p>Homes</p>
          </div>
          <div>
            <span>20+</span>
            <p>Years</p>
          </div>
        </div>
      </div>

      <div className="about-img">
        <img src={assets.brand_img} alt="Our brand" />
      </div>
    </section>
  )
}

export default About
