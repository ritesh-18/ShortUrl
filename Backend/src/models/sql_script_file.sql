CREATE TABLE IF NOT EXISTS short_url.links (
    code TEXT PRIMARY KEY,
    target_url TEXT NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    last_clicked TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
-- CREATE INDEX IF NOT EXISTS idx_links_last_clicked ON links (last_clicked); // indexing purpose we can use this later
