import { Subject, BehaviorSubject, combineLatest } from './observer';

describe('Observer', () => {
  let subscriptions;

  beforeEach(() => {
    subscriptions = [];
    for (let i = 0; i < 3; i++) {
      subscriptions.push(jasmine.createSpy(`callback-${i}`));
    }
  });

  describe('Subject', () => {
    it('should subscribe distinct subscribers', () => {
      const app = new Subject();
      subscriptions.forEach((s) => {
        app.subscribe(s);
      });
      expect(app.observers.length).toBe(3);
    });

    it('should not subscribe existing subscriber', () => {
      const app = new Subject();
      const callback = subscriptions[0];
      for (let i = 0; i < 3; i++) {
        app.subscribe(callback);
      }
      expect(app.observers.length).toBe(1);
    });

    it('should unsubscribe', () => {
      const app = new Subject();
      const callback = subscriptions[0];
      app.subscribe(callback);
      app.unsubscribe(callback);
      expect(app.observers.length).toBe(0);
    });

    it('should unsubscribe all', () => {
      const app = new Subject();
      subscriptions.forEach((s) => {
        app.subscribe(s);
      });
      app.unsubscribeAll();
      expect(app.observers.length).toBe(0);
    });

    it('should notify observers when the subject changes', () => {
      const app = new Subject();
      const data = 'Loading...';

      app.subscribe(subscriptions[0]);
      app.subscribe(subscriptions[1]);
      app.next(data);
      app.subscribe(subscriptions[2]);

      for (let i = 0; i < 2; i++) {
        expect(subscriptions[i]).toHaveBeenCalledTimes(1);
        expect(subscriptions[i]).toHaveBeenCalledWith(data);
      }
      expect(subscriptions[2]).not.toHaveBeenCalled();
    });
  });

  describe('BehaviorSubject', () => {
    it('should notify observers when the subject changes', () => {
      const app = new BehaviorSubject();
      const data = 'Loading...';

      app.subscribe(subscriptions[0]);
      app.subscribe(subscriptions[1]);
      app.next(data);
      app.subscribe(subscriptions[2]);

      for (let i = 0; i < 3; i++) {
        expect(subscriptions[i]).toHaveBeenCalledTimes(1);
        expect(subscriptions[i]).toHaveBeenCalledWith(data);
      }
    });

    it('should combine multiple subjects into one', () => {
      const comp1 = new BehaviorSubject();
      const comp2 = new BehaviorSubject();
      const callback = subscriptions[0];

      comp1.next(1);
      comp2.next(2);

      combineLatest(comp1, comp2).subscribe(callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith([1, 2]);

      comp1.next(10);
      comp2.next(20);

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith([10, 20]);
    });
  });
});
