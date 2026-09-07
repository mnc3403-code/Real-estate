import { getSessionFromToken } from '../services/session.service.js'
import { readSessionCookie } from '../utils/sessionCookie.js'

export async function requireAuth(req, res, next) {
  try {
    const session = await getSessionFromToken(readSessionCookie(req))

    if (!session) {
      return res.status(401).json({ success: false, message: 'Authentication required.' })
    }

    req.user = session
    next()
  } catch (error) {
    next(error)
  }
}
