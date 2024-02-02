import { CarModel } from '../../api/car.model';
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
} from '../../api/garageApi/garageApi';
import { CarModels } from '../../interfaces';
import { createRandomCarName } from '../../utils/createRandomCarName';
import { createRandomColor } from '../../utils/createRandomColor';

export class GarageController {
  async loadCars(page = 1, limit = 7): Promise<CarModels> {
    try {
      const result = await getCars(page, limit);

      return {
        items: result.items.map((car) => new CarModel(car)),
        count: result.count,
      };
    } catch (e) {
      return {
        items: [],
        count: 0,
      };
    }
  }

  async createCar(name: string, color: string) {
    try {
      const car = await createCar({ name, color });
      return new CarModel(car);
    } catch (e) {
      throw e;
    }
  }

  generateCar() {
    const id = 0;
    const name = createRandomCarName();
    const color = createRandomColor();
    const car = { id, name, color };
    return new CarModel(car);
  }

  async updateCar(id: number, name: string, color: string) {
    try {
      const car = await updateCar(id, { name, color });
      return new CarModel(car);
    } catch (e) {
      throw e;
    }
  }

  async deleteCar(id: number) {
    try {
      return await deleteCar(id);
    } catch (e) {
      throw e;
    }
  }
}

export const garageController = new GarageController();
