import { registerUser, loginUser } from '../services/auth.service.js'
import { createUserSession, getSessionFromToken, revokeUserSession } from '../services/session.service.js'
import { validateRegistration, validateLogin } from '../validators/auth.validator.js'
import { clearSessionCookie, readSessionCookie, setSessionCookie } from '../utils/sessionCookie.js'

function publicUser(user) {
  return {
    id: user.id,
    firstName: user.first_name ?? user.firstName,
    lastName: user.last_name ?? user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    isVerified: user.is_verified ?? user.isVerified,
  }
}

export async function register(req, res, next) {
  try {
    const validation = validateRegistration(req.body)

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields.',
        errors: validation.errors,
      })
    }

    const user = await registerUser(validation.data)

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user,
    })
  } catch (error) {
    if (error.code === 'EMAIL_EXISTS' || error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
        errors: { email: 'An account with this email already exists.' },
      })
    }

    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const validation = validateLogin(req.body)

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields.',
        errors: validation.errors,
      })
    }

    const user = await loginUser(validation.data)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    if (validation.data.role !== user.role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${user.role === 'user' ? 'a customer' : user.role}. Please choose the correct account type.`,
      })
    }

    const session = await createUserSession(user.id)
    setSessionCookie(res, session.token, session.expiresAt)

    return res.json({
      success: true,
      message: 'Signed in successfully.',
      user: publicUser(user),
    })
  } catch (error) {
    next(error)
  }
}

export async function me(req, res, next) {
  try {
    const session = await getSessionFromToken(readSessionCookie(req))

    if (!session) {
      return res.status(401).json({ success: false, message: 'You are not signed in.' })
    }

    return res.json({ success: true, user: publicUser(session) })
  } catch (error) {
    next(error)
  }
}

export async function logout(req, res, next) {
  try {
    await revokeUserSession(readSessionCookie(req))
    clearSessionCookie(res)
    return res.json({ success: true, message: 'Signed out successfully.' })
  } catch (error) {
    next(error)
  }
}

