import { Network, AccessType } from '../types';
import { USDC_BASE_TOKEN, USDC_SOLANA_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const satoshi: FacilitatorConfig = {
  url: 'https://x402-facilitator.happysmoke-e4fd0a77.eastus.azurecontainerapps.io',
};

export const satoshiFacilitator = {
  id: 'satoshi',
  metadata: {
    name: 'Satoshi',
    image: 'https://x402scan.com/satoshi.png',
    docsUrl: 'https://github.com/Bortlesboat/x402-facilitator',
    color: '#F7931A',
  },
  config: satoshi,
  facilitatorUrl:
    'https://x402-facilitator.happysmoke-e4fd0a77.eastus.azurecontainerapps.io',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.BASE]: [
      {
        address: '0xe166267c3648b5ca4419F2c58fAEd8Cd4DF87d54',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2025-04-06'),
      },
    ],
    [Network.SOLANA]: [
      {
        address: '24D2XixrqnocvG5DChLJgUsyaNy7tqvj9iD6YS1KaEsu',
        tokens: [USDC_SOLANA_TOKEN],
        dateOfFirstTransaction: new Date('2025-04-06'),
      },
    ],
  },
} as const satisfies Facilitator;
