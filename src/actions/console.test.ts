import { ConsoleAction } from './console';

describe('ConsoleAction', () => {
  describe('isConfigured', () => {
    it('returns true if enableOnStart is true', () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: true,
        enableOnEnd: false,
      });

      expect(consoleAction.isConfigured()).toEqual(true);
    });

    it('returns true if enableOnEnd is true', () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: false,
        enableOnEnd: true,
      });

      expect(consoleAction.isConfigured()).toEqual(true);
    });

    it('returns false if neither enableOnStart nor enableOnEnd is true', () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: false,
        enableOnEnd: false,
      });

      expect(consoleAction.isConfigured()).toEqual(false);
    });
  });

  describe('onStart', () => {
    it('calls console.log if enableOnStart is true', async () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: true,
        enableOnEnd: false,
      });
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await consoleAction.onStart();

      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('does not call console.log if enableOnStart is false', async () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: false,
        enableOnEnd: false,
      });
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await consoleAction.onStart();

      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('onEnd', () => {
    it('calls console.log if enableOnEnd is true', async () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: false,
        enableOnEnd: true,
      });
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await consoleAction.onEnd();

      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('does not call console.log if enableOnEnd is false', async () => {
      const consoleAction = new ConsoleAction({
        enableOnStart: false,
        enableOnEnd: false,
      });
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await consoleAction.onEnd();

      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
