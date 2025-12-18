import { parse } from 'yaml'
import storeYaml from '../../config/store.yml'

export function loadConfig(env) {
  const raw = parse(storeYaml)

  return {
    ordApiBaseUrl: env?.ORD_API_BASE_URL ?? raw.ord_api_base_url,
    theme: env?.THEME ?? raw.theme,
    pageSize: env?.PAGE_SIZE ?? raw.page_size,
    storeAddress: env?.STORE_ADDRESS ?? raw.store_address,
    priceSats: env?.PRICE_SATS ?? raw.price_sats,
    estimatedVbytes: env?.ESTIMATED_VBYTES ?? raw.estimated_vbytes,
    feeRateSatVbDefault: env?.FEE_RATE_SAT_VB_DEFAULT ?? raw.fee_rate_sat_vb_default,
    socialGithubUrl: env?.SOCIAL_GITHUB_URL ?? raw.social_github_url,
    socialXUrl: env?.SOCIAL_X_URL ?? raw.social_x_url,
    socialWebsiteUrl: env?.SOCIAL_WEBSITE_URL ?? raw.social_website_url,
    footerWizardsUrl: env?.FOOTER_WIZARDS_URL ?? raw.footer_wizards_url
  }
}
