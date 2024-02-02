import { buildClassName } from '../../utils/buildClassName';
import { DSL, TagAttributes } from '../../utils/parser';

type TOnBlurChangeCallback = (value: string) => void;

interface IInputProps {
  value?: string;
  className?: string[];
  onInput?: TOnBlurChangeCallback;
  onBlur?: TOnBlurChangeCallback;
}

export class Input {
  value = '';

  className: string[] = [''];

  onChangeCallback: TOnBlurChangeCallback | null;

  onBlurCallback: TOnBlurChangeCallback | null;

  constructor({
    value, className, onInput, onBlur,
  }: IInputProps) {
    this.value = value ?? '';
    this.className = className ?? [''];
    this.onChangeCallback = onInput ?? null;
    this.onBlurCallback = onBlur ?? null;
  }

  onInput = (event: InputEvent) => {
    if (event instanceof InputEvent) {
      if (event.target instanceof HTMLInputElement) {
        const { value } = event.target;
        this.value = value;
        this.onChangeCallback && this.onChangeCallback(value);
      }
    }
  };

  onBlur = (event: FocusEvent) => {
    if (event instanceof FocusEvent) {
      if (event.target instanceof HTMLInputElement) {
        const { value } = event.target;
        this.value = value;
        this.onBlurCallback && this.onBlurCallback(value);
      }
    }
  };

  update = (value: string) => {
    if (!value) {
      throw new Error('No value provided');
    }

    this.value = value;

    try {
      const input = document.querySelector(buildClassName(this.className)) as HTMLInputElement;

      input.value = value;
    } catch (e) {
      throw new Error('Couldnt find an input Node');
    }
  };

  render(): DSL {
    return [
      'input',
      {
        type: 'text',
        class: this.className.join(' '),
        value: this.value,
        listeners: {
          onblur: this.onBlur,
          oninput: this.onInput,
        },
      } as TagAttributes,
    ];
  }
}
