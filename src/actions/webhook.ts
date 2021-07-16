import got from 'got';
import { CastawayAction } from './types';

export class WebhookAction implements CastawayAction {
  webhookOnStart: string;
  webhookOnEnd: string;

  constructor({
    webhookOnStart,
    webhookOnEnd,
  }: {
    webhookOnStart?: string;
    webhookOnEnd?: string;
  }) {
    this.webhookOnStart = webhookOnStart;
    this.webhookOnEnd = webhookOnEnd;
  }

  async onStart() {
    if (!this.webhookOnStart) {
      return;
    }

    await got.get(this.webhookOnStart);
  }

  async onEnd() {
    if (!this.webhookOnEnd) {
      return;
    }

    await got.get(this.webhookOnEnd);
  }

  isConfigured() {
    return !!this.webhookOnStart || !!this.webhookOnEnd;
  }
}
