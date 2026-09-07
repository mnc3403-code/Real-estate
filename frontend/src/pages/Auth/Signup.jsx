import { useState } from 'react'
import PasswordInput from '../../features/authentication/components/PasswordInput.jsx'
import { registerUser } from '../../features/authentication/services/authApi.js'
import { validateSignupForm } from '../../features/authentication/validation/authValidation.js'
import './Signup.css'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

function Signup() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [serverMessage, setServerMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setServerMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSuccess(false)

    const validationErrors = validateSignupForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    setServerMessage('')

    try {
      await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })

      setSuccess(true)
      setValues(initialValues)
    } catch (error) {
      setServerMessage(error.message)
      setErrors((current) => ({ ...current, ...error.fieldErrors }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-card" aria-labelledby="signup-title">
        <div className="signup-intro">
          <p className="signup-eyebrow">Real Estate</p>
          <h1 id="signup-title">Create your account</h1>
          <p>Join our platform to discover properties and manage your real-estate activity.</p>
        </div>

        {success && (
          <div className="signup-alert signup-alert-success" role="status">
            Your account has been created successfully.
          </div>
        )}

        {serverMessage && !success && (
          <div className="signup-alert signup-alert-error" role="alert">
            {serverMessage}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-grid">
            <div className="signup-field">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" name="firstName" value={values.firstName} onChange={handleChange} autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>

            <div className="signup-field">
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" name="lastName" value={values.lastName} onChange={handleChange} autoComplete="family-name" aria-invalid={Boolean(errors.lastName)} />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" aria-invalid={Boolean(errors.email)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="signup-field">
            <label htmlFor="phone">Phone <span>(optional)</span></label>
            <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <PasswordInput id="password" name="password" value={values.password} onChange={handleChange} placeholder="At least 8 characters" error={errors.password} />
          <PasswordInput id="confirmPassword" name="confirmPassword" label="Confirm password" value={values.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" error={errors.confirmPassword} />

          <label className="terms-row">
            <input type="checkbox" name="agreeToTerms" checked={values.agreeToTerms} onChange={handleChange} />
            <span>I agree to the platform terms and privacy policy.</span>
          </label>
          {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}

          <button className="signup-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>

          <p className="signup-login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Signup
