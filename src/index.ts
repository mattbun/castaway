import { CastClient } from './cast/client';
import { ConsoleAction } from './actions/console';
import * as yargs from 'yargs';

const args = yargs.env('CASTAWAY').option('host', {
  describe: 'cast device to watch',
  type: 'string',
  demandOption: true,
});

const potentialActions = [new ConsoleAction()];

potentialActions.forEach((action) => action.onParseArguments(args));
const action = potentialActions.find((action) => action.isReady());
if (!action) {
  throw Error('Please configure something to happen on cast events');
}

const { host } = args.argv;

const client = new CastClient(
  {
    host,
  },
  action
);
client.start();
