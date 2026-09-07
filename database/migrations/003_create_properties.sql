DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_listing_type') THEN
        CREATE TYPE property_listing_type AS ENUM ('sale', 'rent');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_status') THEN
        CREATE TYPE property_status AS ENUM ('draft', 'pending', 'published', 'rejected', 'archived', 'sold', 'rented');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type') THEN
        CREATE TYPE property_type AS ENUM ('apartment', 'house', 'villa', 'office', 'commercial', 'land', 'studio', 'warehouse', 'other');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    title VARCHAR(180) NOT NULL CHECK (char_length(trim(title)) >= 5),
    description TEXT,
    property_type property_type NOT NULL,
    listing_type property_listing_type NOT NULL,
    status property_status NOT NULL DEFAULT 'draft',
    price NUMERIC(14,2) NOT NULL CHECK (price >= 0),
    currency CHAR(3) NOT NULL DEFAULT 'BDT' CHECK (currency ~ '^[A-Z]{3}$'),
    bedrooms SMALLINT CHECK (bedrooms IS NULL OR bedrooms >= 0),
    bathrooms NUMERIC(4,1) CHECK (bathrooms IS NULL OR bathrooms >= 0),
    area_sqft NUMERIC(12,2) CHECK (area_sqft IS NULL OR area_sqft > 0),
    year_built SMALLINT CHECK (year_built IS NULL OR year_built BETWEEN 1800 AND 2200),
    address_line VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state_region VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL DEFAULT 'Bangladesh',
    latitude NUMERIC(9,6) CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
    longitude NUMERIC(9,6) CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    rejection_reason TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived_at TIMESTAMPTZ,
    CONSTRAINT properties_agent_role_check CHECK (agent_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS properties_agent_id_idx ON properties(agent_id);
CREATE INDEX IF NOT EXISTS properties_status_idx ON properties(status);
CREATE INDEX IF NOT EXISTS properties_listing_type_idx ON properties(listing_type);
CREATE INDEX IF NOT EXISTS properties_type_idx ON properties(property_type);
CREATE INDEX IF NOT EXISTS properties_city_idx ON properties(city);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);
CREATE INDEX IF NOT EXISTS properties_published_idx ON properties(status, published_at DESC);

CREATE OR REPLACE FUNCTION set_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_updated_at_trigger ON properties;
CREATE TRIGGER properties_updated_at_trigger
BEFORE UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION set_properties_updated_at();

CREATE OR REPLACE FUNCTION validate_property_agent_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.agent_id AND role = 'agent') THEN
        RAISE EXCEPTION 'property agent_id must reference a user with role agent';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_agent_role_trigger ON properties;
CREATE TRIGGER properties_agent_role_trigger
BEFORE INSERT OR UPDATE OF agent_id ON properties
FOR EACH ROW EXECUTE FUNCTION validate_property_agent_role();

CREATE OR REPLACE FUNCTION set_property_publication_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status IS DISTINCT FROM 'published' THEN
        NEW.published_at = COALESCE(NEW.published_at, NOW());
    ELSIF NEW.status <> 'published' THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_publication_trigger ON properties;
CREATE TRIGGER properties_publication_trigger
BEFORE INSERT OR UPDATE OF status ON properties
FOR EACH ROW EXECUTE FUNCTION set_property_publication_timestamp();
