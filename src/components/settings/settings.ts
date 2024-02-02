import { CarModel } from '../../api/car.model';
import { createRandomCarName } from '../../utils/createRandomCarName';
import { createRandomColor } from '../../utils/createRandomColor';
import { Game } from '../game/game';
import { SettingsView, TSettingsViewRenderProps } from './view';

export interface ISettingsRenderFunctionData {
  carEditInputValue: string;
  carEditColorPickerValue: string;
  carEditingId: number;
}

export class Settings {
  game: Game;

  cars: CarModel[];

  carEditingId = 0;

  carName = '';

  carUpdatingName = '';

  carColor = '';

  carUpdatingColor = '';

  constructor(cars: CarModel[], game: Game) {
    this.game = game;
    this.cars = cars;
  }

  handleStartRaceButtonClick = () => {
    this.game.start(this.cars);
  };

  handleResetRaceButtonClick = () => {
    this.game.stop(this.cars);
  };

  handleCreateCarButtonClick = () => {
    let { carName } = this;
    let { carColor } = this;

    if (!this.carName) {
      carName = createRandomCarName();
    }

    if (!this.carColor) {
      carColor = createRandomColor();
    }

    this.game.createCar(carName, carColor);
  };

  handleUpdateCarButtonClick = () => {
    const carName = this.carUpdatingName;
    const carColor = this.carUpdatingColor;
    const carId = this.carEditingId;

    if (!carName || !carColor || !carId) return;

    this.game.updateCar(carId, carName, carColor);
  };

  handleFieldUpdate = (field: string, payload: string) => {
    Object.assign(this, { [field]: payload });
  };

  handleGenerate100CarsButtonClick = () => {
    this.game.create100Cars();
  };

  render(
    {
      carEditInputValue,
      carEditColorPickerValue,
      carEditingId,
    }: ISettingsRenderFunctionData = {
      carEditInputValue: '',
      carEditColorPickerValue: '',
      carEditingId: 0,
    },
  ) {
    this.carUpdatingColor = carEditColorPickerValue;
    this.carUpdatingName = carEditInputValue;
    this.carEditingId = carEditingId;

    return new SettingsView().render({
      ctx: {
        handleStartRaceButtonClick: this.handleStartRaceButtonClick,
        handleResetRaceButtonClick: this.handleResetRaceButtonClick,
        handleCreateCarButtonClick: this.handleCreateCarButtonClick,
        handleCarColorPicked: this.handleFieldUpdate,
        handleCarColorUpdated: this.handleFieldUpdate,
        handleCarNameSelected: this.handleFieldUpdate,
        handleCarNameUpdated: this.handleFieldUpdate,
        handleUpdateCarButtonClick: this.handleUpdateCarButtonClick,
        handleGenerate100CarsButtonClick: this.handleGenerate100CarsButtonClick,
        carEditInputValue,
        carEditColorPickerValue,
      },
    });
  }
}
