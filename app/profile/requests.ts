import { fetchAPI } from '@/utils/fetch';
import { IUserMe } from '@/types';

export async function postProfile(data: Partial<IUserMe>, token: string) {
  const res = await fetchAPI<IUserMe, undefined, Partial<IUserMe>>(
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
