import { callApi } from '../../../src/modules/shared/infrastructure/api';
import { getProductIdValidator } from '../../../src/modules/product/infrastructure/logic';

jest.mock('../../../src/modules/shared/infrastructure/api.ts', () => ({
  callApi: jest.fn(),
}));

describe('getProductIdValidator function', () => {
  it('should resolve with a type guard function if the API call is successful', async () => {
    (callApi as jest.Mock).mockImplementationOnce(({ onSuccess }) => {
      onSuccess(true);
    });

    const validator = await getProductIdValidator('1');
    expect(validator('1')).toBe(true);
  });

  it('should reject with an error if the API call fails', async () => {
    const error = new Error('API call failed');
    (callApi as jest.Mock).mockImplementationOnce(({ onFailure }) => {
      onFailure(error);
    });

    await expect(getProductIdValidator('1')).rejects.toThrow(error);
  });
});