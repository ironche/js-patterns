/* eslint-disable no-param-reassign */
import { Subject } from '../observer/observer';

Subject.prototype.accept = function(...visitors) {
  if (visitors.length) {
    visitors.forEach((v) => v.visit(this));
  }
  return this;
};

export { Subject };

export function DebounceTimeVisitor(ms) {
  this.ms = ms;
}

DebounceTimeVisitor.prototype.visit = function(subject) {
  const next = subject.next.bind(subject);
  let lastExecTime;
  let timeout;
  subject.next = (value) => {
    if (!lastExecTime) {
      next(value);
      lastExecTime = Date.now();
    } else {
      let now = Date.now();
      const delay = this.ms - (now - lastExecTime);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        now = Date.now();
        if ((now - lastExecTime) >= this.ms) {
          next(value);
          lastExecTime = now;
        }
      }, delay);
    }
  };
};

export function DistinctUntilChangedVisitor() {
}

DistinctUntilChangedVisitor.prototype.visit = function(subject) {
  const next = subject.next.bind(subject);
  subject.next = (value) => {
    if (subject.value !== value) {
      next(value);
    }
  };
};
