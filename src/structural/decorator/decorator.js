export function Shape(name) {
  this.name = name;

  this.description = function() {
    return this.name;
  };
}

export function ColorDecorator(color, shape = { name: '' }) {
  Shape.call(this, shape.name);
  this.shape = shape;
  this.color = color;

  this.description = function() {
    return `${this.color} ${this.shape.description()}`;
  };
}

ColorDecorator.prototype = Object.create(Shape.prototype);
ColorDecorator.prototype.constructor = ColorDecorator;

export function TransformDecorator(transform, shape = { name: '' }) {
  Shape.call(this, shape.name);
  this.shape = shape;
  this.transform = transform;

  this.description = function() {
    return `${this.transform} ${this.shape.description()}`;
  };
}

TransformDecorator.prototype = Object.create(Shape.prototype);
TransformDecorator.prototype.constructor = TransformDecorator;
