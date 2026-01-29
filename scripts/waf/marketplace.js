#!/usr/bin/env node

/**
 * Setup Cloudflare WAF rules for Covenant marketplace
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ZONE_ID=xxx node scripts/waf/marketplace.js
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
  setupBotFightMode,
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
    expression: '(cf.threat_score gt 30)',
    action: 'block'
  },
  {
    description: 'Challenge detected bots',
    expression: '(cf.client.bot eq true)',
    action: 'managed_challenge'
  },
  {
    description: 'Challenge medium threat on POST',
    expression: '(http.request.method eq "POST") and (cf.threat_score gt 10)',
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
  console.log('Covenant Marketplace WAF Setup\n')

  try {
    await setupSecuritySettings({ securityLevel: 'high', challengeTTL: 1800 })
    await setupBotFightMode()
    await setupWAFRules(WAF_RULES, 'Covenant WAF Rules')
    await setupRateLimits(RATE_LIMITS, 'Covenant Rate Limits')
    printDashboardUrl()
  } catch (error) {
    console.error('\nSetup failed:', error.message)
    process.exit(1)
  }
}

main()
