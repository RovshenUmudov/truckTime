import { fetchAPI } from '@/utils/fetch';
import { IUser } from '@/types';

export async function postProfile(data: Partial<IUser>, token: string) {
  const res = await fetchAPI<IUser, undefined, Partial<IUser>>(
    '/users/me',
    undefined,
    {
      method: 'POST',
      accessToken: token,
      body: data,
    },
  );

  return res;
}
