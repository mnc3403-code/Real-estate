CREATE TABLE IF NOT EXISTS property_views (
    id BIGSERIAL PRIMARY KEY,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_key VARCHAR(128),
    ip_hash CHAR(64),
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT property_views_identity_check CHECK (viewer_id IS NOT NULL OR session_key IS NOT NULL OR ip_hash IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS property_views_property_time_idx ON property_views(property_id, viewed_at DESC);
CREATE INDEX IF NOT EXISTS property_views_viewer_time_idx ON property_views(viewer_id, viewed_at DESC) WHERE viewer_id IS NOT NULL;
