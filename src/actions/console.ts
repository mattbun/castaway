import { CastClientCallbacks } from '../cast/client';
import { ArgumentParser, Arguments } from './types';

export class ConsoleAction implements CastClientCallbacks, ArgumentParser {
  enableOnStart: boolean = false;
  enableOnEnd: boolean = false;

  onStart() {
    if (this.enableOnStart) {
      console.log('onStart');
    }
  }

  onEnd() {
    if (this.enableOnEnd) {
      console.log('onEnd');
    }
  }

  onParseArguments(args: Arguments) {
    const argv = args
      .option('console-on-start', {
        describe: 'log message to console on start',
        type: 'boolean',
      })
      .option('console-on-end', {
        describe: 'log message to console on end',
        type: 'boolean',
      }).argv;

    this.enableOnStart = argv['console-on-start'];
    this.enableOnEnd = argv['console-on-end'];
  }

  isReady() {
    return this.enableOnStart || this.enableOnEnd;
  }
}
