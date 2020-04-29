/* eslint-disable no-param-reassign */
import { Subject } from '../observer/observer';

Subject.prototype.pipe = function(...visitors) {
  if (visitors.length) {
    visitors.forEach((v) => v(this));
  }
  return this;
};

export { Subject };

export function debounceTime(ms) {
  return function(subject) {
    const next = subject.next.bind(subject);
    let lastExecTime;
    let timeout;
    subject.next = (value) => {
      if (!lastExecTime) {
        next(value);
        lastExecTime = Date.now();
      } else {
        let now = Date.now();
        const delay = ms - (now - lastExecTime);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          now = Date.now();
          if ((now - lastExecTime) >= ms) {
            next(value);
            lastExecTime = now;
          }
        }, delay);
      }
    };
  };
}

export function distinctUntilChanged() {
  return function(subject) {
    const next = subject.next.bind(subject);
    subject.next = (value) => {
      if (subject.value !== value) {
        next(value);
      }
    };
  };
}
