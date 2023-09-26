import { fetchAPI } from '@/utils/fetch';
import { ICargoResponse } from '@/types';

export async function getCargos(token: string, limit?: number) {
  const res = await fetchAPI<ICargoResponse, { limit?: number; }>(
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
