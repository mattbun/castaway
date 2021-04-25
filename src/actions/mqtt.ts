import * as mqtt from 'async-mqtt';
import { CastClientCallbacks } from '../cast/client';
import { ArgumentParser, Arguments } from './types';

export class MqttAction implements CastClientCallbacks, ArgumentParser {
  broker: string;
  topic: string;
  onStartMessage: string;
  onEndMessage: string;

  async onStart() {
    console.log(this.onStartMessage);
    if (!this.onStartMessage) {
      return;
    }

    console.log('onStart');

    try {
      const client = await mqtt.connectAsync(this.broker);
      await client.publish(this.topic, this.onStartMessage);
      await client.end();
    } catch (error) {
      console.error(error);
    }
  }

  async onEnd() {
    console.log(this.onEndMessage);
    if (!this.onEndMessage) {
      return;
    }

    console.log('onEnd');
    try {
      const client = await mqtt.connectAsync(this.broker);
      await client.publish(this.topic, this.onEndMessage);
      await client.end();
    } catch (error) {
      console.error(error);
    }
  }

  onParseArguments(args: Arguments) {
    const argv = args
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

    this.broker = argv['mqtt-broker'];
    this.topic = argv['mqtt-topic'];
    this.onStartMessage = argv['mqtt-message-on-start'];
    this.onEndMessage = argv['mqtt-message-on-end'];
  }

  isReady() {
    return !!this.broker;
  }
}
