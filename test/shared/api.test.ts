import fetchMock from 'fetch-mock';

import { callApi } from '../../src/modules/shared/infrastructure/api';

import { httpMethod } from '../../src/modules/shared/domain/httpTypes';

describe('callApi function', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should call onSuccess with response data on successful request', async () => {
    const mockResponse = { data: 'test data' };
    fetchMock.mock('http://example.com/test-path', {
      body: mockResponse,
      status: 200,
    });

    const onSuccess = jest.fn();
    await callApi({
      url: 'http://example.com',
      path: '/test-path',
      method: httpMethod.get,
      onSuccess,
    });

    expect(onSuccess).toHaveBeenCalledWith(mockResponse);
  });

  it('should call onFailure with error on failed request', async () => {
    fetchMock.mock('http://example.com/test-path', 500); // Simulating a server error

    const onFailure = jest.fn();
    await callApi({
      url: 'http://example.com',
      path: '/test-path',
      method: httpMethod.get,
      onFailure,
    });

    expect(onFailure).toHaveBeenCalled();
  });
});