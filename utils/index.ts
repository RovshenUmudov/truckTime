import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dayjs from 'dayjs';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalizeFirstLetter = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const createJWT = (userId: string) => {
  const tokenExpiresIn = 3600;
  const refreshTokenExpiresIn = 86400;

  const token = jwt.sign(
    { id: userId },
    process.env.NEXT_PUBLIC_MONGODB_SECRET || '',
    { expiresIn: tokenExpiresIn },
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.NEXT_PUBLIC_MONGODB_SECRET || '',
    { expiresIn: refreshTokenExpiresIn },
  );

  return {
    access: {
      token,
      expiresIn: dayjs().add(tokenExpiresIn, 'second').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    },
    refresh: {
      token: refreshToken,
      expiresIn: dayjs().add(refreshTokenExpiresIn, 'second').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    },
  };
};

export const decodedJWT = (token: string) => {
  const payload = jwt.verify(token, process.env.NEXT_PUBLIC_MONGODB_SECRET || '');

  return payload as JwtPayload;
};

export const getMessageInError = (message: string | string[] | undefined): string => {
  if (Array.isArray(message)) {
    return capitalizeFirstLetter(message?.join(' '));
  }

  return capitalizeFirstLetter(message || 'Something went wrong!');
};

export function isObjEqual<T>(object1: T, object2: T): boolean {
  if (!object1 || !object2) return false;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  // cannot simply compare key-array lengths as lengths could be same while the keys themselves differ
  // cannot skip this check either and just check the values of all keys concatenated
  // because { "key": undefined }["key"] and {}["key"] would equal incorrectly
  // eslint-disable-next-line no-restricted-syntax
  for (const k of keys1) if (!keys2.includes(k)) return false;
  // eslint-disable-next-line no-restricted-syntax
  for (const k of keys2) if (!keys1.includes(k)) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) { // @ts-ignore compare -----
    if (object1[key] !== object2[key]) return false;
  }

  return true;
}

export const asyncDelay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const numberRegExp = /^[0-9]*$/;
export const floatNumberRegExp = /^[0-9.]*$/;
