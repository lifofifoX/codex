DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  collection_slug TEXT NOT NULL,
  inscription_id TEXT NOT NULL,
  status TEXT NOT NULL,
  txid TEXT NOT NULL,
  signed_tx TEXT NOT NULL,
  extra_details TEXT NOT NULL,
  buyer_address TEXT NOT NULL,
  price_sats INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_orders_inscription_id ON orders(inscription_id);
CREATE INDEX idx_orders_collection_slug ON orders(collection_slug);
CREATE INDEX idx_orders_status_collection_created_at ON orders(status, collection_slug, created_at);
CREATE INDEX idx_orders_status_id ON orders(status, id);
CREATE INDEX idx_orders_inscription_status_created_at ON orders(inscription_id, status, created_at DESC);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
