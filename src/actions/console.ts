import { CastClientCallbacks } from '../cast/client';

export class ConsoleAction implements CastClientCallbacks {
  onStart() {
    console.log('onStart');
  }

  onEnd() {
    console.log('onEnd');
  }
}
