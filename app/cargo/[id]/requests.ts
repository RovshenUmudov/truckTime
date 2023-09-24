import { fetchAPI } from '@/utils/fetch';
import { ICargo } from '@/types';

export async function getCargoById(id: string, token: string) {
  const res = await fetchAPI<ICargo, undefined>(
    `/cargo/${id}`,
    undefined,
    {
      method: 'GET',
      accessToken: token,
    },
  );

  return res;
}

export async function updateCargoById(token: string, data: ICargo) {
  const res = await fetchAPI<ICargo, undefined, ICargo>(
    `/cargo/${data._id}`,
    undefined,
    {
      method: 'POST',
      accessToken: token,
      body: data,
    },
  );

  return res;
}
