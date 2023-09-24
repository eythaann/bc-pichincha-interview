import { unifyReducersInOne } from '../../../src/modules/shared/app/utils/reducer';

test('unifyReducersInOne', () => {
  const reducer1 = (state, action) => ({ ...state, a: action.payload });
  const reducer2 = (state, action) => ({ ...state, b: action.payload });
  const unifiedReducer = unifyReducersInOne([reducer1, reducer2]);
  const initialState = {};
  const action = { payload: 'test' };
  const newState = unifiedReducer(initialState, action);
  expect(newState).toEqual({ a: 'test', b: 'test' });
});