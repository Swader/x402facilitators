import { Network, AccessType } from '../types';
import { USDC_BASE_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const arispay: FacilitatorConfig = {
  url: 'https://facilitator.arispay.app',
};

export const arispayDiscovery: FacilitatorConfig = {
  url: 'https://facilitator.arispay.app',
};

export const arispayFacilitator = {
  id: 'arispay',
  metadata: {
    name: 'ArisPay',
    image: 'https://avatars.githubusercontent.com/u/277528032?v=4',
    docsUrl: 'https://github.com/arispay-inc/facilitator',
    color: '#0EA5E9',
  },
  config: arispay,
  discoveryConfig: arispayDiscovery,
  facilitatorUrl: 'https://facilitator.arispay.app',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.BASE]: [
      {
        address: '0xF0afD8bb6ff2Bd7BE9d98D570BcfC953008d6abB',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2026-04-22'),
      },
    ],
  },
} as const satisfies Facilitator;
