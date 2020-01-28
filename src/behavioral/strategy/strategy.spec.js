import { Product, NormalVat, ReducedVat } from './strategy';

describe('Strategy', () => {
  it('should apply strategy run-time', () => {
    const kiwi = new Product(50);

    kiwi.setVatStrategy(new NormalVat());
    expect(kiwi.getPrice()).toBe(60.00);

    kiwi.setVatStrategy(new ReducedVat());
    expect(kiwi.getPrice()).toBe(55.00);
  });
});
