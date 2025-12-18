import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['img', 'skeleton']

  connect() {
    if (this.imgTarget?.complete) this.loaded()
  }

  loaded() {
    this.imgTarget.classList.remove('opacity-0')
    this.imgTarget.classList.add('opacity-100')
    this.skeletonTarget.classList.add('hidden')
  }

  error() {
    this.skeletonTarget.classList.remove('animate-pulse')
  }
}
