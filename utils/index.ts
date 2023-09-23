import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ICalculateCargo, ICargoValues } from '@/types';
import moment from 'moment';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
const eightHoursInSeconds = 8 * 3600;

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
      expiresIn: moment().add(tokenExpiresIn, 'second').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    },
    refresh: {
      token: refreshToken,
      expiresIn: moment().add(refreshTokenExpiresIn, 'second').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
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

export const calculateDrivingTime = (distance: number, averageSpeed: number) => {
  const drivingSeconds = (distance / averageSpeed) * 3600;
  const duration = moment.duration(drivingSeconds, 'seconds');

  return {
    duration: beatifyTime(duration.hours(), duration.minutes()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    durationInSeconds: duration.asSeconds(),
  };
};

export const combineDateTime = (date: Date, time: string) => {
  const timeParts = time.split(':').map(Number);

  let dateTime = moment(date).format('YYYY-MM-DD HH:mm:ss');

  if (timeParts.length === 2) {
    dateTime = moment(date)
      .hours(timeParts[0])
      .minutes(timeParts[1])
      .seconds(0)
      .format('YYYY-MM-DD HH:mm:ss');
  }

  return moment(dateTime);
};

export const remainingTimeToSeconds = (value: string) => {
  const parts = value.split(':');

  const hours = +parts[0];
  const minutes = +parts[1];

  return eightHoursInSeconds - (hours * 3600) + (minutes * 60);
};

export const calculateCargo = (values: ICargoValues) => {
  const {
    remainingWorkHours,
    startDate,
    startTime,
    endDate,
    endTime,
    distance,
    eightHoursBreak,
    averageSpeed,
  } = values;

  let result: ICalculateCargo = {
    remainingTime: null,
    drivingHours: null,
    oneHoursBreak: 0,
    elevenHoursBreak: 0,
  };

  if (averageSpeed && startDate && startTime && endDate && endTime && remainingWorkHours) {
    const loadDateTime = combineDateTime(startDate, startTime);
    const unloadDataTime = combineDateTime(endDate, endTime);
    const differenceInSeconds = unloadDataTime.diff(loadDateTime, 'seconds');

    const remainingTimeInSeconds = remainingTimeToSeconds(remainingWorkHours);
    const drivingHours = calculateDrivingTime(distance || 0, averageSpeed);
    const oneHoursBreak = +drivingHours.duration / 8 < 1 ? 0 : Math.round(+drivingHours.duration / 8);
    const elevenHoursBreak = +drivingHours.duration / 8 < 1 ? 0 : Math.floor(+drivingHours.duration / 8);

    const duration = moment.duration(
      differenceInSeconds
        - drivingHours.durationInSeconds
        - remainingTimeInSeconds
        - (oneHoursBreak * 3600)
        - ((elevenHoursBreak * 39600) - (eightHoursBreak * 7200)),
      'seconds',
    );

    result = {
      ...result,
      remainingTime: beatifyTime(duration.hours(), duration.minutes()),
      drivingHours,
      oneHoursBreak,
    };
  }

  return result;
};

export const beatifyTime = (hours: number, minutes: number) => {
  if (minutes >= 0) {
    return `${hours}.${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  return `${hours < 0 || minutes < 0 ? '-' : ''}${Math.abs(hours)}.${Math.abs(minutes)}`;
};
