import './style.scss';
import { createHeader } from './components/header/header';
import { Garage } from './components/garage/garage';
import { Game } from './components/game/game';
import { Settings } from './components/settings/settings';
import { Pagination } from './components/pagination/pagination';
import { store } from './utils/store';
import { garageController } from './components/garage/controller';
import { ee } from './utils/eventEmitter';
import { ModalWin } from './components/modalWin/modalWin';

export default async function initApp(): Promise<void> {
  createHeader();

  const mainNode = document.querySelector('.main') as HTMLElement;

  const game = new Game(store, garageController);

  await game.loadCars(1, 7);

  const garage = new Garage(store.cars, game);
  const garageHtml = garage.render();

  const settings = new Settings(store.cars, game);
  const settingsHtml = settings.render();

  const pagination = new Pagination(game);
  const paginationHtml = pagination.render({ carsCount: store.carsCount, activePage: 1 });

  game.insertHtml(
    [settingsHtml, garageHtml, paginationHtml],
    mainNode,
    'beforeend',
  );

  ee.on('garage:rerender', () => {
    game.rerender([new Garage(store.cars, game).render()]);
  });
  ee.on('car:edit', (car) => {
    game.rerender([
      new Settings(store.cars, game).render({
        carEditColorPickerValue: car.color,
        carEditInputValue: car.name,
        carEditingId: car.id,
      }),
    ]);
  });
  ee.on('settings:rerender', () => {
    game.rerender([
      new Settings(store.cars, game).render(),
    ]);
  });
  ee.on('pagination:rerender', ({ carsCount, activePage }) => {
    game.rerender([new Pagination(game).render({ carsCount, activePage })]);
  });
  ee.on('modal:open', (modal) => {
    game.modalOpen(modal);
  });
  ee.on('modal:close', (selector: string) => {
    game.modalClose(selector);
  });
  ee.on('car:finished', async (car) => {
    store.setCarFinished(car);

    console.log(store.carFinished);
    const winner = await game.getWinner(car.id);

    if (winner) {
      await game.updateWinner({
        id: car.id,
        wins: winner.wins + 1,
        time: Math.min(winner.time, car.time),
      });
    }

    await game.createWinner({
      id: car.id,
      wins: 1,
      time: car.time,
    });

    const modalWin = new ModalWin();
    const modalWinHtml = modalWin.render({
      onClose: () => {
        game.modalClose('.modal-win');
      },
      isOpen: true,
      winnerName: car.name,
      time: car.time,
    });

    ee.emit('modal:open', [modalWinHtml]);
  });
}

initApp();
