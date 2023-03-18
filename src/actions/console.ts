import { CastawayAction } from './types.js';

export class ConsoleAction implements CastawayAction {
  enableOnStart: boolean = false;
  enableOnEnd: boolean = false;

  constructor({
    enableOnStart,
    enableOnEnd,
  }: {
    enableOnStart: boolean;
    enableOnEnd: boolean;
  }) {
    this.enableOnStart = enableOnStart;
    this.enableOnEnd = enableOnEnd;
  }

  async onStart() {
    if (this.enableOnStart) {
      console.log('onStart');
    }
  }

  async onEnd() {
    if (this.enableOnEnd) {
      console.log('onEnd');
    }
  }

  isConfigured() {
    return this.enableOnStart || this.enableOnEnd;
  }
}
