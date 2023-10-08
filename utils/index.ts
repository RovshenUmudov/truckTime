import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { EnumCargoType, ICargo, IMultipleUnload, ITime } from '@/types';
import moment from 'moment';
import { defaultCargoFormValues } from '@/components/Forms/CargoForm';

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

export const numberRegExp = /^[0-9]*$/;
export const calculateDrivingTime = (distance: number, averageSpeed: number) => {
  const drivingSeconds = (distance / averageSpeed) * 3600;
  const duration = moment.duration(drivingSeconds, 'seconds');

  return formatTime({
    hours: duration.days() * 24 + duration.hours() || 0,
    minutes: duration.minutes() || 0,
  });
};

export const calculateBreaks = (seconds: number, weekendHours: number) => {
  const breaks = (seconds / 3600) / 8;

  let restTime = breaks <= 1 ? 0 : Math.floor(breaks);

  if (weekendHours > 0 && restTime > 0) {
    restTime -= 1;
  }

  return {
    oneHoursBreak: breaks < 1 ? 0 : Math.round(breaks),
    restTime,
  };
};

export const combineDateTime = (date: string, time: string) => {
  const { hours, minutes } = splitTimeStr(time);

  const dateTime = moment(date)
    .hours(hours)
    .minutes(minutes)
    .seconds(0)
    .format('YYYY-MM-DD HH:mm:ss');

  return moment(dateTime);
};

export const remainingTimeToSeconds = (value: string, differenceInSeconds: number) => {
  const { totalInSeconds } = splitTimeStr(value);

  if (differenceInSeconds <= eightHoursInSeconds) {
    return differenceInSeconds - (totalInSeconds || 0);
  }

  return eightHoursInSeconds - (totalInSeconds || 0);
};

export const calculateCargo = (values: ICargo, userRestTime: number) => {
  const {
    remainingWorkHours,
    startDate,
    startTime,
    totalDistance,
    eightHoursRest,
    averageSpeed,
    multipleUnload,
    weekendHours,
    type,
  } = values;

  let result: Partial<ICargo> = {
    oneHoursBreak: 0,
    eightHoursRest: 0,
    totalRestTime: 0,
  };

  let breaks = 0;
  let distance = type === EnumCargoType.single ? totalDistance || 0 : 0;
  let lastMultipleUnload: IMultipleUnload = defaultCargoFormValues.multipleUnload[0];

  if (type === EnumCargoType.multiple) {
    [lastMultipleUnload] = multipleUnload.slice(-1);

    multipleUnload.forEach((el, index) => {
      const { totalInSeconds } = splitTimeStr(el.breakTime || '');

      breaks += multipleUnload.length > 1 && index < multipleUnload.length - 1 ? (totalInSeconds || 0) : 0;
      distance += +el.distance || 0;
    });
  }

  if (averageSpeed && startDate && startTime && remainingWorkHours) {
    const loadDateTime = combineDateTime(startDate, startTime);
    const unloadDataTime = handleUnloadDate(values, lastMultipleUnload);

    if (!unloadDataTime) {
      return result;
    }

    const differenceInSeconds = unloadDataTime.diff(loadDateTime, 'seconds');
    const remainingTimeTodayInSeconds = remainingTimeToSeconds(remainingWorkHours, differenceInSeconds);
    const driving = calculateDrivingTime(distance, averageSpeed);
    const { oneHoursBreak, restTime } = calculateBreaks(driving.totalInSeconds || 0, Number(weekendHours));
    const totalDuration = moment.duration(differenceInSeconds, 'seconds');

    const duration = moment.duration(
      differenceInSeconds
        - remainingTimeTodayInSeconds
        - breaks
        - (driving.totalInSeconds || 0)
        - (oneHoursBreak * 3600)
        - (restTime * (userRestTime * 3600)) + ((eightHoursRest || 0) * 7200)
        - (Number(weekendHours) * 3600),
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
      totalDistance: distance,
      userRestTime,
      totalRestTime: oneHoursBreak + (restTime * userRestTime) + Number(weekendHours),
      eightHoursRest,
      oneHoursBreak,
    };
  }

  return result;
};

const handleUnloadDate = (values: ICargo, lastElement: IMultipleUnload) => {
  if (values.type === EnumCargoType.multiple && lastElement?.date?.length && lastElement?.time?.length) {
    return combineDateTime(lastElement.date, lastElement.time);
  }

  if (values.type === EnumCargoType.single && values.unloadDate && values.unloadTime) {
    return combineDateTime(values.unloadDate, values.unloadTime);
  }

  return null;
};

export const formatTime = ({ hours, minutes }: ITime): ITime => ({
  hours,
  minutes: hours < 0 ? Math.abs(minutes) : minutes,
  totalInSeconds: (hours * 3600) + (minutes * 60) || 0,
});

export const beatifyTime = ({ hours, minutes }: ITime, withSign = true, withOnTime = true) => {
  const hoursPrefix = Math.abs(hours) > 1 ? 'hrs' : 'hr';
  const minutesPrefix = Math.abs(minutes) > 1 ? 'mins' : 'mins';
  const sign = hours < 0 || minutes < 0 ? '-' : '+';

  if (hours === 0 && minutes === 0) {
    return withOnTime ? 'On time' : '-';
  }

  return `${withSign ? sign : ''} ${Math.abs(hours) ? `${`${Math.abs(hours)} ${hoursPrefix}`}` : ''}
  ${Math.abs(minutes) > 0 ? `${`${Math.abs(minutes)} ${minutesPrefix}`}` : ''}`;
};

export const splitTimeStr = (time: string): ITime => {
  const parts = (time || '00:00').split(':').map(Number);

  const hours = parts[0];
  const minutes = parts[1] || 0;

  return {
    hours,
    minutes,
    second: 0,
    totalInSeconds: (hours * 3600) + (minutes * 60),
  };
};
