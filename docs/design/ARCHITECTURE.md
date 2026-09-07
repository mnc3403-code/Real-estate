# System Architecture

The project uses a two-tier application architecture with a clear frontend/backend boundary.

```text
Browser
  |
  v
React Frontend (frontend/)
  |
  | HTTP/JSON
  v
REST API (backend/)
  |
  v
Database
```

The frontend owns presentation, client-side state, routing, and user interaction. The backend owns authentication, authorization, validation, business rules, persistence, and API contracts.
