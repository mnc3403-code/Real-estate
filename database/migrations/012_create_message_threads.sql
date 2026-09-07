CREATE TABLE IF NOT EXISTS message_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    agent_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS message_threads_property_participants_idx
    ON message_threads(property_id, customer_id, agent_id)
    WHERE property_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS message_threads_customer_idx ON message_threads(customer_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS message_threads_agent_idx ON message_threads(agent_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    body TEXT NOT NULL CHECK (char_length(trim(body)) >= 1),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS messages_thread_idx ON messages(thread_id, created_at);
CREATE INDEX IF NOT EXISTS messages_unread_idx ON messages(thread_id, created_at) WHERE is_read = FALSE;

CREATE OR REPLACE FUNCTION validate_message_sender()
RETURNS TRIGGER AS $$
DECLARE
    c_id UUID;
    a_id UUID;
BEGIN
    SELECT customer_id, agent_id INTO c_id, a_id FROM message_threads WHERE id = NEW.thread_id;
    IF c_id IS NULL THEN
        RAISE EXCEPTION 'thread_id does not reference an existing thread';
    END IF;
    IF NEW.sender_id <> c_id AND NEW.sender_id <> a_id THEN
        RAISE EXCEPTION 'message sender must be a participant in the thread';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS messages_sender_validation_trigger ON messages;
CREATE TRIGGER messages_sender_validation_trigger
BEFORE INSERT OR UPDATE OF thread_id, sender_id ON messages
FOR EACH ROW EXECUTE FUNCTION validate_message_sender();

CREATE OR REPLACE FUNCTION set_messages_read_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_read = TRUE AND OLD.is_read = FALSE THEN
        NEW.read_at = COALESCE(NEW.read_at, NOW());
    ELSIF NEW.is_read = FALSE THEN
        NEW.read_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS messages_read_at_trigger ON messages;
CREATE TRIGGER messages_read_at_trigger
BEFORE UPDATE OF is_read ON messages
FOR EACH ROW EXECUTE FUNCTION set_messages_read_at();

CREATE OR REPLACE FUNCTION set_message_thread_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE message_threads SET updated_at = NOW() WHERE id = NEW.thread_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS messages_thread_updated_at_trigger ON messages;
CREATE TRIGGER messages_thread_updated_at_trigger
AFTER INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION set_message_thread_updated_at();
