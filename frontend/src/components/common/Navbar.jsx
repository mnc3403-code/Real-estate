import { useState } from 'react'
import { assets } from '../../assets/data/assets.js'

function Navbar() {
  const [menu, setMenu] = useState(false)

  return (
    <>
      <nav className="navbar">
        <img className="logo" src={assets.logo} alt="Logo" />

        <ul className={menu ? 'menu open' : 'menu'}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="/login" className="sign-in">Sign in</a>
          <a href="/signup" className="sign-up">
            Sign up
          </a>
          <img
            className="menu-icon"
            src={assets.menu_icon}
            alt="Open menu"
            onClick={() => setMenu(true)}
          />
        </div>
      </nav>

      {menu && (
        <div className="mobile-menu">
          <img
            src={assets.cross_icon}
            alt="Close menu"
            onClick={() => setMenu(false)}
          />
          <ul>
            <li>
              <a href="#home" onClick={() => setMenu(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenu(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setMenu(false)}>
                Projects
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setMenu(false)}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenu(false)}>
                Contact
              </a>
            </li>
            <li>
              <a href="/login" onClick={() => setMenu(false)}>
                Sign in
              </a>
            </li>
            <li>
              <a href="/signup" onClick={() => setMenu(false)}>
                Sign up
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
