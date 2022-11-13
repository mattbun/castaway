import * as ChildProcess from 'child_process';
import { PassThrough } from 'stream';

import { CommandAction } from './command';

describe('CommandAction', () => {
  describe('isConfigured', () => {
    it('returns true if commandOnStart is not empty', () => {
      const commandAction = new CommandAction({
        commandOnStart: 'blah',
        commandOnEnd: '',
      });

      expect(commandAction.isConfigured()).toEqual(true);
    });

    it('returns true if commandOnEnd is not empty', () => {
      const commandAction = new CommandAction({
        commandOnStart: '',
        commandOnEnd: 'blah',
      });

      expect(commandAction.isConfigured()).toEqual(true);
    });

    it('returns false if neither commandOnStart nor commandOnEnd is true', () => {
      const commandAction = new CommandAction({
        commandOnStart: '',
        commandOnEnd: '',
      });

      expect(commandAction.isConfigured()).toEqual(false);
    });
  });

  describe('onStart', () => {
    it('calls exec if commandOnStart is set', async () => {
      const commandAction = new CommandAction({
        commandOnStart: 'blah',
        commandOnEnd: '',
      });
      jest.spyOn(ChildProcess, 'exec').mockImplementation(
        (_) =>
          ({
            stdout: new PassThrough(),
            stderr: new PassThrough(),
          } as any)
      );

      await commandAction.onStart();

      expect(ChildProcess.exec).toHaveBeenCalledTimes(1);
      expect(ChildProcess.exec).toHaveBeenCalledWith('blah');
    });

    it('does not call exec if commandOnStart is unset', async () => {
      const commandAction = new CommandAction({
        commandOnStart: '',
        commandOnEnd: '',
      });
      jest.spyOn(ChildProcess, 'exec').mockImplementation(
        (_) =>
          ({
            stdout: new PassThrough(),
            stderr: new PassThrough(),
          } as any)
      );

      await commandAction.onStart();

      expect(ChildProcess.exec).not.toHaveBeenCalled();
    });
  });

  describe('onEnd', () => {
    it('calls exec if commandOnEnd is set', async () => {
      const commandAction = new CommandAction({
        commandOnStart: '',
        commandOnEnd: 'bleh',
      });
      jest.spyOn(ChildProcess, 'exec').mockImplementation(
        (_) =>
          ({
            stdout: new PassThrough(),
            stderr: new PassThrough(),
          } as any)
      );

      await commandAction.onEnd();

      expect(ChildProcess.exec).toHaveBeenCalledTimes(1);
      expect(ChildProcess.exec).toHaveBeenCalledWith('bleh');
    });

    it('does not call exec if commandOnEnd is unset', async () => {
      const commandAction = new CommandAction({
        commandOnStart: '',
        commandOnEnd: '',
      });
      jest.spyOn(ChildProcess, 'exec').mockImplementation(
        (_) =>
          ({
            stdout: new PassThrough(),
            stderr: new PassThrough(),
          } as any)
      );

      await commandAction.onEnd();

      expect(ChildProcess.exec).not.toHaveBeenCalled();
    });
  });
});
