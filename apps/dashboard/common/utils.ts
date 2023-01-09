import moment from 'moment';

export const getWordCount = (text: string) =>
  text.trim().length !== 0 ? text.trim().split(/\s+/).length : 0;
export const getAge = (dob: Date | number) => {
  const today = new Date();
  const birthday = new Date(dob);
  const todayMoment = moment([
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ]);
  const bdayMoment = moment([
    birthday.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  ]);
  const age = todayMoment.diff(bdayMoment, 'years'); // rounded down by default
  return age;
};
/**
 * Check if word count for given `text` is above the `meta.min` word count and/or under `meta.max` word count
 * @param text
 * @param meta
 * @returns boolean
 */
export const isInWordRange = (
  text: string,
  meta: { min?: number; max?: number }
) => {
  // if either not provided, then considered valid
  const under = meta.min && isUnder(text, meta.min);
  const above = meta.max && isAbove(text, meta.max);
  return !under && !above;
};

/**
 * check if word count for given `text` is under the `min` word count
 * @param text
 * @param min
 * @returns boolean
 */
export const isUnder = (text: string, min: number) => {
  const wc = getWordCount(text);
  return wc < min;
};

/**
 * check if word count for given `text` is above the `max` word count
 * @param text
 * @param max
 * @returns boolean
 */
export const isAbove = (text: string, max: number) => {
  const wc = getWordCount(text);
  return wc > max;
};
