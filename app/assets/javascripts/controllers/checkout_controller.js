import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['feeRate', 'fee', 'total']
  static values = { price: Number, vbytes: Number }

  connect() {
    this.recalc()
  }

  recalc() {
    const feeRate = Number(this.feeRateTarget.value)
    const fee = Math.round(feeRate * this.vbytesValue)
    const total = this.priceValue + fee

    this.feeTarget.textContent = fee.toLocaleString('en-US')
    this.totalTarget.textContent = total.toLocaleString('en-US')
  }
}
