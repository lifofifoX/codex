# Security Hardening

Protect your Covenant marketplace from bots, DDoS, and reserve flooding.

## Quick Setup

```bash
export CLOUDFLARE_API_TOKEN="your-api-token"
export CLOUDFLARE_ZONE_ID="your-zone-id"
node scripts/waf/marketplace.js
```

### Getting Credentials

**Zone ID:**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your domain
3. Scroll down the right sidebar on Overview page
4. Copy "Zone ID"

**API Token:**
1. Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token" → "Custom token"
3. Set permissions:
   - Zone → Firewall Services → Edit
   - Zone → Zone Settings → Edit
4. Zone Resources: Include → Specific zone → your domain
5. Create and copy token (shown only once)

This creates:
- 4 WAF rules (block data centers, high threat scores, challenge bots)
- 1 per-IP rate limit (30 req/10s site-wide)
- Security settings (level: high, browser check: on, bot fight mode)

## What Gets Blocked

| Traffic | Action |
|---------|--------|
| Data center IPs (AWS/GCP/Azure/etc) | Block |
| Threat score > 30 | Block |
| Detected bots | Challenge |
| Threat score > 10 on POST | Challenge |

## Rate Limits (Per-IP)

All limits are per-IP, not global. A 10k mint can sell out in seconds with enough buyers.

| Scope | Limit | Block Duration |
|-------|-------|----------------|
| Site-wide | 30/10s | 30s |

## Turnstile (CAPTCHA)

Turnstile is already integrated for launchpad reserve. Configure it:

```bash
# Local development
echo "TURNSTILE_CREDENTIALS=<site_key>:<secret_key>" >> .dev.vars

# Production
wrangler secret put TURNSTILE_CREDENTIALS
# Enter: <site_key>:<secret_key>
```

Get credentials at [dash.cloudflare.com/turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)

## API Server Protection

Your ordinals/mempool APIs are accessed by user browsers, so they must be public. Protect with WAF + rate limiting:

1. **Proxy through Cloudflare** (orange cloud in DNS)

2. **Run the API setup script:**
   ```bash
   export CLOUDFLARE_API_TOKEN="your-token"
   export CLOUDFLARE_ZONE_ID="your-api-zone-id"  # Zone for API domain
   node scripts/waf/api-servers.js
   ```

This creates:
- 4 WAF rules (block data centers, bots, high threat scores)
- 1 per-IP rate limit (30 req/10s site-wide)
- Security settings (level: high, browser check: on)

## During Launches

For high-demand mints, temporarily enable "I'm Under Attack" mode:

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/security_level" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"under_attack"}'
```

Revert after:
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/security_level" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"high"}'
```

## Built-in Protections

Covenant already includes:

| Protection | Location |
|------------|----------|
| Per-IP rate limit (launchpad) | `LAUNCHPAD_IP_LIMITER` in wrangler.toml |
| Per-address rate limit | `LAUNCHPAD_ADDRESS_LIMITER` in wrangler.toml |
| 30s reservation TTL | `RESERVATION_TIMEOUT_MS` in worker.js |
| Single reservation per buyer | ReservationStore |
| Double-sell prevention | D1 unique index |
| Mempool tx validation | SigningAgentWorker |

Adjust app-level limits in `wrangler.toml`:
```toml
[[ratelimits]]
name = "LAUNCHPAD_ADDRESS_LIMITER"
simple = { limit = 6, period = 10 }

[[ratelimits]]
name = "LAUNCHPAD_IP_LIMITER"
simple = { limit = 20, period = 10 }
```

## Monitoring

Watch for attacks at **Security → Events** in Cloudflare dashboard.

Warning signs:
- Block rate spikes
- Challenge solve rate < 50%
- Reserve/mint ratio < 10%
