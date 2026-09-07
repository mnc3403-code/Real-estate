CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    filters JSONB NOT NULL DEFAULT '{}'::jsonb,
    alert_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS saved_searches_user_idx ON saved_searches(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS saved_searches_filters_gin_idx ON saved_searches USING GIN(filters);

CREATE OR REPLACE FUNCTION set_saved_searches_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS saved_searches_updated_at_trigger ON saved_searches;
CREATE TRIGGER saved_searches_updated_at_trigger
BEFORE UPDATE ON saved_searches
FOR EACH ROW EXECUTE FUNCTION set_saved_searches_updated_at();

CREATE OR REPLACE FUNCTION validate_saved_search_customer()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.user_id AND role = 'user') THEN
        RAISE EXCEPTION 'saved_searches user_id must reference a customer';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS saved_searches_customer_role_trigger ON saved_searches;
CREATE TRIGGER saved_searches_customer_role_trigger
BEFORE INSERT OR UPDATE OF user_id ON saved_searches
FOR EACH ROW EXECUTE FUNCTION validate_saved_search_customer();
