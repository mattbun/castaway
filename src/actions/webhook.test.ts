import got from 'got';
import { WebhookAction } from './webhook.js';

describe('WebhookAction', () => {
  describe('isConfigured', () => {
    it('returns true if webhookOnStart is defined', () => {
      const webhookAction = new WebhookAction({ webhookOnStart: 'something' });
      expect(webhookAction.isConfigured()).toBe(true);
    });

    it('returns true if webhookOnEnd is defined', () => {
      const webhookAction = new WebhookAction({ webhookOnEnd: 'something' });
      expect(webhookAction.isConfigured()).toBe(true);
    });

    it('returns true if both defined', () => {
      const webhookAction = new WebhookAction({
        webhookOnStart: 'something',
        webhookOnEnd: 'something else',
      });
      expect(webhookAction.isConfigured()).toBe(true);
    });

    it('returns false if neither are defined', () => {
      const webhookAction = new WebhookAction({});
      expect(webhookAction.isConfigured()).toBe(false);
    });
  });

  describe('onStart', () => {
    it('calls the onStart webhook', async () => {
      const webhookAction = new WebhookAction({ webhookOnStart: 'something' });

      await webhookAction.onStart();

      expect(got.get).toHaveBeenCalledTimes(1);
      expect(got.get).toHaveBeenCalledWith('something');
    });

    it('does not call the webhook if it is not defined', async () => {
      const webhookAction = new WebhookAction({});

      await webhookAction.onStart();

      expect(got.get).not.toHaveBeenCalled();
    });
  });

  describe('onEnd', () => {
    it('calls the onEnd webhook', async () => {
      const webhookAction = new WebhookAction({ webhookOnEnd: 'something' });

      await webhookAction.onEnd();

      expect(got.get).toHaveBeenCalledTimes(1);
      expect(got.get).toHaveBeenCalledWith('something');
    });

    it('does not call the webhook if it is not defined', async () => {
      const webhookAction = new WebhookAction({});

      await webhookAction.onEnd();

      expect(got.get).not.toHaveBeenCalled();
    });
  });
});
