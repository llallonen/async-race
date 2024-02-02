import { DSL } from '../../utils/parser';
import { IView } from '../../utils/view';
import { TCarCtx } from './car';
import { template } from './template';

export class CarView implements IView {
  car: TCarCtx;

  constructor(car: TCarCtx) {
    this.car = car;
  }

  render(): DSL {
    return template(this.car);
  }
}
