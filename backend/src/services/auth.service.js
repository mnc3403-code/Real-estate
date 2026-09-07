import { createUser, findUserByEmail, updateLastLogin } from '../models/user.model.js'
import { hashPassword, verifyPassword } from '../utils/password.js'

export async function registerUser({ firstName, lastName, email, password, phone }) {
  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    const error = new Error('An account with this email already exists.')
    error.code = 'EMAIL_EXISTS'
    throw error
  }

  const passwordHash = await hashPassword(password)

  return createUser({ firstName, lastName, email, passwordHash, phone })
}

export async function loginUser({ email, password }) {
  const user = await findUserByEmail(email)
  if (!user) return null

  const passwordValid = await verifyPassword(password, user.password_hash)
  if (!passwordValid) return null

  await updateLastLogin(user.id)
  return user
}
