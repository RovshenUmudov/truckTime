import { IToken, IUser } from '@/types';
import { fetchAPI } from '@/utils/fetch';

export const userMe = async (token: IToken | undefined, cache?: RequestCache, next?: NextFetchRequestConfig) => {
  if (!token) return null;

  const res = await fetchAPI<IUser>('users/me', undefined, {
    method: 'GET',
    accessToken: token.token,
    cache: cache || undefined,
    next: next || undefined,
  });

  if (res.data) return res.data;

  return null;
};
