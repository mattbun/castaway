import { CastClient } from './client';

describe('onMessage', () => {
  it('does nothing if type is not "RECEIVER_STATUS"', () => {
    const callbacks = {
      onStart: jest.fn(),
      onEnd: jest.fn(),
    };
    const client = new CastClient({ host: 'some host' }, callbacks);

    client.onMessage(
      {
        type: 'SOME_OTHER_TYPE',
        status: {
          applications: [
            {
              sessionId: 'some session id',
              isIdleScreen: false,
            },
          ],
        },
      } as any,
      true
    );

    expect(callbacks.onStart).not.toHaveBeenCalled();
    expect(callbacks.onEnd).not.toHaveBeenCalled();
  });

  it('does nothing if data.status.applications is unset', () => {
    const callbacks = {
      onStart: jest.fn(),
      onEnd: jest.fn(),
    };
    const client = new CastClient({ host: 'some host' }, callbacks);

    client.onMessage(
      {
        type: 'RECEIVER_STATUS',
        status: {
          applications: undefined,
        },
      } as any,
      true
    );

    expect(callbacks.onStart).not.toHaveBeenCalled();
    expect(callbacks.onEnd).not.toHaveBeenCalled();
  });

  it('calls onEnd if the application is an idle screen', () => {
    const callbacks = {
      onStart: jest.fn(),
      onEnd: jest.fn(),
    };
    const client = new CastClient({ host: 'some host' }, callbacks);

    client.onMessage(
      {
        type: 'RECEIVER_STATUS',
        status: {
          applications: [
            {
              sessionId: 'some session id',
              isIdleScreen: true,
            },
          ],
        },
      } as any,
      true
    );

    expect(callbacks.onStart).not.toHaveBeenCalled();
    expect(callbacks.onEnd).toHaveBeenCalledTimes(1);
  });

  it('calls onStart if there is a new session', () => {
    const callbacks = {
      onStart: jest.fn(),
      onEnd: jest.fn(),
    };
    const client = new CastClient({ host: 'some host' }, callbacks);

    client.onMessage(
      {
        type: 'RECEIVER_STATUS',
        status: {
          applications: [
            {
              sessionId: 'some session id',
              isIdleScreen: false,
            },
          ],
        },
      } as any,
      true
    );

    expect(callbacks.onStart).toHaveBeenCalledTimes(1);
    expect(callbacks.onEnd).not.toHaveBeenCalled();
  });

  it('does not call onStart if the session has not changed', () => {
    const callbacks = {
      onStart: jest.fn(),
      onEnd: jest.fn(),
    };
    const client = new CastClient({ host: 'some host' }, callbacks);
    client.lastSessionId = 'some session id';

    client.onMessage(
      {
        type: 'RECEIVER_STATUS',
        status: {
          applications: [
            {
              sessionId: 'some session id',
              isIdleScreen: false,
            },
          ],
        },
      } as any,
      true
    );

    expect(callbacks.onStart).not.toHaveBeenCalled();
    expect(callbacks.onEnd).not.toHaveBeenCalled();
  });
});
