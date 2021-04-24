import * as yargs from 'yargs';

export type Arguments = typeof yargs;

export interface ArgumentParser {
  onParseArguments: (args: Arguments) => void;
  isReady: () => boolean;
}
