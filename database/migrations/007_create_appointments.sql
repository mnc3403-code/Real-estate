DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE appointment_status AS ENUM ('requested', 'confirmed', 'completed', 'cancelled', 'no_show');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    agent_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'requested',
    notes TEXT,
    meeting_location TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    CONSTRAINT appointments_time_order CHECK (scheduled_end > scheduled_start)
);

CREATE INDEX IF NOT EXISTS appointments_customer_id_idx ON appointments(customer_id, scheduled_start);
CREATE INDEX IF NOT EXISTS appointments_agent_id_idx ON appointments(agent_id, scheduled_start);
CREATE INDEX IF NOT EXISTS appointments_property_id_idx ON appointments(property_id, scheduled_start);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status, scheduled_start);

CREATE OR REPLACE FUNCTION validate_appointment_parties()
RETURNS TRIGGER AS $$
DECLARE
    owner_id UUID;
    inquiry_customer UUID;
    inquiry_agent UUID;
    inquiry_property UUID;
BEGIN
    SELECT agent_id INTO owner_id FROM properties WHERE id = NEW.property_id;
    IF owner_id IS NULL OR owner_id <> NEW.agent_id THEN
        RAISE EXCEPTION 'appointment agent_id must match the property agent_id';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.customer_id AND role = 'user') THEN
        RAISE EXCEPTION 'appointment customer_id must reference a customer';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.agent_id AND role = 'agent') THEN
        RAISE EXCEPTION 'appointment agent_id must reference an agent';
    END IF;
    IF NEW.inquiry_id IS NOT NULL THEN
        SELECT customer_id, agent_id, property_id
        INTO inquiry_customer, inquiry_agent, inquiry_property
        FROM inquiries WHERE id = NEW.inquiry_id;
        IF inquiry_customer IS NULL THEN
            RAISE EXCEPTION 'inquiry_id does not reference an existing inquiry';
        END IF;
        IF inquiry_customer <> NEW.customer_id OR inquiry_agent <> NEW.agent_id OR inquiry_property <> NEW.property_id THEN
            RAISE EXCEPTION 'appointment parties must match the linked inquiry';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appointments_party_validation_trigger ON appointments;
CREATE TRIGGER appointments_party_validation_trigger
BEFORE INSERT OR UPDATE OF property_id, customer_id, agent_id, inquiry_id ON appointments
FOR EACH ROW EXECUTE FUNCTION validate_appointment_parties();

CREATE OR REPLACE FUNCTION set_appointments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.status = 'cancelled' AND OLD.status IS DISTINCT FROM 'cancelled' THEN
        NEW.cancelled_at = COALESCE(NEW.cancelled_at, NOW());
    ELSIF NEW.status <> 'cancelled' THEN
        NEW.cancelled_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appointments_updated_at_trigger ON appointments;
CREATE TRIGGER appointments_updated_at_trigger
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION set_appointments_updated_at();

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE appointments
    DROP CONSTRAINT IF EXISTS appointments_agent_no_overlap;

ALTER TABLE appointments
    ADD CONSTRAINT appointments_agent_no_overlap
    EXCLUDE USING gist (
        agent_id WITH =,
        tstzrange(scheduled_start, scheduled_end, '[)') WITH &&
    ) WHERE (status IN ('requested', 'confirmed'));
