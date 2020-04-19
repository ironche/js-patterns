export function Subject() {
  this.observers = [];
}

Subject.prototype.getObserverIndex = function(observer) {
  return this.observers.findIndex((o) => o === observer);
};

Subject.prototype.subscribe = function(observer) {
  const index = this.getObserverIndex(observer);
  if (index === -1) {
    this.observers.push(observer);
  }
  return observer;
};

Subject.prototype.unsubscribe = function(observer) {
  const index = this.getObserverIndex(observer);
  if (index !== -1) {
    this.observers.splice(index, 1);
  }
};

Subject.prototype.unsubscribeAll = function() {
  this.observers.length = 0;
};

Subject.prototype.notify = function(next, observer) {
  if (typeof observer === 'function') {
    const index = this.getObserverIndex(observer);
    if (index !== -1) {
      this.observers[index](next);
    }
  } else {
    this.observers.forEach((o) => o(next));
  }
  return next;
};

export function BehaviorSubject(init) {
  Subject.call(this);
  this.cache = init;
}

BehaviorSubject.prototype = Object.create(Subject.prototype);
BehaviorSubject.prototype.constructor = BehaviorSubject;

BehaviorSubject.prototype.notify = function(next, observer) {
  this.cache = next;
  return Subject.prototype.notify.call(this, next, observer);
};

BehaviorSubject.prototype.subscribe = function(observer) {
  Subject.prototype.subscribe.call(this, observer);
  if (this.cache) {
    this.notify(this.cache, observer);
  }
  return observer;
};

export function combineLatest(...subjects) {
  const sub = new BehaviorSubject(Array(subjects.length));
  subjects.forEach((s, i) => {
    s.subscribe((d) => callback(s, i, d));
  });
  function callback(subject, position, data) {
    sub.cache[position] = data;
    sub.notify(sub.cache);
  }
  return sub;
}
