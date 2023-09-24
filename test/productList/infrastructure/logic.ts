import { callApi } from '../../../src/modules/shared/infrastructure/api';
import { store } from '../../../src/modules/shared/infrastructure/store';
import { fetchProducts } from '../../../src/modules/productList/infrastructure/logic';

import { productsActions } from '../../../src/modules/productList/app/slice';

jest.mock('../../../src/modules/shared/infrastructure/api', () => ({
  callApi: jest.fn(),
}));

jest.mock('../../../src/modules/shared/infrastructure/store', () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

describe('fetchProducts function', () => {
  it('should fetch products and dispatch setProducts action', async () => {
    const mockResponse = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];

    const mockParsedProducts = {
      '1': { id: '1', name: 'Product 1' },
      '2': { id: '2', name: 'Product 2' },
    };

    (callApi as jest.Mock).mockImplementationOnce(({ onSuccess }) => {
      onSuccess(mockResponse);
    });

    await fetchProducts();

    expect(store.dispatch).toHaveBeenCalledWith(
      productsActions.setProducts(mockParsedProducts)
    );
  });
});