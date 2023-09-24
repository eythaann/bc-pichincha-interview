import { Product } from '../../../src/modules/product/app';

jest.mock('../../../src/modules/shared/app/utils/idGenerator', () => ({
  generateId: jest.fn(() => 'mockId'),
}));

jest.mock('../../../src/modules/shared/app/utils/date', () => ({
  dateToOwnFormat: jest.fn((date) => date),
  addYears: jest.fn((date, years) => new Date(date.setFullYear(date.getFullYear() + years))),
}));

describe('Product class', () => {
  let originalDate;

  beforeAll(() => {
    originalDate = global.Date;

    const fixedDate = new originalDate('2023-09-24T00:00:00Z');
    global.Date = jest.fn((x) => x ? originalDate(x) : fixedDate) as any;
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  it('should initialize with default values if no product object is passed', () => {
    const product = new Product();
    const date = new Date();

    expect(product).toEqual({
      id: 'mockId',
      name: '',
      description: '',
      logo: '',
      emitionDate: date,
      revisionDate: {},
    });
  });

  it('should initialize with provided values if a product object is passed', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      emitionDate: '2023-01-01',
      revisionDate: '2024-01-01',
    };

    const product = new Product(mockProduct);

    expect(product).toEqual(mockProduct);
  });
});