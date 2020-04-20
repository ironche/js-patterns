export function Visitor() {
}

Visitor.prototype.visit = function(element) {
  element.setData((element.getData() || 0) + 10);
};

export function Element() {
  let data;

  this.getData = function() {
    return data;
  };
  this.setData = function(d) {
    data = d;
  };
}

Element.prototype.accept = function(visitor) {
  visitor.visit(this);
};
