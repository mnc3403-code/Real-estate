import { useState } from 'react'

function PasswordInput({ id, name, label = 'Password', value, onChange, placeholder, error }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <div className="password-input-wrap">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={id === 'login-password' ? 'current-password' : 'new-password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <span id={`${id}-error`} className="field-error">{error}</span>}
    </div>
  )
}

export default PasswordInput
