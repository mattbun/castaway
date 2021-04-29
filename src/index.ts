import { CastClient } from './cast/client';
import { CastawayAction } from './actions/types';
import { ConsoleAction } from './actions/console';
import { MqttAction } from './actions/mqtt';
import * as yargs from 'yargs';

const argv = yargs
  .env('CASTAWAY')
  .option('host', {
    describe: 'cast device to watch',
    type: 'string',
    demandOption: true,
  })
  .option('debug', {
    describe: 'print all cast events to console',
    type: 'boolean',
  })
  .option('console-on-start', {
    describe: 'log message to console on start',
    type: 'boolean',
  })
  .option('console-on-end', {
    describe: 'log message to console on end',
    type: 'boolean',
  })
  .option('mqtt-broker', {
    describe: 'the address of a mqtt broker',
    type: 'string',
  })
  .option('mqtt-topic', {
    describe: 'mqtt topic to post to',
    type: 'string',
  })
  .option('mqtt-message-on-start', {
    describe: 'message to post on start',
    type: 'string',
  })
  .option('mqtt-message-on-end', {
    describe: 'message to post on end',
    type: 'string',
  }).argv;

const actions: Array<CastawayAction> = [
  new MqttAction({
    broker: argv['mqtt-broker'],
    topic: argv['mqtt-topic'],
    onStartMessage: argv['mqtt-message-on-start'],
    onEndMessage: argv['mqtt-message-on-end'],
  }),
  new ConsoleAction({
    enableOnStart: argv['console-on-start'],
    enableOnEnd: argv['console-on-end'],
  }),
];

const activeAction = actions.find((action) => action.isConfigured());
if (!activeAction) {
  throw Error('Please configure something to happen on cast events');
}

const client = new CastClient(
  {
    host: argv.host,
    enableDebugLogs: argv.debug,
  },
  activeAction
);
client.start();
