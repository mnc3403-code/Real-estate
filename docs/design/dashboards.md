# Dashboard Design

## Account roles

The database keeps three roles:

- `user` — displayed as **Customer** in the UI.
- `agent` — property professional who manages listings and leads.
- `admin` — platform administrator.

The login screen lets the user choose the intended workspace, but the backend compares that choice with the role stored on the authenticated account. Selecting another role never grants access to that role.

## Customer dashboard

Planned/initial features:

- Property discovery and search
- Saved/favourite properties
- Inquiry tracking
- Appointment/viewing schedule
- Profile and preferences
- Future: mortgage/affordability tools, recommendations and notifications

The current property cards, inquiry rows and appointment data are frontend demo data. Authentication itself is connected to Supabase PostgreSQL.

## Agent dashboard

Planned/initial features:

- Listing management
- Draft and published property states
- Listing performance metrics
- Lead pipeline
- Client messages
- Viewing appointments
- Future: image upload, amenities, pricing, listing publication and CRM history

The current add-listing action creates a local draft in React state. Persistent property/lead APIs should be implemented after the property schema is finalized.

## Admin dashboard

Planned/initial features:

- User management
- Agent approval
- Property moderation
- Reports and analytics
- Platform settings
- Future: audit log, support queue and content/report handling

## Theme system

The public website uses the existing blue/orange visual language. Dashboards preserve the same cards, rounded corners, typography and spacing while using role-specific accents:

- Customer: blue `#2563eb`
- Agent: teal `#0f766e`
- Admin: purple `#7c3aed`

This creates role recognition without making the dashboards look like separate products.
