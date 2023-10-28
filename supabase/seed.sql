-- Create the "pipeline" table
CREATE TABLE IF NOT EXISTS pipeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    prompt TEXT NOT NULL, 
    endpoint TEXT NOT NULL
);

-- alter table pipeline
--   enable row level security;