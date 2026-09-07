const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/
const ROLE_VALUES = new Set(['user', 'agent', 'admin'])

export function validateRegistration(input) {
  const firstName = String(input.firstName ?? '').trim()
  const lastName = String(input.lastName ?? '').trim()
  const email = String(input.email ?? '').trim().toLowerCase()
  const password = String(input.password ?? '')
  const phone = input.phone ? String(input.phone).trim() : null

  const errors = {}

  if (firstName.length < 2 || firstName.length > 50) errors.firstName = 'First name must be between 2 and 50 characters.'
  if (lastName.length < 2 || lastName.length > 50) errors.lastName = 'Last name must be between 2 and 50 characters.'
  if (email.length > 255 || !EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  if (password.length < 8 || password.length > 128) errors.password = 'Password must be between 8 and 128 characters.'
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = 'Enter a valid phone number.'

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { firstName, lastName, email, password, phone },
  }
}

export function validateLogin(input) {
  const email = String(input.email ?? '').trim().toLowerCase()
  const password = String(input.password ?? '')
  const role = String(input.role ?? '').trim()
  const errors = {}

  if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Enter your password.'
  if (!ROLE_VALUES.has(role)) errors.role = 'Choose a valid account type.'

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { email, password, role },
  }
}
