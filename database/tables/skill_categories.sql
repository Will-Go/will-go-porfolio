CREATE TABLE IF NOT EXISTS skill_categories (
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (skill_id, category_id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- RLS Policies
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON skill_categories
    FOR SELECT USING (true);

CREATE POLICY "Restrict write access" ON skill_categories
    FOR ALL USING (false);
