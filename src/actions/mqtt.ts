import mqtt from 'async-mqtt';
import { CastawayAction } from './types.js';

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
    if (!this.onStartMessage) {
      return;
    }

    try {
      const client = await mqtt.connectAsync(this.broker);
      await client.publish(this.topic, this.onStartMessage);
      await client.end();
    } catch (error) {
      console.error(error);
    }
  }

  async onEnd() {
    if (!this.onEndMessage) {
      return;
    }

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
