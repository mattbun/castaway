import { CastawayAction } from './types.js';
import { exec } from 'child_process';

export class CommandAction implements CastawayAction {
  commandOnStart: string;
  commandOnEnd: string;

  constructor({
    commandOnStart,
    commandOnEnd,
  }: {
    commandOnStart: string;
    commandOnEnd: string;
  }) {
    this.commandOnStart = commandOnStart;
    this.commandOnEnd = commandOnEnd;
  }

  async onStart() {
    if (this.commandOnStart) {
      const command = exec(this.commandOnStart);
      command.stdout.pipe(process.stdout);
      command.stderr.pipe(process.stderr);
    }
  }

  async onEnd() {
    if (this.commandOnEnd) {
      const command = exec(this.commandOnEnd);
      command.stdout.pipe(process.stdout);
      command.stderr.pipe(process.stderr);
    }
  }

  isConfigured() {
    return !!this.commandOnStart || !!this.commandOnEnd;
  }
}
