# CODEX

Be your own inscriptions marketplace

## Config

- `config/store.yml`: runtime config (theme, Electrs API URL, artist metadata)
- `config/policy.yml`: selling, pricing, `payment_address`, `optional_payments`

## Local

```bash
npm install
printf "SELLING_WALLET_PRIVATE_KEY=...\n" > .dev.vars
npx wrangler@latest d1 migrations apply codex --local
npm run dev
```

Optional (second terminal):

```bash
npm run dev:watch
```

Trigger a scheduled run in the browser (scheduled crons must be enabled via `npm run dev`):

- `http://localhost:8787/__scheduled`

## Production

```bash
npx wrangler@latest d1 create codex
npx wrangler@latest d1 migrations apply codex --remote
npx wrangler@latest secret put SELLING_WALLET_PRIVATE_KEY
npm run deploy
```

## Crons

Configured in `wrangler.toml` (orders every 5 min, sync every 10 min).
