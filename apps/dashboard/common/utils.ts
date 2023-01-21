import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';
import slowDown from 'express-slow-down';
import rateLimit from 'express-rate-limit';
import { getEnv } from '@hibiscus/env';

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

/**
 * Apply middleware to Next.js API handler
 * @param middleware middleware
 * @returns an API handler with the middleware applied
 */
export const applyMiddleware =
  (middleware) => (request: NextApiRequest, response: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(request, response, (result) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });

const getIP = (request) =>
  getClientIp(request) ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.socket.remoteAddress;

export const getRateLimitMiddlewares = ({
  limit = 10,
  windowMs = 60 * 1000,
  delayAfter = Math.round(10 / 2),
  delayMs = 500,
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

export const rateLimitHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // rate limiting
  const middlewares = getRateLimitMiddlewares({ limit: 50 }).map(
    applyMiddleware
  );
  await Promise.all(middlewares.map((middleware) => middleware(req, res)));
};

export const getTokensFromNextRequest = (req: NextApiRequest) => {
  const accessToken = req.cookies[getEnv().Hibiscus.Cookies.accessTokenName];
  const refreshToken = req.cookies[getEnv().Hibiscus.Cookies.refreshTokenName];
  return { refreshToken, accessToken };
};
