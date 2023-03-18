import { CastClient } from './cast/client.js';
import { CastawayAction } from './actions/types.js';
import { ConsoleAction } from './actions/console.js';
import { MqttAction } from './actions/mqtt.js';
import { WebhookAction } from './actions/webhook.js';
import { CommandAction } from './actions/command.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
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
  })
  .option('webhook-on-start', {
    describe: 'webhook to call on start',
    type: 'string',
  })
  .option('webhook-on-end', {
    describe: 'webhook to call on end',
    type: 'string',
  })
  .option('command-on-start', {
    describe: 'command to run on start',
    type: 'string',
  })
  .option('command-on-end', {
    describe: 'command to run on end',
    type: 'string',
  })
  .parseSync();

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
  new WebhookAction({
    webhookOnStart: argv['webhook-on-start'],
    webhookOnEnd: argv['webhook-on-end'],
  }),
  new CommandAction({
    commandOnStart: argv['command-on-start'],
    commandOnEnd: argv['command-on-end'],
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
