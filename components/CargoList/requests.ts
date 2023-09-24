import { fetchAPI } from '@/utils/fetch';
import { ICargo } from '@/types';

export async function getCargos(token: string) {
  const res = await fetchAPI<ICargo[], undefined>(
    '/cargo',
    undefined,
    {
      method: 'GET',
      accessToken: token,
      next: { revalidate: 0 },
    },
  );

  return res;
}
