# Authentication Design

## Current flow

1. Customer registers through `/signup`.
2. Password is hashed with Argon2id before storage.
3. User signs in through `/login` and chooses Customer, Agent or Admin.
4. Backend validates the password and verifies that the selected workspace matches the stored role.
5. Backend creates a random session token, stores only its SHA-256 hash in `auth_sessions`, and sends the raw token as an HttpOnly cookie.
6. `/api/auth/me` resolves the current session and returns safe user data.
7. `/api/auth/logout` revokes the current session and clears the cookie.

## Security decisions

- Passwords are never stored in plaintext.
- Session tokens are never stored in plaintext in the database.
- Authentication cookies are HttpOnly and SameSite=Lax; production adds Secure.
- Login and registration have rate limits.
- Role selection is not authorization. The backend checks the actual database role.
- Password reset/email verification are intentionally separate future features.
