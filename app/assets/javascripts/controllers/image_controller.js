import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['media', 'img', 'skeleton']

  connect() {
    if (this.hasImgTarget && this.imgTarget.complete) this.loaded()
  }

  loaded() {
    const el = this.hasMediaTarget ? this.mediaTarget : this.imgTarget
    if (!el) return
    el.classList.remove('opacity-0')
    el.classList.add('opacity-100')
    this.skeletonTarget.classList.add('hidden')
  }

  error() {
    this.skeletonTarget.classList.remove('animate-pulse')
  }
}
