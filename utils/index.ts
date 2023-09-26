import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ICalculateCargo, ICargo, ITime } from '@/types';
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
export const eightHoursBreakCountRegExp = /^[0-3]$/;

export const calculateDrivingTime = (distance: number, averageSpeed: number) => {
  const drivingSeconds = (distance / averageSpeed) * 3600;
  const duration = moment.duration(drivingSeconds, 'seconds');

  return {
    ...formatTime({
      hours: duration.days() * 24 + duration.hours() || 0,
      minutes: duration.minutes() || 0,
    }),
    durationInSeconds: duration.asSeconds() || 0,
  };
};

export const calculateBreaks = (seconds: number) => {
  const breaks = (seconds / 3600) / 8;

  return {
    oneHoursBreak: breaks < 1 ? 0 : Math.round(breaks),
    elevenHoursBreak: breaks < 1 ? 0 : Math.floor(breaks),
  };
};

export const combineDateTime = (date: string, time: string) => {
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

export const remainingTimeToSeconds = (value: string, differenceInSeconds: number) => {
  const parts = value.split(':');

  const hours = +parts[0];
  const minutes = +parts[1];

  if (differenceInSeconds / 3600 <= 24) {
    return (hours * 3600) + (minutes * 60);
  }

  return eightHoursInSeconds - (hours * 3600) + (minutes * 60);
};

export const calculateCargo = (values: ICargo) => {
  const {
    remainingWorkHours,
    startDate,
    startTime,
    unloadDate,
    unloadTime,
    distance,
    eightHoursBreak,
    averageSpeed,
  } = values;

  let result: ICalculateCargo = {
    remainingTime: null,
    driving: null,
    duration: null,
    oneHoursBreak: 0,
    elevenHoursBreak: 0,
  };

  if (averageSpeed && startDate && startTime && unloadDate && unloadTime && remainingWorkHours) {
    const loadDateTime = combineDateTime(startDate, startTime);
    const unloadDataTime = combineDateTime(unloadDate, unloadTime);
    const differenceInSeconds = unloadDataTime.diff(loadDateTime, 'seconds');

    const remainingTimeTodayInSeconds = remainingTimeToSeconds(remainingWorkHours, differenceInSeconds);
    const driving = calculateDrivingTime(distance || 0, averageSpeed);
    const { oneHoursBreak, elevenHoursBreak } = calculateBreaks(driving.durationInSeconds);

    const totalDuration = moment.duration(differenceInSeconds, 'seconds');

    const adjustedDifference = differenceInSeconds / 3600 <= 24
      ? remainingTimeTodayInSeconds : differenceInSeconds - remainingTimeTodayInSeconds;

    const duration = moment.duration(
      adjustedDifference
        - driving.durationInSeconds
        - (oneHoursBreak * 3600)
        - ((elevenHoursBreak * 39600) - (eightHoursBreak * 7200)),
      'seconds',
    );

    result = {
      ...result,
      duration: formatTime({
        hours: totalDuration.days() * 24 + totalDuration.hours(),
        minutes: totalDuration.minutes(),
      }),
      remainingTime: formatTime({
        hours: duration.days() * 24 + duration.hours(),
        minutes: duration.minutes(),
      }),
      driving,
      oneHoursBreak,
    };
  }

  return result;
};

export const formatTime = ({ hours, minutes }: ITime) => ({
  hours,
  minutes: hours < 0 ? Math.abs(minutes) : minutes,
});

export const beatifyTime = ({ hours, minutes }: ITime, withSign = true) => {
  const hoursPrefix = Math.abs(hours) > 1 ? 'hours' : 'hour';
  const minutesPrefix = Math.abs(minutes) > 1 ? 'minutes' : 'minutes';
  const sign = hours < 0 || minutes < 0 ? '-' : '+';

  return `${withSign ? sign : ''} ${Math.abs(hours) ? `${`${Math.abs(hours)} ${hoursPrefix}`}` : ''}
  ${Math.abs(minutes) > 0 ? `${`${Math.abs(minutes)} ${minutesPrefix}`}` : ''}`;
};

export const splitTimeStr = (time: string): ITime => {
  const parts = time.split(':').map(Number);

  if (parts.length === 2) {
    return {
      hours: parts[0] || 0,
      minutes: parts[1] || 0,
      second: 0,
    };
  }

  return { hours: 0, minutes: 0, second: 0 };
};
