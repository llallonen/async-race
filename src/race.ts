import { CarModel } from './api/car.model';
import { IAnimation } from './interfaces';
import { ee } from './utils/eventEmitter';
import { IStore } from './utils/store';

const animations: IAnimation[] = [];

export class Race {
  store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  start(cars: CarModel[]) {
    const nodes = cars.map((car) => ({
      carId: car.id,
      node: document.querySelector(`.car.car-${car.id} .car__vehicle`),
    }));

    nodes.forEach(({ node, carId }) => {
      const car = cars.find((car) => car.id === carId);
      if (car) {
        const animation = node?.animate(
          [
            // keyframes
            { transform: 'translateX(0px)' },
            { transform: 'translateX(calc(100% - 150px))' },
          ],
          {
            // timing options
            duration: (1000 * 1050) / car.speed ?? 1,
            iterations: 1,
            fill: 'forwards',
          },
        );

        if (animation) {
          animation.onfinish = (e) => {
            if (!this.store.carFinished) {
              ee.emit('car:finished', [{
                ...car,
                time: e.currentTime,
              }]);
            }
          };

          animations.push(
            Object.assign(
              animation,
              {
                carId,
              },
            ) as IAnimation,
          );
        }
      }
    });
  }

  static stopCar(carId: CarModel['id']) {
    const animation = animations.find(
      (animation) => animation.carId === carId,
    );

    if (animation) {
      animation?.pause();
    }
  }
}
