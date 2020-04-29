import { Subject, debounceTime, distinctUntilChanged } from './visitor2';

describe('Visitor as function', () => {
  let subscription;
  let element;

  beforeEach(() => {
    subscription = jasmine.createSpy('callback');
    element = new Subject();
  });

  it('should call notify only if value is different', () => {
    element
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe(subscription);

    for (let i = 0; i < 5; i++) {
      element.next(100);
    }

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(subscription).toHaveBeenCalledWith(100);
  });

  it('should call notify with throttle', () => {
    jasmine.clock().install();
    let now = 0;
    spyOn(Date, 'now').and.callFake(() => {
      now += 50;
      return now;
    });

    element
      .pipe(
        debounceTime(100),
      )
      .subscribe(subscription);

    for (let i = 0; i < 5; i++) {
      element.next(i);
    }
    jasmine.clock().tick();

    expect(subscription).toHaveBeenCalledTimes(2);
    expect(subscription).toHaveBeenCalledWith(0);
    expect(subscription).toHaveBeenCalledWith(4);
    jasmine.clock().uninstall();
  });
});
