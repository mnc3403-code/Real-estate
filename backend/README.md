# Real Estate Backend

Express API for the real-estate application.

## Local setup

Create `backend/.env` from `.env.example` and set `DATABASE_URL` to the Supabase PostgreSQL connection string.

Run the database migrations in `database/migrations/` in order.

Then:

```bash
npm install
npm run dev
```

## Auth endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/health`

Authentication uses an HttpOnly server-side session cookie. The database stores a hash of the session token, not the raw token.
