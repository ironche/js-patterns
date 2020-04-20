import { Visitor, Element } from './visitor';

describe('Visitor', () => {
  it('should ammend element instance', () => {
    const v = new Visitor();
    const e = new Element();

    e.accept(v);
    expect(e.getData()).toBe(10);
  });
});
