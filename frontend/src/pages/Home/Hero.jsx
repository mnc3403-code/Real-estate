import { assets } from '../../assets/data/assets.js'

function Hero() {
  return (
    <section id="home" className="hero">
      <img src={assets.header_img} alt="City skyline" />
      <div className="hero-content">
        <h1>
          Find Your Dream
          <br />
          <span>Home</span>
        </h1>
        <p>
          Discover the perfect property that fits your lifestyle, budget, and
          dreams — with trusted guidance every step of the way.
        </p>
      </div>
    </section>
  )
}

export default Hero
