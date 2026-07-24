import { Network, AccessType } from '../types';
import { USDC_NEAR_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const nearX402: FacilitatorConfig = {
  url: 'https://x402.mikedotexe.com',
};

export const nearX402Facilitator: Facilitator = {
  id: 'nearX402',
  metadata: {
    name: 'NEAR x402 Facilitator',
    image:
      'https://raw.githubusercontent.com/fastnear/x402-near-facilitator/main/docs/assets/near-x402-facilitator.svg',
    docsUrl: 'https://github.com/fastnear/x402-near-facilitator',
    color: '#00ec97',
  },
  config: nearX402,
  facilitatorUrl: 'https://x402.mikedotexe.com',
  accessType: AccessType.GATED,
  fee: 0,
  addresses: {
    [Network.NEAR]: [
      {
        address: 'x402-relayer2.mike.near',
        tokens: [USDC_NEAR_TOKEN],
        dateOfFirstTransaction: new Date('2026-07-23'),
      },
    ],
  },
};
