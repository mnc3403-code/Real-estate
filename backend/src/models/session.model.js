import { pool } from '../config/database.js'

export async function createSession({ userId, tokenHash, expiresAt }) {
  const result = await pool.query(
    `INSERT INTO auth_sessions (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)
     RETURNING id, user_id, expires_at, created_at`,
    [userId, tokenHash, expiresAt],
  )
  return result.rows[0]
}

export async function findSessionByTokenHash(tokenHash) {
  const result = await pool.query(
    `SELECT s.id, s.user_id, s.expires_at,
            u.first_name, u.last_name, u.email, u.role, u.phone, u.is_verified
     FROM auth_sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1
       AND s.revoked_at IS NULL
       AND s.expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  )
  return result.rows[0] ?? null
}

export async function revokeSession(tokenHash) {
  await pool.query(
    `UPDATE auth_sessions
     SET revoked_at = NOW()
     WHERE token_hash = $1
       AND revoked_at IS NULL`,
    [tokenHash],
  )
}
