import { fetchAPI } from '@/utils/fetch';
import { ICargo } from '@/types';

export async function getCargos(token: string, limit?: number) {
  const res = await fetchAPI<ICargo[], { limit?: number; }>(
    '/cargos',
    { limit: limit || undefined },
    {
      method: 'GET',
      accessToken: token,
      next: { revalidate: 0 },
    },
  );

  return res;
}
