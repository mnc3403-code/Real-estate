CREATE TABLE IF NOT EXISTS saved_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT saved_properties_unique_user_property UNIQUE(user_id, property_id)
);

CREATE INDEX IF NOT EXISTS saved_properties_user_id_idx ON saved_properties(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS saved_properties_property_id_idx ON saved_properties(property_id);

CREATE OR REPLACE FUNCTION validate_saved_property_customer()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.user_id AND role = 'user') THEN
        RAISE EXCEPTION 'saved_properties user_id must reference a customer (role user)';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS saved_properties_customer_role_trigger ON saved_properties;
CREATE TRIGGER saved_properties_customer_role_trigger
BEFORE INSERT OR UPDATE OF user_id ON saved_properties
FOR EACH ROW EXECUTE FUNCTION validate_saved_property_customer();
