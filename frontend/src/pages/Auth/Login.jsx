import { useState } from 'react'
import PasswordInput from '../../features/authentication/components/PasswordInput.jsx'
import { loginUser } from '../../features/authentication/services/authApi.js'
import './Login.css'

const roles = [
  { value: 'user', label: 'Customer', icon: '⌂', description: 'Find homes, save properties and manage inquiries.' },
  { value: 'agent', label: 'Agent', icon: '◆', description: 'Manage listings, leads, viewings and clients.' },
  { value: 'admin', label: 'Admin', icon: '⚙', description: 'Manage the platform, users and property approvals.' },
]

function Login() {
  const [values, setValues] = useState({ email: '', password: '', role: 'user' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (!values.password) nextErrors.password = 'Enter your password.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsSubmitting(true)
    setMessage('')

    try {
      const result = await loginUser(values)
      window.location.href = '/dashboard'
      return result
    } catch (error) {
      setMessage(error.message)
      setErrors((current) => ({ ...current, ...error.fieldErrors }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-brand-panel">
          <a className="auth-back" href="/">← Back to home</a>
          <p className="login-eyebrow">Estate Platform</p>
          <h1>Welcome back.</h1>
          <p>Sign in to continue managing your real-estate journey from one professional workspace.</p>
          <div className="login-trust-list">
            <span>✓ Secure account access</span>
            <span>✓ Role-based workspace</span>
            <span>✓ One place for your property activity</span>
          </div>
        </div>

        <div className="login-card">
          <div className="login-intro">
            <p className="login-section-label">Sign in</p>
            <h2>Choose your account</h2>
            <p>Your workspace changes according to your verified account role.</p>
          </div>

          {message && <div className="login-alert" role="alert">{message}</div>}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="role-grid" aria-label="Account type">
              {roles.map((role) => (
                <label className={`role-option role-${role.value} ${values.role === role.value ? 'selected' : ''}`} key={role.value}>
                  <input type="radio" name="role" value={role.value} checked={values.role === role.value} onChange={handleChange} />
                  <span className="role-icon">{role.icon}</span>
                  <span className="role-copy"><strong>{role.label}</strong><small>{role.description}</small></span>
                </label>
              ))}
            </div>
            {errors.role && <span className="login-error">{errors.role}</span>}

            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input id="login-email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" aria-invalid={Boolean(errors.email)} />
              {errors.email && <span className="login-error">{errors.email}</span>}
            </div>

            <PasswordInput id="login-password" name="password" label="Password" value={values.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} />

            <div className="login-options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="login-signup-link">Don't have an account? <a href="/signup">Create one</a></p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
