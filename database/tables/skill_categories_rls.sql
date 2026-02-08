-- RLS Policies for skill_categories
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public Read Access"
ON skill_categories FOR SELECT
TO public
USING (true);
