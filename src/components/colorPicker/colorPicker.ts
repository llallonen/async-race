import { DSL, TagAttributes } from '../../utils/parser';

type TOnPickedCallback = (color: string) => void;

interface IColorProps {
  onPicked?: TOnPickedCallback | null;
  value?: string
}

export class ColorPicker {
  value = '#f6b73c';

  onPicked?: TOnPickedCallback | null;

  constructor({ onPicked, value }: IColorProps) {
    this.onPicked = onPicked ?? null;
    this.value = value ?? '#f6b73c';
  }

  onBlur = (event: FocusEvent) => {
    if (event instanceof FocusEvent) {
      if (event.target instanceof HTMLInputElement) {
        const color = event.target.value;
        this.value = color;
        this.onPicked && this.onPicked(color);
      }
    }
  };

  update(color: string) {
    if (!color) {
      throw new Error('No color provided');
    }

    this.value = color;

    try {
      const input = document.querySelector('.input--color') as HTMLInputElement;

      input.value = color;
    } catch (e) {
      throw new Error('Couldnt find a color input Node');
    }
  }

  render(): DSL {
    return [
      'input',
      {
        type: 'color',
        class: 'create__input input input--color',
        value: this.value,
        listeners: {
          onblur: this.onBlur,
        },
      } as TagAttributes,
    ];
  }
}
