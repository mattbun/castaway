import { Client as CastV2Client } from 'castv2';

export interface CastConnectionConfig {
  host: string;
  enableDebugLogs: boolean;
}

export interface CastClientCallbacks {
  onStart: () => void;
  onEnd: () => void;
}

export interface MessageData {
  type: string;
  status: {
    applications: Array<{
      sessionId: string;
      isIdleScreen: boolean;
    }>;
  };
}

export class CastClient {
  host: string;
  enableDebugLogs: boolean;
  callbacks: CastClientCallbacks;

  lastSessionId: string = null;

  constructor(
    { host, enableDebugLogs }: CastConnectionConfig,
    callbacks: CastClientCallbacks
  ) {
    this.host = host;
    this.callbacks = callbacks;
    this.enableDebugLogs = enableDebugLogs;
  }

  start() {
    console.log(`Connecting to "${this.host}"...`);
    const client = new CastV2Client();

    client.connect(this.host, () => {
      // Below is pretty much all taken from castv2's documentation
      // create various namespace handlers
      var connection = client.createChannel(
        'sender-0',
        'receiver-0',
        'urn:x-cast:com.google.cast.tp.connection',
        'JSON'
      );
      var heartbeat = client.createChannel(
        'sender-0',
        'receiver-0',
        'urn:x-cast:com.google.cast.tp.heartbeat',
        'JSON'
      );
      var receiver = client.createChannel(
        'sender-0',
        'receiver-0',
        'urn:x-cast:com.google.cast.receiver',
        'JSON'
      );

      // establish virtual connection to the receiver
      connection.send({ type: 'CONNECT' });

      // start heartbeating
      setInterval(function () {
        heartbeat.send({ type: 'PING' });
      }, 5000);

      receiver.on('message', this.onMessage.bind(this));

      console.log('Connected! Waiting for some action...');
    });
  }

  onMessage(data: MessageData, broadcast: boolean) {
    if (this.enableDebugLogs) {
      console.log(JSON.stringify({ data, broadcast }, null, 2));
    }

    if (data.type !== 'RECEIVER_STATUS') {
      return;
    }

    // TODO use optional chaining
    const hasApplication = !!data.status.applications;
    const sessionIsIdleScreen =
      data.status.applications && data.status.applications[0].isIdleScreen;
    const sessionIdHasChanged =
      hasApplication &&
      this.lastSessionId !== data.status.applications[0].sessionId;

    if (this.lastSessionId && (!hasApplication || sessionIsIdleScreen)) {
      console.log('Looks like a session ended');
      this.lastSessionId = null;
      return this.callbacks.onEnd();
    } else if (sessionIdHasChanged && !sessionIsIdleScreen) {
      this.lastSessionId = data.status.applications[0].sessionId;
      console.log('New session: ' + this.lastSessionId);
      return this.callbacks.onStart();
    }
  }
}
