import { Singleton } from './singleton';

describe('Singleton', () => {
  it('should return same instance', () => {
    const inst1 = Singleton.getInstance();
    const inst2 = Singleton.getInstance();
    expect(inst1).toBe(inst2);
  });

  it('should return same instance even when "new" is used', () => {
    const inst1 = new Singleton();
    const inst2 = new Singleton();
    expect(inst1).toBe(inst2);
  });
});
