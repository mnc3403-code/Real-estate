import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { login, logout, me, register } from '../controllers/auth.controller.js'

const router = Router()

const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many registration attempts. Please try again later.' },
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many sign-in attempts. Please try again later.' },
})

router.post('/register', registrationLimiter, register)
router.post('/login', loginLimiter, login)
router.get('/me', me)
router.post('/logout', logout)

export default router
