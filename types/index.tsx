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
    endDate: Date | undefined;
    endTime: string | undefined;
    averageSpeed: number;
    distance: number | string;
    longRest: number | string;
    shortRest: number | string;
    remainingWorkHours: number | string;
}
