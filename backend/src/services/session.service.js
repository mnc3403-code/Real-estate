import crypto from 'node:crypto'
import { createSession, findSessionByTokenHash, revokeSession } from '../models/session.model.js'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export async function createUserSession(userId) {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)
  await createSession({ userId, tokenHash: hashToken(token), expiresAt })
  return { token, expiresAt }
}

export async function getSessionFromToken(token) {
  if (!token) return null
  return findSessionByTokenHash(hashToken(token))
}

export async function revokeUserSession(token) {
  if (!token) return
  await revokeSession(hashToken(token))
}
