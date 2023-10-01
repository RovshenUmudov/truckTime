import { FormikProps } from 'formik';

export interface IErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export type ICredentials = Record<'email' | 'password', string>

export type IHttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IFetchInit<Body> {
  method: IHttpMethods;
  body?: Body;
  accessToken?: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  removeContentType?: boolean;
  emptyResponse?: boolean;
}

export interface IFetchResult<Response, Error> {
  data: Response | null;
  error: Error | null;
}

export interface IToken {
  expiresIn: string;
  token: string;
}

export interface ITokens {
  access: IToken;
  refresh: IToken;
}

export interface IUserMe {
  id: string;
  email: string;
  imageURL?: string;
  averageSpeed: number;
  role: EnumUserRole;
}

export enum EnumCargoType {
  'multiple' = 'multiple',
  'single' = 'single',
}

export interface IMultipleUnload {
  date: string;
  time: string;
  distance: string;
  breakTime: string;
}

export interface ICargo {
  _id?: string;
  userId?: string;
  title: string;
  startDate: string | undefined;
  startTime: string | undefined;
  multipleUnload: IMultipleUnload[];
  unloadDate: string | undefined;
  unloadTime: string | undefined;
  averageSpeed: number;
  totalDistance: number;
  eightHoursBreak: number;
  oneHoursBreak: number;
  remainingWorkHours: string;
  remainingTime: ITime | null;
  driving: IDriving | null;
  duration: ITime | null;
  type: EnumCargoType;
}

export type ITime = { hours: number; minutes: number; second?: number; totalInSeconds?: number; }

export type IDriving = ITime & { durationInSeconds: number; }

export interface ICalculateCargo {
  remainingTime: ITime | null;
  driving: IDriving | null;
  duration: ITime | null;
  oneHoursBreak: number;
  elevenHoursBreak: number;
  totalDistance: number;
}

export interface IParams {
  params: { id: string; };
}

export interface ICargoResponse {
  data: ICargo[];
  total: number;
}

export interface IMetadataParams {
  params: { id: string; };
  searchParams: { [key: string]: string | string[] | undefined; };
}

export type IOption = {
  label: string;
  value: string;
}

export interface IUnload {
  formik: FormikProps<ICargo>;
}

export enum EnumUserRole {
  'user' = 'user',
  'admin' = 'admin',
}
