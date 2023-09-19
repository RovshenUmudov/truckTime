import { IErrorResponse, IFetchInit, IFetchResult } from '@/types';
import { capitalizeFirstLetter } from '@/utils/index';

/** Response, QueryParams, RequestBody, Error */
export const fetchAPI = async <Response = undefined, Params = undefined, Body = undefined, Error = IErrorResponse>(
  path: string,
  params: Params,
  init: IFetchInit<Body> = { method: 'GET' },
): Promise<IFetchResult<Response, Error>> => {
  const { accessToken, removeContentType, emptyResponse } = init;

  const result: IFetchResult<Response, Error> = {
    data: null,
    error: null,
  };

  const headers: Record<string, string> = {};

  if (!removeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const searchParams = params ? `?${new URLSearchParams(params).toString()}` : '';
  const url = `${process.env.NEXT_PUBLIC_API_URL + path + searchParams}`;

  const getRequestBody = () => {
    if (removeContentType && init.body) {
      return init.body as BodyInit;
    }

    if (init.body) {
      return JSON.stringify(init.body);
    }

    return undefined;
  };

  const response = await fetch(url, {
    ...init,
    body: getRequestBody(),
    headers,
  });

  let data;

  if (!response.ok || (response.statusText !== 'No Content' && !emptyResponse)) {
    data = await response.json();
  }

  if (!response.ok) {
    return { ...result, error: data as Error };
  }

  return { ...result, data: data as Response };
};

export const getMessageInError = (message: string | string[] | undefined): string => {
  if (Array.isArray(message)) {
    return capitalizeFirstLetter(message?.join(' '));
  }

  return capitalizeFirstLetter(message || 'Something went wrong!');
};
