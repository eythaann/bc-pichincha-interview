import { ProductScheme } from '../../../src/modules/product/app/scheme';

describe('ProductScheme', () => {
  it('should validate a valid product', () => {
    const validProduct = {
      id: '12345',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'http://example.com/logo.png',
      emitionDate: '24/09/2023',
      revisionDate: '24/09/2024',
    };

    const result: any = ProductScheme.safeParse(validProduct);

    expect(result.success).toBe(true);
  });

  it('should invalidate an invalid product', () => {
    const invalidProduct = {
      id: '12', // ID too short
      name: 'Test Product',
      description: 'Test Description',
      logo: 'http://example.com/logo.png',
      emitionDate: '24/09/2023',
      revisionDate: '24/09/2024',
    };

    const result: any = ProductScheme.safeParse(invalidProduct);

    expect(result.success).toBe(false);
    expect(result.error?.message).toContain('Minimo 3 caracteres.');
  });

  it('should invalidate a product with incorrect date difference', () => {
    const invalidProduct = {
      id: '12345',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'http://example.com/logo.png',
      emitionDate: '24/09/2023',
      revisionDate: '24/09/2025', // Incorrect year difference
    };

    const result: any = ProductScheme.safeParse(invalidProduct);

    expect(result.success).toBe(false);
    expect(result.error?.message).toContain('Should be exactly 1 year bigger than emition date');
  });
});