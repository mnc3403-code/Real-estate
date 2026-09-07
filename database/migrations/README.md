# Database migrations

Run these files in Supabase SQL Editor in numeric order, once per environment:

1. `001_create_users.sql` — users and roles
2. `002_create_auth_sessions.sql` — server sessions
3. `003_create_properties.sql` — listings and moderation states
4. `004_create_property_images.sql` — listing media
5. `005_create_saved_properties.sql` — customer favourites
6. `006_create_inquiries.sql` — customer/agent leads
7. `007_create_appointments.sql` — property viewings and scheduling constraints
8. `008_create_notifications.sql` — user notifications
9. `009_create_admin_reports.sql` — moderation reports
10. `010_create_property_views.sql` — listing analytics
11. `011_create_property_favorites_and_searches.sql` — saved searches
12. `012_create_message_threads.sql` — messaging foundation
13. `013_create_audit_log.sql` — administrative audit trail
14. `014_seed_demo_data.sql` — development/demo users, listings and activity

The seed migration is intended for development/demo environments. All demo accounts use `Demo1234!`.

The application does not use seed data as frontend constants. The frontend reads application data through the Express API, which queries PostgreSQL.
