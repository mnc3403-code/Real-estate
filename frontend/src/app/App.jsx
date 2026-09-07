import Navbar from '../components/common/Navbar.jsx'
import Hero from '../pages/Home/Hero.jsx'
import About from '../components/common/About.jsx'
import PropertyList from '../features/properties/components/PropertyList.jsx'
import Testimonials from '../components/common/Testimonials.jsx'
import ContactForm from '../features/inquiries/components/ContactForm.jsx'
import Footer from '../components/common/Footer.jsx'
import Signup from '../pages/Auth/Signup.jsx'
import Login from '../pages/Auth/Login.jsx'
import ForgotPassword from '../pages/Auth/ForgotPassword.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import './App.css'

function HomePage() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <About />
      <PropertyList />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (path === '/signup') return <Signup />
  if (path === '/login') return <Login />
  if (path === '/forgot-password') return <ForgotPassword />
  if (path === '/dashboard') return <Dashboard />

  return <HomePage />
}

export default App
