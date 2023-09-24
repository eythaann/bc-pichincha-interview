import { selectProductsDict } from '../../../src/modules/productList/app/selector';

describe('selectProductsDict function', () => {
  it('should select products from state', () => {
    const mockState = {
      admin: {
        products: {
          '1': { id: '1', name: 'Product 1' },
          '2': { id: '2', name: 'Product 2' },
        },
      },
    };

    const result = selectProductsDict(mockState as any);

    expect(result).toEqual({
      '1': { id: '1', name: 'Product 1' },
      '2': { id: '2', name: 'Product 2' },
    });
  });
});