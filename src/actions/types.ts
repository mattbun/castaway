import { CastClientCallbacks } from '../cast/client.js';

export interface CastawayAction extends CastClientCallbacks {
  isConfigured: () => boolean;
}
