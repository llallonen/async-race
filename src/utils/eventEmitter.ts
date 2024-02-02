type TCallback = (...args: unknown[]) => unknown;
type TEmitPayload = Array<unknown>;
type TListener = {
  name: string;
  callback: TCallback
};

export class EventEmitter {
  listeners: TListener[] = [];

  emit(eventName: string, data: TEmitPayload = []) {
    this.listeners
      .filter(({ name }) => name === eventName)
      .forEach(({ callback }) => setTimeout(() => {
        callback.apply(this, [...data]);
      }, 0));
  }

  on(name: string, callback: TCallback) {
    if (typeof callback === 'function' && typeof name === 'string') {
      this.listeners.push({ name, callback });
    }
  }

  off(eventName: string, callback: TCallback) {
    this.listeners = this.listeners.filter(
      (listener) => !(listener.name === eventName && listener.callback === callback),
    );
  }

  destroy() {
    this.listeners.length = 0;
  }
}

export const ee = new EventEmitter();
