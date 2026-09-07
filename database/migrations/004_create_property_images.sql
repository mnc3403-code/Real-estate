CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    alt_text VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS property_images_property_id_idx ON property_images(property_id, display_order);
CREATE UNIQUE INDEX IF NOT EXISTS property_images_one_primary_idx
    ON property_images(property_id) WHERE is_primary = TRUE;
