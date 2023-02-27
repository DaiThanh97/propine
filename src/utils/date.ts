import { format, isMatch } from 'date-fns';

export const DATE_FORMAT = 'ddMMyyyy';

export const formatDateString = (date: Date): string => {
  return format(date, DATE_FORMAT);
};

export const isMatchDateFormat = (date: string): boolean =>
  isMatch(date, DATE_FORMAT);
