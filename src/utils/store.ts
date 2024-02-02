import { CarModel } from '../api/car.model';

export interface IStoreValues {
  cars: CarModel[];
  currentEditingCar: CarModel | null;
  carsCount: number;
  currentPage: number;
  carFinished: CarModel | null;
}

export interface IStoreSelectors {
  updateCar(car: CarModel): void;
  selectCar(car: CarModel): void;
  deleteCar(id: number): void;
  setCarFinished(car: null | CarModel): void;
  updateCars(cars: CarModel[]): void;
  updateCarsCount(count: number): void;
  updateCurrentPage(page: number): void;
}

export type IStore = IStoreValues & IStoreSelectors;

type TStoreKeys = keyof IStore;

class Store implements IStore, IStoreSelectors {
  cars: CarModel[] = [];

  currentEditingCar: CarModel | null = null;

  carsCount = 0;

  currentPage = 1;

  carFinished: null | CarModel = null;

  update(field: TStoreKeys, payload: IStore[TStoreKeys]) {
    Object.assign(this, { [field]: payload });
  }

  updateCar(car: CarModel) {
    const foundCar = this.cars.find((item) => item.id === car.id);

    if (foundCar) {
      Object.assign(foundCar as CarModel, car);
    }
  }

  updateCars(cars: CarModel[]) {
    this.cars = cars;
    this.cars.sort((carA, carB) => carA.id - carB.id);
  }

  updateCarsCount(count: number) {
    this.update('carsCount', count);
  }

  updateCurrentPage(page: number) {
    this.update('currentPage', page);
  }

  selectCar(car: CarModel) {
    this.update('currentEditingCar', car);
  }

  deleteCar(id: number) {
    const newCars = this.cars.filter((car) => car.id !== id);

    this.updateCars(newCars);
  }

  setCarFinished(car: CarModel | null) {
    this.update('carFinished', car);
  }
}

export const store = new Store();
