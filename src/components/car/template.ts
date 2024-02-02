import { DSL, TagAttributes } from '../../utils/parser';
import { TCarCtx } from './car';
import { carVehicle } from './carVehicle';

export const template = (ctx: TCarCtx): DSL => [
  'div',
  { class: `car car-${ctx.id}` },
  [
    [
      'div',
      { class: 'car__buttons' },
      [
        [
          'button',
          {
            class: 'button button--select button--s',
            listeners: {
              onclick: () => ctx.handleSelectButtonClick(ctx),
            },
          },
          'Select',
        ],
        ['button', {
          class: 'button button--remove button--s',
          listeners: {
            onclick: () => ctx.handleOnDeleteButtonClick(ctx.id),
          },
        }, 'Remove'],
        ['div', { class: 'car__name' }, ctx.name],
      ],
    ],
    [
      'div',
      { class: 'car__engine-buttons' },
      [
        [
          'button',
          {
            class: 'button button--start button--xs',
            listeners: {
              onclick: () => ctx.handleOnStartOwnRaceButtonClick(ctx),
            },
          },
        ],
        [
          'button',
          {
            class: 'button button--stop button--xs',
            listeners: {
              onclick: () => ctx.handleOnStopOwnRaceButtonClick(ctx.id),
            },
          },
        ],
      ],
    ],
    [
      'div',
      { class: 'car__vehicle' },
      [
        [
          'svg',
          {
            fill: 'string',
            height: '50',
            viewBox: '0 0 1400 450',
            width: '150',
          } as TagAttributes,
          [carVehicle],
        ],
      ],
    ],
    ['div', { class: 'car__track' }],
  ],
];
