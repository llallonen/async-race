import { CarModel } from '../../api/car.model';
import { GarageView } from './view';
import { Car } from '../car/car';
import { Game } from '../game/game';
import { DSL } from '../../utils/parser';

export class Garage {
  public cars: CarModel[] = [];

  game: Game;

  constructor(cars: CarModel[], game: Game) {
    this.cars = cars;
    this.game = game;
  }

  handleOnStartOwnRaceButtonClick = (car: CarModel) => {
    this.game.start([car]);
  };

  handleOnStopOwnRaceButtonClick = (id: number) => {
    this.game.stopCar(id);
  };

  handleSelectButtonClick = (car: CarModel) => {
    this.game.selectCar(car);
  };

  handleOnDeleteButtonClick = (id: number) => {
    this.game.deleteCar(id);
  };

  render(): DSL {
    return new GarageView().render(
      this.cars.map((carModel) => {
        const CarModule = new Car({
          ...carModel,
          handleOnStartOwnRaceButtonClick: this.handleOnStartOwnRaceButtonClick,
          handleOnStopOwnRaceButtonClick: this.handleOnStopOwnRaceButtonClick,
          handleSelectButtonClick: this.handleSelectButtonClick,
          handleOnDeleteButtonClick: this.handleOnDeleteButtonClick,
        });

        return CarModule.render();
      }),
    );
  }
}
