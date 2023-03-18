import mqtt from 'async-mqtt';

import { MqttAction } from './mqtt.js';

const baseConfig = {
  broker: 'some broker',
  topic: 'some topic',
};

describe('MqttAction', () => {
  describe('isConfigured', () => {
    it('returns true if a broker is defined', () => {
      const mqttAction = new MqttAction({
        broker: 'some broker',
      });

      expect(mqttAction.isConfigured()).toEqual(true);
    });

    it('returns false if there is no broker defined', () => {
      const mqttAction = new MqttAction({
        broker: 'some broker',
      });

      expect(mqttAction.isConfigured()).toEqual(true);
    });
  });

  describe('onStart', () => {
    it('publishes a message to mqtt', async () => {
      const mqttAction = new MqttAction({
        ...baseConfig,
        topic: 'some topic',
        onStartMessage: 'blah',
      });
      const mockClient = {
        publish: jest.fn(),
        end: jest.fn(),
      };
      jest.spyOn(mqtt, 'connectAsync').mockResolvedValue(mockClient as any);

      await mqttAction.onStart();

      expect(mqtt.connectAsync).toHaveBeenCalledTimes(1);
      expect(mqtt.connectAsync).toHaveBeenCalledWith(baseConfig.broker);
      expect(mockClient.publish).toHaveBeenCalledTimes(1);
      expect(mockClient.publish).toHaveBeenCalledWith('some topic', 'blah');
      expect(mockClient.end).toHaveBeenCalledTimes(1);
    });

    it('does nothing if onStartMessage is unset', async () => {
      const mqttAction = new MqttAction({
        ...baseConfig,
        topic: 'some topic',
        onEndMessage: 'blah',
      });
      const mockClient = {
        publish: jest.fn(),
        end: jest.fn(),
      };
      jest.spyOn(mqtt, 'connectAsync').mockResolvedValue(mockClient as any);

      await mqttAction.onStart();

      expect(mqtt.connectAsync).not.toHaveBeenCalled();
    });
  });

  describe('onEnd', () => {
    it('publishes a message to mqtt', async () => {
      const mqttAction = new MqttAction({
        ...baseConfig,
        topic: 'some topic',
        onEndMessage: 'blah',
      });
      const mockClient = {
        publish: jest.fn(),
        end: jest.fn(),
      };
      jest.spyOn(mqtt, 'connectAsync').mockResolvedValue(mockClient as any);

      await mqttAction.onEnd();

      expect(mqtt.connectAsync).toHaveBeenCalledTimes(1);
      expect(mqtt.connectAsync).toHaveBeenCalledWith(baseConfig.broker);
      expect(mockClient.publish).toHaveBeenCalledTimes(1);
      expect(mockClient.publish).toHaveBeenCalledWith('some topic', 'blah');
      expect(mockClient.end).toHaveBeenCalledTimes(1);
    });

    it('does nothing if onEndMessage is unset', async () => {
      const mqttAction = new MqttAction({
        ...baseConfig,
        topic: 'some topic',
        onStartMessage: 'blah',
      });
      const mockClient = {
        publish: jest.fn(),
        end: jest.fn(),
      };
      jest.spyOn(mqtt, 'connectAsync').mockResolvedValue(mockClient as any);

      await mqttAction.onEnd();

      expect(mqtt.connectAsync).not.toHaveBeenCalled();
    });
  });
});
