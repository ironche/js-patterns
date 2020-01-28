import { Shape, ColorDecorator, TransformDecorator } from './decorator';

describe('Decorator', () => {
  it('should have correct inheritance', () => {
    const cd = new ColorDecorator();
    expect(cd instanceof Shape).toBe(true);

    const td = new TransformDecorator();
    expect(td instanceof Shape).toBe(true);
  });

  it('should properly decorate component', () => {
    const comp = new TransformDecorator('rotated', new ColorDecorator('red', new Shape('circle')));
    expect(comp.description()).toBe('rotated red circle');
  });
});
