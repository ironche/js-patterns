export function Subject() {
  this.observers = [];
}

Subject.prototype.next = function(value) {
  this.value = value;
  this.notify();
};

Subject.prototype.getObserverIndex = function(observer) {
  return this.observers.findIndex((o) => o === observer);
};

Subject.prototype.subscribe = function(observer) {
  if (typeof observer === 'function') {
    const index = this.getObserverIndex(observer);
    if (index === -1) {
      this.observers.push(observer);
    }
  }
  return observer;
};

Subject.prototype.unsubscribe = function(observer) {
  if (typeof observer === 'function') {
    const index = this.getObserverIndex(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
};

Subject.prototype.unsubscribeAll = function() {
  this.observers.length = 0;
};

Subject.prototype.notify = function(observer) {
  if (typeof observer === 'function') {
    const index = this.getObserverIndex(observer);
    if (index !== -1) {
      this.observers[index](this.value);
    }
  } else {
    this.observers.forEach((o) => o(this.value));
  }
};

export function BehaviorSubject(value) {
  Subject.call(this);
  this.value = value;
}

BehaviorSubject.prototype = Object.create(Subject.prototype);
BehaviorSubject.prototype.constructor = BehaviorSubject;

BehaviorSubject.prototype.subscribe = function(observer) {
  Subject.prototype.subscribe.call(this, observer);
  if (typeof this.value !== 'undefined') {
    this.notify(observer);
  }
  return observer;
};

export function combineLatest(...subjects) {
  const sub = new BehaviorSubject(Array(subjects.length));
  subjects.forEach((s, i) => {
    s.subscribe((v) => {
      sub.value[i] = v;
      sub.notify();
    });
  });
  return sub;
}
