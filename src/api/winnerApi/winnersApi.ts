import {
  ICreateWinnerRequest,
  IGetWinnerResponse,
  IUpdateWinnerRequest,
} from './types';

export const serv = 'http://127.0.0.1:3000';

export async function getWinner(id: number): Promise<IGetWinnerResponse> {
  const response = await fetch(`${serv}/winners/${id}`);

  return response.json();
}

export async function getWinners(
  page: number,
  sort = 'time',
  order = 'ASC',
  limit = 10,
) {
  const response = await fetch(`${serv}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function createWinner(
  data: ICreateWinnerRequest,
): Promise<IGetWinnerResponse> {
  const response = await fetch(`${serv}/winners`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function updateWinner(
  id: number,
  data: IUpdateWinnerRequest,
): Promise<IGetWinnerResponse> {
  const response = await fetch(`${serv}/winners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function deleteWinner(id: number) {
  try {
    await fetch(`${serv}/winners/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (e) {
    return false;
  }
}
