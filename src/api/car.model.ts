import { IGetCarResponse } from './garageApi/types';

export type TCar = IGetCarResponse & { velocity?: number, finishedTime?: number | null };

export class CarModel {
  id: number;

  name: string;

  color: string;

  speed: number;

  finishedTime: number | null;

  constructor(car: TCar) {
    this.id = car.id;
    this.name = car.name;
    this.color = car.color ?? '#ffffff';
    this.speed = car.velocity ?? 0;
    this.finishedTime = car.finishedTime || null;
  }
}
