import crypto from 'crypto';

import { generateId } from '../../../src/modules/shared/app/utils/idGenerator';;

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: (length) => crypto.randomUUID().substring(0, length),
  },
});

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