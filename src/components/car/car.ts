import { CarModel } from '../../api/car.model';
import { CarView } from './view';

export type TCarCtx = CarModel & {
  handleOnStartOwnRaceButtonClick: (car: CarModel) => void;
  handleOnStopOwnRaceButtonClick: (id: number) => void;
  handleSelectButtonClick: (car: CarModel) => void;
  handleOnDeleteButtonClick: (id: number) => void;
};

export class Car {
  ctx: TCarCtx;

  constructor(ctx: TCarCtx) {
    this.ctx = ctx;
  }

  render() {
    return new CarView(this.ctx);
  }
}
