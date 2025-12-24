CREATE TABLE IF NOT EXISTS inscription_metadata (
  inscription_id TEXT PRIMARY KEY,
  metadata_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection_slug TEXT NOT NULL,
  inscription_id TEXT NOT NULL,
  sync_run_id INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  metadata_json TEXT,
  UNIQUE(collection_slug, inscription_id)
);

CREATE INDEX IF NOT EXISTS idx_collection_inscriptions_collection_slug_inscription_id
  ON collection_inscriptions (collection_slug, inscription_id);

CREATE INDEX IF NOT EXISTS idx_collection_inscriptions_collection_slug_sync_run_id
  ON collection_inscriptions (collection_slug, sync_run_id);
