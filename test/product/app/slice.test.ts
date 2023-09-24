import { configureStore } from '@reduxjs/toolkit';

import { unifyReducersInOne } from '../../../src/modules/shared/app/utils/reducer';
import { productActions, productReducer } from '../../../src/modules/product/app/slice';
import { productsActions, productsReducer } from '../../../src/modules/productList/app/slice';

describe('products slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: unifyReducersInOne([productsReducer, productReducer]),
      },
    });
    store.dispatch(productsActions.setProducts({ '1': { 'id': '1' } } as any));
  });

  it('should handle setName', () => {
    const id = '1' as any;
    const name = 'New Product Name';
    store.dispatch(productActions.setName({ id, value: name }));

    console.log(store.getState());
    const state = store.getState().products;
    expect(state[id].name).toEqual(name);
  });

  it('should handle setDescription', () => {
    const id = '1' as any;
    const description = 'New Product Description';
    store.dispatch(productActions.setDescription({ id, value: description }));
    const state = store.getState().products;
    expect(state[id].description).toEqual(description);
  });

  it('should handle setLogo', () => {
    const id = '1' as any;
    const logo = 'New Product Logo';
    store.dispatch(productActions.setLogo({ id, value: logo }));
    const state = store.getState().products;
    expect(state[id].logo).toEqual(logo);
  });

  it('should handle setEmitionDate and update revisionDate', () => {
    const id = '1' as any;
    const emitionDate = new Date(2023, 0, 1); // January 1, 2023
    store.dispatch(productActions.setEmitionDate({ id, value: emitionDate } as any));
    const state = store.getState().products;
    expect(state[id].emitionDate).toEqual('01/01/2023');
    expect(state[id].revisionDate).toEqual('01/01/2024');
  });
});