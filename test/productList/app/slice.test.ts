import { configureStore } from '@reduxjs/toolkit';

import { productsActions, productsReducer } from '../../../src/modules/productList/app/slice';

describe('products slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().products;
    expect(state).toEqual({});
  });

  it('should handle setProducts', () => {
    const products = {
      '1': { id: '1', name: 'Product 1' },
      '2': { id: '2', name: 'Product 2' },
    };
    store.dispatch(productsActions.setProducts(products));
    const state = store.getState().products;
    expect(state).toEqual(products);
  });

  it('should handle removeProduct', () => {
    const products = {
      '1': { id: '1', name: 'Product 1' },
      '2': { id: '2', name: 'Product 2' },
    };
    store.dispatch(productsActions.setProducts(products));
    store.dispatch(productsActions.removeProduct('1' as any));
    const state = store.getState().products;
    expect(state).toEqual({
      '2': { id: '2', name: 'Product 2' },
    });
  });
});
