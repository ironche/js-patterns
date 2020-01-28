export function Product(price) {
  let vat;

  this.setVatStrategy = function (v) {
    vat = v;
  };
  this.getPrice = function () {
    return +(price * vat.multiplier()).toFixed(2);
  };
}

export function VatStrategy(value) {
  this.multiplier = () => 1 + (value / 100);
}

export function NormalVat() {
  VatStrategy.call(this, 20);
}

NormalVat.prototype = Object.create(VatStrategy.prototype);
NormalVat.prototype.constructor = NormalVat;

export function ReducedVat() {
  VatStrategy.call(this, 10);
}

ReducedVat.prototype = Object.create(VatStrategy.prototype);
ReducedVat.prototype.constructor = ReducedVat;
