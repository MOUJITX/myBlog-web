import moment from 'moment';

export const dateFormat = (
  date: Date | string | undefined,
  format: string | 'YYYY-MM-DD HH:mm:ss',
): string => {
  return moment(date).format(format);
};

export const nowString = (format: string): string => {
  const nowDate = new Date();
  return dateFormat(nowDate, format);
};
