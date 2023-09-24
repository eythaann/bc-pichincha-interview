import { selectProductById } from '../../../src/modules/product/app/selectors';

describe('selectProductById selector', () => {
  it('should select a product by id', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      emitionDate: '01/01/2023',
      revisionDate: '01/01/2024',
    };

    const state = {
      admin: {
        products: {
          '1': product,
        },
      },
    };

    const selectedProduct = selectProductById(product.id as any)(state as any);
    expect(selectedProduct).toEqual(product);
  });
});