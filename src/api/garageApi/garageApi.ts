import {
  IGetCarsRequest,
  IGetCarResponse,
  ICreateCarRequest,
  IUpdateCarRequest,
} from './types';

export const serv = 'http://127.0.0.1:3000';

export async function getCars(
  page: number,
  limit: number,
): Promise<IGetCarsRequest> {
  const response = await fetch(`${serv}/garage?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
}

export async function getCar(id: string): Promise<IGetCarResponse> {
  const response = await fetch(`${serv}/garage/${id}`);

  return response.json();
}

export async function createCar(
  data: ICreateCarRequest,
): Promise<IGetCarResponse> {
  const response = await fetch(`${serv}/garage`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function updateCar(
  id: number,
  data: IUpdateCarRequest,
): Promise<IGetCarResponse> {
  const response = await fetch(`${serv}/garage/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function deleteCar(id: number) {
  try {
    await fetch(`${serv}/garage/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (e) {
    return false;
  }
}
