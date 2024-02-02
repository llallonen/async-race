import { CarModel } from '../api/car.model';

export const currentPageCars = (page: number, cars: CarModel[]) => {
  // page 1
  // from 0
  // page 2
  // from 7
  // page 3
  // from 14

  const max = page * 7;
  const from = page === 1 ? 0 : max - 7;
  const to = from + 7;

  console.log('cars', cars, from, to);
  console.log(cars.slice(from, to));

  return cars.slice(from, to);
};
