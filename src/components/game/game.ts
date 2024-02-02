import { CarModel } from '../../api/car.model';
import {
  startStopCarsEngine,
  switchToDriveMode,
} from '../../api/engineApi/engineApi';
import { Race } from '../../race';
import { buildClassName } from '../../utils/buildClassName';
import { ee } from '../../utils/eventEmitter';
import { parse } from '../../utils/parser';
import { IStore } from '../../utils/store';
import { GarageController } from '../garage/controller';

const filterFullfilledResults = <T>(
  arr: Array<PromiseSettledResult<T>>,
): Array<PromiseFulfilledResult<T>> => arr.filter(
    (item: PromiseSettledResult<T>): item is PromiseFulfilledResult<T> => item.status === 'fulfilled',
  );

export class Game {
  store: IStore;

  trackDistance = 500000;

  garage: GarageController;

  constructor(store: IStore, garage: GarageController) {
    this.store = store;
    this.garage = garage;
  }

  stopCar(id: number) {
    Race.stopCar(id);
  }

  async createCar(name: string, color: string) {
    try {
      const car = await this.garage.createCar(name, color);
      await this.loadCars(this.store.currentPage);
      ee.emit('garage:rerender');
    } catch (e) {
      console.error(e);
    }
  }

  async create100Cars() {
    try {
      const carArr = new Array(100).fill(0).map((el) => this.garage.generateCar());
      await Promise.all(
        carArr.map((car) => this.garage.createCar(car.name, car.color)),
      );
      await this.loadCars(this.store.currentPage);
      ee.emit('garage:rerender');
    } catch (e) {
      console.error(e);
    }
  }

  async updateCar(id: number, name: string, color: string) {
    const car = await this.garage.updateCar(id, name, color);
    this.store.updateCar(car);
    ee.emit('garage:rerender');
    ee.emit('car:edit', [{}]);
  }

  selectCar(car: CarModel) {
    this.store.selectCar(car);
    ee.emit('car:edit', [car]);
  }

  async deleteCar(id: number) {
    const deleted = await this.garage.deleteCar(id);

    if (deleted) {
      if (this.store.cars.length === 1) {
        this.switchPage(
          this.store.currentPage - 1 === 0 ? 1 : this.store.currentPage - 1,
        );
      }
      this.store.deleteCar(id);
      ee.emit('garage:rerender');
      ee.emit('pagination:rerender', [
        {
          carsCount: this.store.carsCount,
          activePage: this.store.currentPage,
        },
      ]);
    }
  }

  async switchPage(page: number) {
    await this.loadCars(page);
    this.store.setCarFinished(null);
    ee.emit('garage:rerender');
    ee.emit('pagination:rerender', [
      {
        carsCount: this.store.carsCount,
        activePage: this.store.currentPage,
      },
    ]);
  }

  async loadCars(page = 1, limit = 7) {
    const cars = await this.garage.loadCars(page, limit);
    this.store.updateCarsCount(cars.count);
    this.store.updateCars(cars.items);
    this.store.updateCurrentPage(page);

    ee.emit('settings:rerender');
    ee.emit('pagination:rerender', [
      {
        carsCount: this.store.carsCount,
        activePage: page,
      },
    ]);
  }

  async start(cars: CarModel[]) {
    this.store.setCarFinished(null);
    const race = new Race(this.store);

    const ids = cars.map((car) => car.id);
    const startedCars = await Promise.allSettled(
      ids.map((id) => startStopCarsEngine(id, 'started')),
    );

    const carsStartStatesFulfilled = filterFullfilledResults(startedCars);

    this.store.updateCars(
      cars.map((car) => {
        const newCar = carsStartStatesFulfilled.find(
          (carState) => carState.value.id === car.id,
        );
        return new CarModel({ ...car, velocity: newCar?.value.velocity ?? 0 });
      }),
    );

    const startedCarsIds = filterFullfilledResults(startedCars).map((state) => state.value.id);

    race.start(
      this.store.cars.filter((car) => cars.map((car) => car.id).includes(car.id)),
    );

    startedCarsIds.forEach((id) => {
      switchToDriveMode(id).then(({ status, id }) => {
        if (!status && status === false) {
          this.stopCar(id);
        }
      });
    });
  }

  async stop(cars: CarModel[]) {
    const ids = cars.map((car) => car.id);
    const startedCars = await Promise.allSettled(
      ids.map((id) => startStopCarsEngine(id, 'started')),
    );

    console.log('reset');
    const carsStartStatesFulfilled = filterFullfilledResults(startedCars);

    const startedCarsIds = filterFullfilledResults(startedCars).map((state) => state.value.id);

    startedCarsIds.forEach((id) => {
      switchToDriveMode(id).then(({ status, id }) => {
        this.stopCar(id);
      });
    });
  }

  insertHtml(
    dsl: unknown[],
    node: Element | null,
    position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend',
  ) {
    const html = parse(dsl);

    html.forEach((item: Element) => {
      node?.insertAdjacentElement(position, item);
    });
  }

  rerender(dsl: Element[]) {
    const [rootNode] = parse(dsl);

    const className = buildClassName(rootNode.className.split(' '));
    const node = document.querySelector(className);

    try {
      node?.replaceWith(rootNode);
    } catch (e) {
      console.log(e);
    }
  }

  modalOpen(modalDsl: unknown) {
    this.insertHtml([modalDsl], document.querySelector('.main'), 'beforeend');
  }

  modalClose(selector: string) {
    document.querySelector(selector)?.remove();
  }

  getWinner() {

  }

  createWinner() {

  }

  updateWinner() {

  }
}
