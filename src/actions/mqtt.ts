import * as mqtt from 'async-mqtt';
import { CastawayAction } from './types';

export class MqttAction implements CastawayAction {
  broker: string;
  topic: string;
  onStartMessage: string;
  onEndMessage: string;

  constructor({
    broker,
    topic,
    onStartMessage,
    onEndMessage,
  }: {
    broker?: string;
    topic?: string;
    onStartMessage?: string;
    onEndMessage?: string;
  }) {
    this.broker = broker;
    this.topic = topic;
    this.onStartMessage = onStartMessage;
    this.onEndMessage = onEndMessage;
  }

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

  isConfigured() {
    return !!this.broker;
  }
}
