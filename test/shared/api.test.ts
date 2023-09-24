
import { callApi } from '../../src/modules/shared/infrastructure/api';

import { httpMethod } from '../../src/modules/shared/domain/httpTypes';
describe('callApi function', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'test data' }),
      })
    ) as any;
  });

  afterAll(() => {
    // @ts-ignore
    global.fetch.mockClear();
    global.fetch = originalFetch;
  });

  it('should call onSuccess with response data on successful request', async () => {
    const onSuccess = jest.fn();
    await callApi({
      url: 'http://example.com',
      path: '/success',
      method: httpMethod.get,
      onSuccess,
    });

    expect(onSuccess).toHaveBeenCalledWith({ data: 'test data' });
  });

  it('should call onFailure with error on failed request', async () => {
    // Cambiar la implementación mockeada de fetch para simular un error
    global.fetch = jest.fn(() => Promise.reject(new Error('fetch error')));

    const onFailure = jest.fn();
    await callApi({
      url: 'http://example.com',
      path: '/error',
      method: httpMethod.get,
      onFailure,
    });

    expect(onFailure).toHaveBeenCalledWith(new Error('fetch error'));
  });
});