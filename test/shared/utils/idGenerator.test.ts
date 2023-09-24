import { generateId } from '../../../src/modules/shared/app/utils/idGenerator';

describe('generateId function', () => {
  it('should generate a string ID', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
  });

  it('should generate an ID of length 10', () => {
    const id = generateId();
    expect(id.length).toBe(10);
  });
});