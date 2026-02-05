import { Network, AccessType } from '../types';
import { USDC_BASE_TOKEN, USDC_POLYGON_TOKEN, USDC_SOLANA_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const kamiyo: FacilitatorConfig = {
  url: 'https://x402.kamiyo.ai',
};

export const kamiyoDiscovery: FacilitatorConfig = {
  url: 'https://x402.kamiyo.ai',
};

export const kamiyoFacilitator = {
  id: 'kamiyo',
  metadata: {
    name: 'KAMIYO',
    image: 'https://kamiyo.ai/favicon.png',
    docsUrl: 'https://docs.kamiyo.ai',
    color: '#00D4AA',
  },
  config: kamiyo,
  discoveryConfig: kamiyoDiscovery,
  facilitatorUrl: 'https://x402.kamiyo.ai',
  accessType: AccessType.GATED,
  fee: 0,
  addresses: {
    [Network.BASE]: [
      {
        address: '0x742d35cc6634c0532925a3b844bc9e7595f0bee4',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2025-01-01'),
      },
    ],
    [Network.POLYGON]: [
      {
        address: '0x742d35cc6634c0532925a3b844bc9e7595f0bee4',
        tokens: [USDC_POLYGON_TOKEN],
        dateOfFirstTransaction: new Date('2025-01-01'),
      },
    ],
    [Network.SOLANA]: [
      {
        address: 'KAMiYo7XwXVQcFhkfhC4RHApURAcqRHF8tF9WoZHkYR',
        tokens: [USDC_SOLANA_TOKEN],
        dateOfFirstTransaction: new Date('2025-01-01'),
      },
    ],
  },
} as const satisfies Facilitator;
