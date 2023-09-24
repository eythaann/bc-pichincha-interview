import { BakendProductParser, FilterProducts } from '../../../src/modules/productList/app';

describe('BakendProductParser function', () => {
  it('should parse backend product to product', () => {
    const backendProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: '2023-01-01T00:00:00.000Z',
      date_revision: '2023-01-02T00:00:00.000Z',
    };

    const result = BakendProductParser(backendProduct as any);

    expect(result).toEqual({
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      emitionDate: '01/01/2023',
      revisionDate: '01/01/2024',
    });
  });
});

describe('FilterProducts function', () => {
  it('should filter products based on search string (case-insensitively)', () => {
    const productsDict = {
      '1': {
        id: '1',
        name: 'Test Product',
        description: 'Test Description',
        logo: 'Test Logo',
        emitionDate: '01/01/2023',
        revisionDate: '01/01/2024',
      },
      '2': {
        id: '2',
        name: 'Another Product',
        description: 'Another Description',
        logo: 'Another Logo',
        emitionDate: '01/01/2023',
        revisionDate: '01/01/2024',
      },
    };

    const result = FilterProducts(productsDict, 'test');

    expect(result).toEqual([productsDict[1]]);
  });
});