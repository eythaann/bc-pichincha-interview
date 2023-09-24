import { addYears, dateToOwnFormat, ownFormatToDate, validateTime } from '../../../src/modules/shared/app/utils/date';

import { Time } from '../../../src/modules/shared/domain/types';

describe('Date utility functions', () => {
  it('should add years to a date', () => {
    const date = new Date(2023, 0, 1); // January 1, 2023
    const result = addYears(date, 2);
    expect(result).toEqual(new Date(2025, 0, 1)); // January 1, 2025
  });

  it('should format a date to dd/mm/yyyy', () => {
    const date = new Date(2023, 0, 1); // January 1, 2023
    const result = dateToOwnFormat(date);
    expect(result).toBe('01/01/2023');
  });

  it('should parse a formatted date string to a Date object', () => {
    const time = '01/01/2023' as Time;
    const result = ownFormatToDate(time);
    expect(result).toEqual(new Date(2023, 0, 1)); // January 1, 2023
  });

  it('should validate a formatted date string', () => {
    expect(validateTime('01/01/2023')).toBe(true);
    expect(validateTime('32/01/2023')).toBe(false); // Invalid day
    expect(validateTime('01/13/2023')).toBe(false); // Invalid month
    expect(validateTime('01/01/23')).toBe(false); // Invalid year
    expect(validateTime('1/01/2023')).toBe(false); // Invalid day format
    expect(validateTime('01/1/2023')).toBe(false); // Invalid month format
  });
});