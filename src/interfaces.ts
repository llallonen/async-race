import { CarModel, TCar } from './api/car.model';

export type TCars = TCar[];

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinners {
  items: IWinner[];
  count: string;
}

export type WithIdKey<T> = T & { id: number };

export interface IAnimation extends Animation {
  carId: number;
}

export type CarModels = {
  items: CarModel[];
  count: number;
};
