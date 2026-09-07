import pg from 'pg'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Database requests will fail until it is configured.')
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
})

export async function checkDatabaseConnection() {
  const client = await pool.connect()
  try {
    await client.query('SELECT 1')
  } finally {
    client.release()
  }
}
