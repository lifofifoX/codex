#!/usr/bin/env node

/**
 * Setup Cloudflare WAF rules for public API servers (ordinals node, mempool/electrs)
 *
 * These APIs are accessed by user browsers, so they must remain public but protected.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ZONE_ID=xxx node scripts/waf/api-servers.js
 *
 * Required API token permissions:
 *   - Zone.Firewall Services (Edit)
 *   - Zone.Zone Settings (Edit)
 */

import {
  ASN_EXPR,
  setupWAFRules,
  setupRateLimits,
  setupSecuritySettings,
  printDashboardUrl
} from './lib.js'

const WAF_RULES = [
  {
    description: 'Block data center IPs',
    expression: `(${ASN_EXPR})`,
    action: 'block'
  },
  {
    description: 'Block high threat score',
    expression: '(cf.threat_score gt 20)',
    action: 'block'
  },
  {
    description: 'Block detected bots',
    expression: '(cf.client.bot eq true)',
    action: 'block'
  },
  {
    description: 'Challenge medium threat score',
    expression: '(cf.threat_score gt 10)',
    action: 'managed_challenge'
  }
]

const RATE_LIMITS = [
  {
    description: 'Site-wide per-IP limit',
    expression: '(true)',
    requests_per_period: 30,
    period: 10,
    mitigation_timeout: 30
  }
]

async function main() {
  console.log('API Server WAF Setup\n')

  try {
    await setupSecuritySettings({ securityLevel: 'high' })
    await setupWAFRules(WAF_RULES, 'API WAF Rules')
    await setupRateLimits(RATE_LIMITS, 'API Rate Limits')
    printDashboardUrl()
  } catch (error) {
    console.error('\nSetup failed:', error.message)
    process.exit(1)
  }
}

main()
