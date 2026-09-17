import { Network, AccessType } from '../types';
import { USDC_ARC_TOKEN, USDC_BASE_TOKEN, USDC_SOLANA_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const apex: FacilitatorConfig = {
  url: 'https://apexfaucet.xyz/api/facilitator',
};

export const apexDiscovery: FacilitatorConfig = {
  url: 'https://apexfaucet.xyz',
};

export const apexFacilitator = {
  id: 'apex',
  metadata: {
    name: 'APEX',
    image: 'https://apexfaucet.xyz/favicon.ico',
    docsUrl: 'https://apexfaucet.xyz/ai/',
    color: '#C9A227',
  },
  config: apex,
  discoveryConfig: apexDiscovery,
  facilitatorUrl: 'https://apexfaucet.xyz/api/facilitator',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.ARC]: [
      {
        address: '0x160168706aab75f6d6b951329706c90f32b25c56',
        tokens: [USDC_ARC_TOKEN],
        dateOfFirstTransaction: new Date('2026-09-16'),
      },
    ],
    [Network.BASE]: [
      {
        address: '0xd334ab5151c624cada654854e2879903dc4217ed',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2026-09-16'),
      },
    ],
    [Network.SOLANA]: [
      {
        address: 'HYiepS7mNCVVKoaDmZLQ6rNtMWHTQqKheM1NLGn1x8kJ',
        tokens: [USDC_SOLANA_TOKEN],
        dateOfFirstTransaction: new Date('2026-09-15'),
      },
    ],
  },
} satisfies Facilitator;
