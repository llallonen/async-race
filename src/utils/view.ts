import { TSettingsViewRenderProps } from '../components/settings/view';
import { DSL } from './parser';

// export interface IView {
//   render: RenderFunction
// }

export interface IView {
  render<Ctx>(ctx: RenderFunctionCtx<Ctx>): DSL
}

export type RenderFunctionCtx<Ctx> = {
  ctx?: infer Ctx;
};
export type RenderFunction = <Ctx>(ctx: RenderFunctionCtx<Ctx>) => DSL;
