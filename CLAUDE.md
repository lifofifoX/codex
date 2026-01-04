# CLAUDE.md

This file provides guidance for AI assistants working on this codebase.

## Project Overview

Covenant is a self-hosted Bitcoin inscriptions marketplace built on Cloudflare Workers. It allows artists to sell their ordinal inscriptions directly without intermediaries.

**Tech Stack:**
- Runtime: Cloudflare Workers with Durable Objects
- Database: Cloudflare D1 (SQLite)
- HTTP Framework: Hono
- Frontend: Stimulus + Turbo (Hotwire), Tailwind CSS
- Bitcoin: @scure/btc-signer for PSBT signing
- Templating: EJS (compiled to JS functions)

## Directory Structure

```
app/
├── assets/                 # Frontend assets (JS, CSS)
│   ├── javascripts/        # Stimulus controllers, Turbo
│   └── stylesheets/        # Tailwind CSS per theme
├── config.js               # YAML config loader with validation
├── controllers/            # HTTP request handlers
├── crons/                  # Scheduled jobs (orders, sync)
├── helpers/                # Template rendering helpers
├── models/                 # Business logic
│   └── db/                 # D1 database layer
├── themes/                 # EJS templates (default, ms-paint)
├── utils/                  # Shared utilities
└── workers/
    ├── app/                # Main HTTP worker
    └── signing_agent/      # Durable Object for signing
config/
├── store.yml               # Runtime config (APIs, theme, metadata)
└── policy.yml              # Collections, prices, payment addresses
generated/                  # Build output (do not edit)
migrations/                 # D1 SQL migrations
public/                     # Compiled static assets
scripts/                    # Build scripts
```

## Key Commands

```bash
# Development
npm install
npm run dev:signing-agent   # Terminal 1: Signing agent
npm run dev                 # Terminal 2: Main worker (port 8787)
npm run dev:watch           # Terminal 3: Asset watcher (optional)

# Build
npm run build               # Full build (templates, JS, CSS, manifest)
npm run build:templates     # Compile EJS to generated/themes.js
npm run build:css           # Compile Tailwind CSS

# Database
npx wrangler d1 migrations apply covenant --local   # Local
npx wrangler d1 migrations apply covenant --remote  # Production

# Deploy
npm run deploy:signing-agent
npm run deploy
```

## Architecture

### Two Workers

1. **Main Worker** (`app/workers/app/index.js`): Handles HTTP requests, serves pages, routes sell requests to signing agent
2. **Signing Agent** (`app/workers/signing_agent/worker.js`): Durable Object that holds the private key and signs/broadcasts transactions

### HTTP Routes

| Route | Handler | Purpose |
|-------|---------|---------|
| `GET /` | `home_controller.js` | Collections overview |
| `GET /policy` | `policy_controller.js` | Policy page with wallet address |
| `GET /activity` | `activity_controller.js` | Transaction history |
| `POST /sell/:slug` | `sell_controller.js` | Execute sale (routes to DO) |
| `GET /:collection` | `collection_controller.js` | Collection page |
| `GET /:collection/:id` | `inscription_controller.js` | Inscription detail |

### Scheduled Jobs

- **Every 5 min**: `orders_cron.js` - Checks pending orders, broadcasts txs
- **Every 10 min**: `sync_collections_cron.js` - Syncs owned inscriptions from Ordinals API

## Database Schema

**orders**: Tracks sale transactions
- `id`, `collection_slug`, `inscription_id`, `status` (pending|confirmed|failed)
- `txid`, `signed_tx`, `buyer_address`, `price_sats`
- Unique constraint: one active order per inscription

**inscription_metadata**: Cached inscription data from Ordinals API

**collection_inscriptions**: Tracks which inscriptions are in each collection

## Configuration

**config/store.yml** - Runtime settings:
- `ord_api_url`: Ordinals API endpoint
- `electrs_api_url`: Electrs API for UTXOs
- `mempool_space_api_url`: Mempool.space API
- `theme`: UI theme name
- `page_size`: Items per page
- Artist metadata (name, avatar, social links)

**config/policy.yml** - Selling policy:
- Collection definitions with `slug`, `title`, `price_sats`
- `payment_address`: Where payments go
- `inscription_ids` or `parent_inscription_id` or `gallery_inscription_id`
- `optional_payments`: Additional donation options

## Key Models

**Inscription** (`app/models/inscription.js`): Wraps ordinals metadata with computed properties (title, contentUrl, charms, etc.)

**Collection** (`app/models/collection.js`): Manages collection data, pagination, availability lookups

**StoreWallet** (`app/models/store_wallet.js`): Taproot wallet for signing PSBTs

## Order Flow

1. User browses collection, selects inscription
2. User signs PSBT with their wallet (Unisat/Xverse)
3. Frontend POSTs signed PSBT to `/sell/:slug`
4. Main worker routes to Signing Agent Durable Object
5. DO validates: ownership, payment amount, addresses
6. DO signs transaction with seller's private key
7. DO broadcasts to mempool
8. Order created with `pending` status
9. Cron monitors confirmation, updates to `confirmed`

## Security Notes

- Private key only exists in Signing Agent DO (never in main worker)
- All transactions validated before signing
- Mempool acceptance test prevents invalid txs
- D1 unique constraint prevents double-selling
- No user authentication (security via validation)

## Development Tips

- Local D1 database lives in `.wrangler/state/`
- Signing agent needs `SELLING_WALLET_PRIVATE_KEY` in `.dev.vars.signing-agent`
- Test scheduled jobs via `http://localhost:8787/__scheduled`
- Templates compile to functions in `generated/themes.js`
- Asset hashes in `generated/assets.js` for cache busting

## Common Tasks

**Add a new collection**: Edit `config/policy.yml`, add entry to `selling` array

**Change theme**: Edit `config/store.yml`, set `theme` to `default` or `ms-paint`

**Add new route**: Create controller in `app/controllers/`, add route in `app/workers/app/index.js`

**Modify database**: Add migration in `migrations/`, run `npx wrangler d1 migrations apply`
