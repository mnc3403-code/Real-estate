import { pool } from '../config/database.js'

export async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT id, first_name, last_name, email, password_hash, role, phone, is_verified, created_at
     FROM users
     WHERE LOWER(email) = LOWER($1)
     LIMIT 1`,
    [email],
  )

  return result.rows[0] ?? null
}

export async function createUser({ firstName, lastName, email, passwordHash, phone }) {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, phone)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, role, phone, is_verified, created_at`,
    [firstName, lastName, email, passwordHash, phone],
  )

  return result.rows[0]
}

export async function updateLastLogin(userId) {
  await pool.query(
    `UPDATE users SET last_login_at = NOW() WHERE id = $1`,
    [userId],
  )
}
