import { getErrorMessage } from '../../../src/modules/shared/app/utils/errors';

describe('getErrorMessage function', () => {
  it('should contain the number and return a string', () => {
    const errorMessage = getErrorMessage('min', 3);
    expect(typeof errorMessage).toBe('string');
    expect(errorMessage).toContain('3');
  });
});