import { useState } from 'react'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return <main className="forgot-page"><section className="forgot-card"><a href="/login" className="forgot-back">← Back to sign in</a><p className="forgot-eyebrow">Account recovery</p><h1>Reset your password</h1><p className="forgot-description">Enter your account email and we'll prepare the password-reset flow for your account.</p>{submitted ? <div className="forgot-success">If an account exists for <strong>{email}</strong>, password reset instructions will be sent once email delivery is enabled.</div> : <form onSubmit={handleSubmit}><label htmlFor="forgot-email">Email address</label><input id="forgot-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button type="submit">Continue</button></form>}<p className="forgot-note">Email delivery and secure reset tokens will be connected in the next authentication phase.</p></section></main>
}

export default ForgotPassword
