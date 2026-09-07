# Real Estate System

A professional real-estate web application built with React, Express and Supabase PostgreSQL.

## Current milestone

- Public real-estate landing page
- Customer signup with client/server validation
- Argon2id password hashing
- Supabase PostgreSQL user storage
- Role-aware login for Customer, Agent and Admin
- HttpOnly server-side authentication sessions
- Customer dashboard foundation
- Agent dashboard foundation
- Admin dashboard foundation
- Role-specific dashboard themes
- Responsive dashboard layouts

## Run locally

### 1. Database

Run these SQL migrations in Supabase SQL Editor, in order:

```text
1. database/migrations/001_create_users.sql
2. database/migrations/002_create_auth_sessions.sql
```

### 2. Backend

Create `backend/.env` from `backend/.env.example` and add your Supabase database connection string.

```powershell
cd backend
npm install
npm run dev
```

### 3. Frontend

Create `frontend/.env` from `frontend/.env.example` if needed.

From the project root:

```powershell
npm install --prefix frontend
npm run dev
```

The root command `npm run dev` starts the frontend.

## Routes

- `/` — public website
- `/signup` — customer registration
- `/login` — role-aware sign in
- `/dashboard` — role-specific workspace
- `/forgot-password` — password-reset UI foundation

## Dashboard roadmap

The current dashboard data is intentionally frontend demo state. The next backend milestone is to create persistent property, favourite, inquiry, appointment, lead and notification schemas/APIs and replace the demo state with real data.
