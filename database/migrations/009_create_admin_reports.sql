DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_status') THEN
        CREATE TYPE report_status AS ENUM ('open', 'reviewing', 'resolved', 'dismissed');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'report_reason') THEN
        CREATE TYPE report_reason AS ENUM ('spam', 'fraud', 'incorrect_information', 'inappropriate_content', 'duplicate_listing', 'other');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS admin_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    reason report_reason NOT NULL,
    description TEXT NOT NULL CHECK (char_length(trim(description)) >= 5),
    status report_status NOT NULL DEFAULT 'open',
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolution_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    CONSTRAINT admin_reports_target_check CHECK (property_id IS NOT NULL OR reported_user_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS admin_reports_status_idx ON admin_reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS admin_reports_property_idx ON admin_reports(property_id);
CREATE INDEX IF NOT EXISTS admin_reports_reported_user_idx ON admin_reports(reported_user_id);
CREATE INDEX IF NOT EXISTS admin_reports_reporter_idx ON admin_reports(reporter_id);

CREATE OR REPLACE FUNCTION validate_report_reviewer()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reviewed_by IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM users WHERE id = NEW.reviewed_by AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'reviewed_by must reference an admin';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admin_reports_reviewer_trigger ON admin_reports;
CREATE TRIGGER admin_reports_reviewer_trigger
BEFORE INSERT OR UPDATE OF reviewed_by ON admin_reports
FOR EACH ROW EXECUTE FUNCTION validate_report_reviewer();

CREATE OR REPLACE FUNCTION set_admin_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.status IN ('resolved', 'dismissed') AND OLD.status NOT IN ('resolved', 'dismissed') THEN
        NEW.resolved_at = COALESCE(NEW.resolved_at, NOW());
    ELSIF NEW.status IN ('open', 'reviewing') THEN
        NEW.resolved_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admin_reports_updated_at_trigger ON admin_reports;
CREATE TRIGGER admin_reports_updated_at_trigger
BEFORE UPDATE ON admin_reports
FOR EACH ROW EXECUTE FUNCTION set_admin_reports_updated_at();

CREATE OR REPLACE FUNCTION validate_reporter_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reporter_id IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM users WHERE id = NEW.reporter_id AND role IN ('user', 'agent', 'admin')
    ) THEN
        RAISE EXCEPTION 'reporter_id must reference an existing user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admin_reports_reporter_trigger ON admin_reports;
CREATE TRIGGER admin_reports_reporter_trigger
BEFORE INSERT OR UPDATE OF reporter_id ON admin_reports
FOR EACH ROW EXECUTE FUNCTION validate_reporter_role();
