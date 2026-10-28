import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar.jsx'
import Hero from '../pages/Home/Hero.jsx'
import CategoryPills from '../features/properties/components/CategoryPills.jsx'
import PropertyList from '../features/properties/components/PropertyList.jsx'
import PropertyModal from '../features/properties/components/PropertyModal.jsx'
import WishlistDrawer from '../features/properties/components/WishlistDrawer.jsx'
import About from '../components/common/About.jsx'
import Neighborhoods from '../components/common/Neighborhoods.jsx'
import Services from '../components/common/Services.jsx'
import HowItWorks from '../components/common/HowItWorks.jsx'
import Testimonials from '../components/common/Testimonials.jsx'
import FaqSection from '../components/common/FaqSection.jsx'
import ContactForm from '../features/inquiries/components/ContactForm.jsx'
import Footer from '../components/common/Footer.jsx'

// Dedicated Pages
import AboutPage from '../pages/About/AboutPage.jsx'
import PropertiesPage from '../pages/Properties/PropertiesPage.jsx'
import ServicesPage from '../pages/Services/ServicesPage.jsx'
import ReviewsPage from '../pages/Reviews/ReviewsPage.jsx'
import ContactPage from '../pages/Contact/ContactPage.jsx'

import Signup from '../pages/Auth/Signup.jsx'
import Login from '../pages/Auth/Login.jsx'
import ForgotPassword from '../pages/Auth/ForgotPassword.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import { projectsData } from '../assets/data/assets.js'
import './App.css'

function App() {
  const [currentRoute, setCurrentRoute] = useState(
    window.location.pathname.replace(/\/$/, '') || '/'
  )
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('real_estate_currency') || 'BDT'
  })
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('real_estate_saved')
      return stored ? JSON.parse(stored) : [1, 2]
    } catch {
      return [1, 2]
    }
  })
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [heroSearchFilter, setHeroSearchFilter] = useState({})

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname.replace(/\/$/, '') || '/')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Persist currency
  const handleToggleCurrency = () => {
    const next = currency === 'BDT' ? 'USD' : 'BDT'
    setCurrency(next)
    localStorage.setItem('real_estate_currency', next)
  }

  // Persist saved wishlist
  const handleToggleSave = (id) => {
    setSavedIds((prev) => {
      let updated
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id)
      } else {
        updated = [...prev, id]
      }
      localStorage.setItem('real_estate_saved', JSON.stringify(updated))
      return updated
    })
  }

  // Client-side navigate helper
  const handleNavigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentRoute(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle Hero search submission
  const handleHeroSearch = (filters) => {
    setHeroSearchFilter(filters)
  }

  // Handle Category select from CategoryPills
  const handleCategorySelect = (category) => {
    setHeroSearchFilter((prev) => ({ ...prev, category }))
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle City select from Neighborhoods
  const handleSelectCity = (city) => {
    setHeroSearchFilter((prev) => ({ ...prev, city }))
  }

  // Get saved properties objects
  const savedPropertiesList = projectsData.filter((p) => savedIds.includes(p.id))

  // Auth & Dashboard subpages
  if (currentRoute === '/signup') return <Signup />
  if (currentRoute === '/login') return <Login />
  if (currentRoute === '/forgot-password') return <ForgotPassword />
  if (currentRoute === '/dashboard') return <Dashboard />

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        savedCount={savedIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Render Dedicated Page or Home based on currentRoute */}
      <main className="page-body">
        {currentRoute === '/about' ? (
          <AboutPage onNavigate={handleNavigate} />
        ) : currentRoute === '/properties' ? (
          <PropertiesPage
            currency={currency}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={setSelectedProperty}
            onNavigate={handleNavigate}
          />
        ) : currentRoute === '/services' ? (
          <ServicesPage onNavigate={handleNavigate} />
        ) : currentRoute === '/reviews' ? (
          <ReviewsPage onNavigate={handleNavigate} />
        ) : currentRoute === '/contact' ? (
          <ContactPage onNavigate={handleNavigate} />
        ) : (
          /* Home Page View */
          <>
            <Hero onSearchSubmit={handleHeroSearch} />
            <CategoryPills 
              selectedCategory={heroSearchFilter.category || 'all'} 
              onSelectCategory={handleCategorySelect} 
            />
            <PropertyList
              currency={currency}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={setSelectedProperty}
              externalFilter={heroSearchFilter}
            />
            <About onOpenAboutPage={() => handleNavigate('/about')} />
            <Neighborhoods onSelectCity={handleSelectCity} />
            <Services />
            <HowItWorks />
            <Testimonials />
            <FaqSection />
            <ContactForm />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Property Details Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          currency={currency}
          isSaved={savedIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSave}
          onClose={() => setSelectedProperty(null)}
          onInquire={(prop, details) => {
            console.log('Inquiry submitted for:', prop.title, details)
          }}
        />
      )}

      {/* Global Saved / Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        savedProperties={savedPropertiesList}
        currency={currency}
        onRemove={handleToggleSave}
        onSelectProperty={(prop) => {
          setSelectedProperty(prop)
          setWishlistOpen(false)
        }}
      />
    </div>
  )
}

export default App
