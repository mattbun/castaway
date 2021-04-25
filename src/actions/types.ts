import { CastClientCallbacks } from '../cast/client';

export interface CastawayAction extends CastClientCallbacks {
  isConfigured: () => boolean;
}
