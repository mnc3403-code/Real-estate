export function validateSignupForm(values) {
  const errors = {}

  if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.'
  }

  if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.'
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = 'You must agree before creating an account.'
  }

  return errors
}
