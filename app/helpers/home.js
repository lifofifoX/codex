import { renderPage } from '../themes/theme.js'
import { assets } from '../../generated/assets.js'

export function renderHome({ config, collections }) {
  return renderPage({
    viewName: 'home.html',
    vars: {
      title: config.artist_name ? config.artist_name : 'Home',
      assets,
      config,
      artist: {
        name: config.artist_name ?? '',
        avatarUrl: config.artist_avatar_url ?? '',
        about: config.artist_about ?? '',
        socials: {
          websiteUrl: config.social_website_url ?? '',
          xUrl: config.social_x_url ?? '',
          githubUrl: config.social_github_url ?? ''
        }
      },
      collections
    }
  })
}

