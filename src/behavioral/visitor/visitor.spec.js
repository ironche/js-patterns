import { Subject, DebounceTimeVisitor, DistinctUntilChangedVisitor } from './visitor';

describe('Visitor as class', () => {
  let subscription;
  let distinctUntilChangedVisitor;
  let debounceTimeVisitor;
  let element;

  beforeEach(() => {
    subscription = jasmine.createSpy('callback');
    distinctUntilChangedVisitor = new DistinctUntilChangedVisitor();
    debounceTimeVisitor = new DebounceTimeVisitor(100);
    element = new Subject();
  });

  it('should visit element', () => {
    const spy1 = spyOn(distinctUntilChangedVisitor, 'visit');
    const spy2 = spyOn(debounceTimeVisitor, 'visit');

    element
      .accept(distinctUntilChangedVisitor, debounceTimeVisitor)
      .subscribe(subscription);

    [spy1, spy2].forEach((s) => {
      expect(s).toHaveBeenCalledTimes(1);
      expect(s).toHaveBeenCalledWith(element);
    });
  });

  it('should call notify only if value is different', () => {
    element
      .accept(distinctUntilChangedVisitor)
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
      .accept(debounceTimeVisitor)
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
