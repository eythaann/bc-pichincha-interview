import { z } from 'zod';

import { addYears, ownFormatToDate, validateTime } from '../../shared/app/utils/date';
import { getErrorMessage } from '../../shared/app/utils/errors';

export const ProductScheme = z.object({
  'id': z.string().min(3, getErrorMessage('min', 3)).max(10, getErrorMessage('max', 10)),
  'name': z.string().min(5, getErrorMessage('min', 5)).max(100, getErrorMessage('max', 100)),
  'description': z.string().min(10, getErrorMessage('min', 10)).max(200, getErrorMessage('max', 200)),
  'logo': z.string().url(getErrorMessage('url')),
  'emitionDate': z.string()
    .refine((value) => validateTime(value), getErrorMessage('time'))
    .refine((value) => {
      if (!validateTime(value)) {
        return false;
      }
      const emitionDate = ownFormatToDate(value);
      const now = new Date();

      emitionDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      return emitionDate >= now;
    }, getErrorMessage('today')),
  'revisionDate': z.string().refine((value) => validateTime(value), getErrorMessage('time')),
}).refine((data) => {
  if (!validateTime(data.emitionDate) || !validateTime(data.revisionDate)) {
    return false;
  }

  const emitionDate = ownFormatToDate(data.emitionDate);
  const revisionDate = ownFormatToDate(data.revisionDate);
  const oneYearLater = addYears(emitionDate, 1);

  return (
    revisionDate.getFullYear() === oneYearLater.getFullYear() &&
    revisionDate.getMonth() === oneYearLater.getMonth() &&
    revisionDate.getDate() === oneYearLater.getDate()
  );
}, {
  message: 'Should be exactly 1 year bigger than emition date',
});