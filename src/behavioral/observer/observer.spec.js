import { Subject, BehaviorSubject, combineLatest } from './observer';

describe('Observer', () => {
  const fns = {
    fn1: () => {},
    fn2: () => {},
    fn3: () => {},
  };
  let spy1;
  let spy2;
  let spy3;

  beforeEach(() => {
    spy1 = spyOn(fns, 'fn1');
    spy2 = spyOn(fns, 'fn2');
    spy3 = spyOn(fns, 'fn3');
  });

  describe('Subject', () => {
    it('should subscribe distinct subscribers', () => {
      const app = new Subject();
      Object.keys(fns).forEach((k) => {
        app.subscribe(fns[k]);
      });
      expect(app.observers.length).toBe(3);
    });

    it('should not subscribe existing subscriber', () => {
      const app = new Subject();
      for (let i = 0; i < 3; i++) {
        app.subscribe(fns.fn1);
      }
      expect(app.observers.length).toBe(1);
    });

    it('should unsubscribe', () => {
      const app = new Subject();
      app.subscribe(fns.fn1);
      app.unsubscribe(fns.fn1);
      expect(app.observers.length).toBe(0);
    });

    it('should unsubscribe all', () => {
      const app = new Subject();
      Object.keys(fns).forEach((k) => {
        app.subscribe(fns[k]);
      });
      app.unsubscribeAll();
      expect(app.observers.length).toBe(0);
    });

    it('should notify observers when the subject changes', () => {
      const app = new Subject();
      const data = 'Loading...';

      app.subscribe(fns.fn1);
      app.subscribe(fns.fn2);
      app.notify(data);
      app.subscribe(fns.fn3);

      [spy1, spy2].forEach((s) => {
        expect(s).toHaveBeenCalledTimes(1);
        expect(s).toHaveBeenCalledWith(data);
      });
      expect(spy3).not.toHaveBeenCalled();
    });
  });

  describe('BehaviorSubject', () => {
    it('should notify observers when the subject changes', () => {
      const app = new BehaviorSubject();
      const data = 'Loading...';

      app.subscribe(fns.fn1);
      app.subscribe(fns.fn2);
      app.notify(data);
      app.subscribe(fns.fn3);

      [spy1, spy2, spy3].forEach((s) => {
        expect(s).toHaveBeenCalledTimes(1);
        expect(s).toHaveBeenCalledWith(data);
      });
    });

    it('should combine multiple subjects into one', () => {
      const comp1 = new BehaviorSubject();
      const comp2 = new BehaviorSubject();

      comp1.notify(1);
      comp2.notify(2);
      combineLatest(comp1, comp2).subscribe(fns.fn1);

      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith([1, 2]);

      comp1.notify(10);
      comp2.notify(20);

      expect(spy1).toHaveBeenCalledTimes(3);
      expect(spy1).toHaveBeenCalledWith([10, 20]);
    });
  });
});
