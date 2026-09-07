DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'inquiry_status') THEN
        CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'in_progress', 'closed', 'spam');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    agent_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    subject VARCHAR(180),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 5),
    status inquiry_status NOT NULL DEFAULT 'new',
    customer_phone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS inquiries_customer_id_idx ON inquiries(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_agent_id_idx ON inquiries(agent_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_property_id_idx ON inquiries(property_id, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);

CREATE OR REPLACE FUNCTION validate_inquiry_parties()
RETURNS TRIGGER AS $$
DECLARE
    owner_id UUID;
BEGIN
    SELECT agent_id INTO owner_id FROM properties WHERE id = NEW.property_id;
    IF owner_id IS NULL THEN
        RAISE EXCEPTION 'property_id does not reference an existing property';
    END IF;
    IF owner_id <> NEW.agent_id THEN
        RAISE EXCEPTION 'inquiry agent_id must match the property agent_id';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.customer_id AND role = 'user') THEN
        RAISE EXCEPTION 'inquiry customer_id must reference a customer';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.agent_id AND role = 'agent') THEN
        RAISE EXCEPTION 'inquiry agent_id must reference an agent';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS inquiries_party_validation_trigger ON inquiries;
CREATE TRIGGER inquiries_party_validation_trigger
BEFORE INSERT OR UPDATE OF property_id, customer_id, agent_id ON inquiries
FOR EACH ROW EXECUTE FUNCTION validate_inquiry_parties();

CREATE OR REPLACE FUNCTION set_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.status = 'closed' AND OLD.status IS DISTINCT FROM 'closed' THEN
        NEW.closed_at = COALESCE(NEW.closed_at, NOW());
    ELSIF NEW.status <> 'closed' THEN
        NEW.closed_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS inquiries_updated_at_trigger ON inquiries;
CREATE TRIGGER inquiries_updated_at_trigger
BEFORE UPDATE ON inquiries
FOR EACH ROW EXECUTE FUNCTION set_inquiries_updated_at();
