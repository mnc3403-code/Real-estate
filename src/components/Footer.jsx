import { assets } from '../assets/assets.js'

function Footer() {
  return (
    <footer className="footer">
      <img src={assets.logo_dark} alt="Logo" />
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Real Estate. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
