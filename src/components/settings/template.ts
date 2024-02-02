import { TSettingsViewRenderProps } from './view';
import { ColorPicker } from '../colorPicker/colorPicker';
import { Input } from '../input/input';
import { DSL } from '../../utils/parser';

export const template = (ctx: TSettingsViewRenderProps): DSL => {
  const createCarNameInput = new Input({
    className: ['create__input', 'input', 'input--text'],
    onBlur: (value) => ctx.handleCarNameSelected('carName', value),
    onInput: (value) => ctx.handleCarNameSelected('carName', value),
  });
  const edutCarNameInput = new Input({
    value: ctx.carEditInputValue,
    className: ['create__input', 'input', 'input--text'],
    onBlur: (value) => ctx.handleCarNameUpdated('carUpdatingName', value),
    onInput: (value) => ctx.handleCarNameUpdated('carUpdatingName', value),
  });

  const createCarColorPicker = new ColorPicker({
    onPicked: (value) => ctx.handleCarColorPicked('carColor', value),
  });
  const editCarColorPicker = new ColorPicker({
    value: ctx.carEditColorPickerValue ?? '#187607',
    onPicked: (value) => ctx.handleCarColorUpdated('carUpdatingColor', value),
  });

  return [
    'div',
    { class: 'settings container' },
    [
      [
        'div',
        { class: 'setting__item settings__create' },
        [
          [
            'div',
            { class: 'setting__choose' },
            [createCarNameInput.render(), createCarColorPicker.render()],
          ],
          [
            'button',
            {
              class: 'button button--create',
              listeners: {
                onclick: ctx.handleCreateCarButtonClick,
              },
            },
            'Create',
          ],
        ],
      ],

      [
        'div',
        { class: 'setting__item settings__create' },
        [
          [
            'div',
            { class: 'setting__choose' },
            [edutCarNameInput.render(), editCarColorPicker.render()],
          ],
          [
            'button',
            {
              class: 'button button--create',
              listeners: {
                onclick: ctx.handleUpdateCarButtonClick,
              },
            },
            'Update',
          ],
        ],
      ],
      [
        'div',
        { class: 'setting__item ettings__buttons' },
        [
          [
            'button',
            {
              class: 'button button--race',
              listeners: {
                onclick: ctx.handleStartRaceButtonClick,
              },
            },
            'Race',
          ],
          [
            'button',
            {
              class: 'button button--reset',
              listeners: {
                onclick: ctx.handleResetRaceButtonClick,
              },
            },
            'Reset',
          ],
          [
            'button',
            {
              class: 'button button--gen',
              listeners: {
                onclick: ctx.handleGenerate100CarsButtonClick,
              },
            },
            'Generate Cars',
          ],
        ],
      ],
    ],
  ];
};
