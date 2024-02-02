import { DSL, DSLArray } from '../../utils/parser';
import { IView } from '../../utils/view';

export class GarageView implements IView {
  render(views: IView[]): DSL {
    const cars = views.length === 0
      ? [['div', 'No cars in garage']] as DSLArray
      : views.map((view) => view.render());

    return [
      'section',
      { class: 'garage container' },
      cars,
    ];
  }
}
