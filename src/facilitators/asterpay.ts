import { Network, AccessType } from '../types';
import { USDC_BASE_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const asterpay: FacilitatorConfig = {
  url: 'https://x402.asterpay.io',
};

export const asterpayFacilitator = {
  id: 'asterpay',
  metadata: {
    name: 'AsterPay',
    image: 'https://asterpay.io/assets/asterpay-logo.svg',
    docsUrl: 'https://asterpay.io/docs',
    color: '#6366F1',
  },
  config: asterpay,
  facilitatorUrl: 'https://x402.asterpay.io',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.BASE]: [
      {
        address: '0xd5f8481D8F25d3966d2010DBf9B47fFbdf745A9E',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2026-04-01'),
      },
    ],
  },
} as const satisfies Facilitator;
