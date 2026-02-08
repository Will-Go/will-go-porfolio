-- RLS Policies for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public Read Access"
ON categories FOR SELECT
TO public
USING (true);
