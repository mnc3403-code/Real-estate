# API contract

Base URL: `http://localhost:5000/api` in development.

## Authentication
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

Authentication uses an HttpOnly session cookie. The browser sends it automatically with `credentials: include`.

## Properties
- `GET /properties` — published listing search; supports `search`, `city`, `type`, `listingType`, `minPrice`, `maxPrice`, `status`, `agentId`, `limit`, `offset`.
- `GET /properties/:id`
- `POST /properties/:id/view`
- `POST /properties` — agent only; creates a pending listing.
- `PATCH /properties/:id` — owning agent only; resubmits changed listing for review.
- `PATCH /properties/:id/moderate` — admin only.
- `GET /properties/:propertyId/images`
- `POST /properties/:propertyId/images` — owning agent.
- `DELETE /properties/:propertyId/images/:imageId` — owning agent.

## Customer
- `GET /dashboard/overview`
- `GET /saved-properties`
- `POST /saved-properties/:propertyId`
- `DELETE /saved-properties/:propertyId`
- `GET /inquiries`
- `POST /inquiries`
- `PATCH /inquiries/:id`
- `GET /appointments`
- `POST /appointments`
- `PATCH /appointments/:id`
- `GET /notifications`
- `PATCH /notifications/:id/read`

## Agent
The same dashboard endpoint is role-aware. Agents additionally use:
- `GET /inquiries`
- `PATCH /inquiries/:id`
- `GET /appointments`
- `PATCH /appointments/:id`
- property CRUD endpoints above.

## Admin
- `GET /admin/users`
- `PATCH /admin/users/:id`
- `GET /admin/properties`
- `GET /admin/reports`
- `PATCH /admin/reports/:id`

Every protected operation checks the authenticated session and server-side role. Frontend role selection never grants privileges.
