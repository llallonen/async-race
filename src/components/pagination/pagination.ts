import { range } from '../../utils/range';
import { Game } from '../game/game';

export interface IPaginationViewRenderFunctionData {
  activePage: number;
  carsCount: number;
}

export class Pagination {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  handleClickOnPaginationItem = (page: number) => {
    this.game.switchPage(page);
  };

  render({ activePage, carsCount }: IPaginationViewRenderFunctionData) {
    const pages = Math.ceil(carsCount / 7);

    const paginationItems = range(pages).map((pageNumber) => {
      const activePageClass = activePage === pageNumber ? 'pagination__item--active' : '';

      return [
        'div',
        {
          class: `pagination__item pagination__item-${pageNumber} ${activePageClass}`,
          listeners: {
            onclick: () => this.handleClickOnPaginationItem(pageNumber),
          },
        },
        pageNumber.toString(),
      ];
    });

    return ['div', { class: 'pagination container' }, paginationItems];
  }
}
