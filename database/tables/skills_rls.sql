-- RLS Policies for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public Read Access"
ON skills FOR SELECT
TO public
USING (true);

-- Allow write access only to authenticated users with 'admin' role (optional, or just authenticated)
-- For now, explicit deny for anon, allow for authenticated if needed, 
-- or stick to your request: "rest false" (meaning only SELECT is true)

-- Implicitly, if no other policy exists, everything else is denied.
-- But to be explicit as requested:

-- We don't need explicit 'false' policies in Postgres RLS usually, 
-- simply NOT defining them denies access.
-- However, if you want to be extra sure or descriptive:
