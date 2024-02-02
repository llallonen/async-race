import { DSL } from '../../utils/parser';
import { IView, RenderFunctionCtx } from '../../utils/view';
import { ISettingsRenderFunctionData, Settings } from './settings';
import { template } from './template';

type THandleFieldUpdateFn = (field: string, payload: string) => void;

interface ISettingsViewRenderFunctionData {
  handleCarColorPicked: THandleFieldUpdateFn;
  handleCarColorUpdated: THandleFieldUpdateFn;
  handleCarNameSelected: THandleFieldUpdateFn;
  handleCarNameUpdated: THandleFieldUpdateFn;
}

export type TSettingsViewRenderProps = ISettingsViewRenderFunctionData &
Omit<ISettingsRenderFunctionData, 'carEditingId'> &
Pick<
Settings,
| 'handleStartRaceButtonClick'
| 'handleResetRaceButtonClick'
| 'handleCreateCarButtonClick'
| 'handleUpdateCarButtonClick'
| 'handleGenerate100CarsButtonClick'
>;

export class SettingsView implements IView {
  render(ctx: RenderFunctionCtx<ISettingsViewRenderFunctionData>): DSL {
    return template(ctx);
  }
}
