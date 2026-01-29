/**
 * Shared utilities for Cloudflare WAF setup scripts
 */

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID

if (!API_TOKEN || !ZONE_ID) {
  console.error('Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID')
  process.exit(1)
}

const BASE_URL = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}`

const DATA_CENTER_ASNS = [
  16509, 14618,  // AWS
  15169, 396982, // Google
  8075,          // Azure
  14061,         // DigitalOcean
  13335,         // Cloudflare
  20473,         // Vultr
  63949,         // Linode
  24940,         // Hetzner
  16276,         // OVH
  12876,         // Online.net
  37963,         // Alibaba
  45102          // Tencent
]

export const ASN_EXPR = `ip.src.asnum in {${DATA_CENTER_ASNS.join(' ')}}`

async function api(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  const data = await response.json()

  if (!data.success) {
    console.error('API Error:', JSON.stringify(data.errors, null, 2))
    throw new Error(data.errors?.[0]?.message || 'API request failed')
  }

  return data
}

async function getOrCreateRuleset(phase, name) {
  const { result } = await api('/rulesets')
  let ruleset = result.find(r => r.phase === phase)

  if (!ruleset) {
    const { result: created } = await api('/rulesets', {
      method: 'POST',
      body: JSON.stringify({
        name,
        kind: 'zone',
        phase,
        rules: []
      })
    })
    ruleset = created
  }

  return ruleset
}

export async function setupWAFRules(rules, name = 'WAF Rules') {
  console.log('Setting up WAF rules...')

  const ruleset = await getOrCreateRuleset('http_request_firewall_custom', name)

  const formatted = rules.map(rule => ({
    action: rule.action,
    expression: rule.expression,
    description: rule.description,
    enabled: true
  }))

  await api(`/rulesets/${ruleset.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...ruleset, rules: formatted })
  })

  console.log(`  Created ${formatted.length} WAF rules`)
}

export async function setupRateLimits(rules, name = 'Rate Limits') {
  console.log('Setting up rate limits...')

  const ruleset = await getOrCreateRuleset('http_ratelimit', name)

  const formatted = rules.map(rule => ({
    action: rule.action || 'block',
    expression: rule.expression,
    description: rule.description,
    enabled: true,
    ratelimit: {
      characteristics: ['ip.src'],
      requests_per_period: rule.requests_per_period,
      period: rule.period,
      mitigation_timeout: rule.mitigation_timeout
    }
  }))

  await api(`/rulesets/${ruleset.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...ruleset, rules: formatted })
  })

  console.log(`  Created ${formatted.length} rate limit rules`)
}

export async function setupSecuritySettings({ securityLevel = 'high', challengeTTL = 1800 } = {}) {
  console.log('Configuring security settings...')

  await api('/settings/security_level', {
    method: 'PATCH',
    body: JSON.stringify({ value: securityLevel })
  })
  console.log(`  Security level: ${securityLevel}`)

  await api('/settings/browser_check', {
    method: 'PATCH',
    body: JSON.stringify({ value: 'on' })
  })
  console.log('  Browser integrity check: on')

  if (challengeTTL) {
    await api('/settings/challenge_ttl', {
      method: 'PATCH',
      body: JSON.stringify({ value: challengeTTL })
    })
    console.log(`  Challenge TTL: ${challengeTTL / 60} minutes`)
  }
}

export async function setupBotFightMode() {
  console.log('Enabling Bot Fight Mode...')

  try {
    await api('/bot_management', {
      method: 'PUT',
      body: JSON.stringify({ fight_mode: true })
    })
    console.log('  Bot Fight Mode: enabled')
  } catch {
    console.log('  Bot Fight Mode: skipped (may require Pro plan)')
  }
}

export function printDashboardUrl() {
  console.log('\nDone! Review rules at:')
  console.log(`https://dash.cloudflare.com/?to=/:account/${ZONE_ID}/security/waf`)
}
