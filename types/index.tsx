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
}

export interface ICargoValues {
    title: string;
    startDate: Date | undefined;
    startTime: string | undefined;
    unloadDate: Date | undefined;
    unloadTime: string | undefined;
    averageSpeed: number;
    distance: number | null;
    eightHoursBreak: number;
    oneHoursBreak: number;
    remainingWorkHours: string | undefined;
}

export type ITime = { hours: number; minutes: number; }

export type IDriving = ITime & {durationInSeconds: number;}

export interface ICalculateCargo {
    remainingTime: ITime | null;
    driving: IDriving | null;
    duration: ITime | null;
    oneHoursBreak: number;
    elevenHoursBreak: number;
}
