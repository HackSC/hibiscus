import { HibiscusRole } from '../types/user';

export const validRole = (role: string) => {
  return (
    [
      HibiscusRole.ADMIN,
      HibiscusRole.HACKER,
      HibiscusRole.SPONSOR,
      HibiscusRole.VOLUNTEER,
      HibiscusRole.JUDGE,
    ] as string[]
  ).includes(role);
};

export interface ResponseBody {
  meta: {
    message: string;
    statusCode: number;
    isError?: boolean;
    errors?: unknown[];
  };
  data?: unknown;
}

export const createResponseBody = (body?: {
  meta?: {
    message: string;
    statusCode: number;
    code?: string;
    isError?: boolean;
    errors?: unknown[];
  };
  data?: unknown;
}): ResponseBody => {
  const defaultResponseBody: ResponseBody = {
    meta: { message: 'Success', statusCode: 200 },
  };
  if (body === undefined) return defaultResponseBody;
  return { ...defaultResponseBody, ...body };
};
