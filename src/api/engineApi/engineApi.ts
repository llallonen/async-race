import { WithIdKey } from '../../interfaces';
import { ISwitchToDriveRequest, IStartEndineRequest } from './types';

export const serv = 'http://127.0.0.1:3000';

export async function startStopCarsEngine(
  id: number,
  status: 'started' | 'stopped',
): Promise<WithIdKey<IStartEndineRequest>> {
  const response = await fetch(
    `${serv}/engine?${
      new URLSearchParams({
        id: String(id),
        status,
      })}`,
    {
      method: 'PATCH',
    },
  );

  const result = await response.json();

  return { id, ...result };
}

export async function switchToDriveMode(
  id: number,
): Promise<WithIdKey<ISwitchToDriveRequest>> {
  try {
    const response = await fetch(
      `${serv}/engine?${
        new URLSearchParams({
          id: String(id),
          status: 'drive',
        })}`,
      {
        method: 'PATCH',
      },
    );

    const res = await response.json();
    console.log(res);
    return { id, status: true };
  } catch (e) {
    return { id, status: false };
  }
}
