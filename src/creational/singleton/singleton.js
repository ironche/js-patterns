export function Singleton() {
  if (this.constructor.instance) {
    return this.constructor.instance;
  }
  this.constructor.instance = this;
  Object.freeze(this.constructor);
}

Singleton.getInstance = function () {
  return new Singleton();
};
