import { fetchAPI } from '@/utils/fetch';
import { ICargo, ICargoResponse } from '@/types';

export async function getCargoById(id: string, token: string) {
  const res = await fetchAPI<ICargo, undefined>(
    `/cargos/${id}`,
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
    `/cargos/${data._id}`,
    undefined,
    {
      method: 'POST',
      accessToken: token,
      body: data,
    },
  );

  return res;
}

export async function deleteCargo(token: string, id: string) {
  const res = await fetchAPI(
    `/cargos/${id}`,
    undefined,
    {
      method: 'DELETE',
      accessToken: token,
    },
  );

  return res;
}

export async function createCargo(data: ICargo, token: string) {
  const res = await fetchAPI<ICargo, undefined, ICargo>(
    '/cargos/new',
    undefined,
    {
      method: 'POST',
      accessToken: token,
      body: data,
    },
  );

  return res;
}

export async function getCargos(token: string, params: Record<string, string>) {
  const res = await fetchAPI<ICargoResponse, Record<string, string>>(
    '/cargos',
    params,
    {
      method: 'GET',
      accessToken: token,
      next: { revalidate: 0 },
    },
  );

  return res;
}
