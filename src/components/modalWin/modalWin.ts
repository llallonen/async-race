import { Game } from '../game/game';

export interface IModalWinViewRenderFunctionData {
  winnerName: string;
  time: number;
  isOpen: boolean;
  onClose: VoidFunction;
}

export class ModalWin {
  render({
    winnerName,
    time,
    isOpen = false,
    onClose = () => ({}),
  }: IModalWinViewRenderFunctionData) {
    const timeCeiled = +(time / 1000).toFixed(2);

    return [
      'div',
      { class: `modal__outer modal-win ${isOpen ? 'is-open' : ''}` },
      [
        [
          'div',
          { class: 'modal' },
          [
            [
              'div',
              { class: 'modal__content' },
              [
                [
                  'span',
                  { class: 'modal__cross', listeners: { onclick: onClose } },
                  '✖',
                ],
                ['h2', { class: 'modal__head' }, 'Winner!'],
                [
                  'p',
                  { class: 'modal__text' },
                  `${winnerName} finished in ${timeCeiled} seconds!`,
                ],
              ],
            ],
          ],
        ],
      ],
    ];
  }
}
