import { Network, AccessType } from '../types';
import { USDC_NEAR_TOKEN } from '../constants';

import type {
  Facilitator,
  FacilitatorConfig,
  FacilitatorConfigConstructor,
} from '../types';

interface NearX402Props {
  apiKey: string;
}

const FACILITATOR_URL = 'https://x402.mikedotexe.com';

export const nearX402: FacilitatorConfigConstructor<NearX402Props> = ({
  apiKey,
}) => ({
  url: FACILITATOR_URL,
  createAuthHeaders: async () => ({
    verify: {
      'X-API-Key': apiKey,
    },
    settle: {
      'X-API-Key': apiKey,
    },
    supported: {
      'X-API-Key': apiKey,
    },
  }),
});

export const nearX402Discovery: FacilitatorConfig = {
  url: FACILITATOR_URL,
};

export const nearX402Facilitator = {
  id: 'nearX402',
  metadata: {
    name: 'NEAR x402 Facilitator',
    image:
      'https://raw.githubusercontent.com/fastnear/x402-near-facilitator/main/docs/assets/near-x402-facilitator.svg',
    docsUrl: 'https://github.com/fastnear/x402-near-facilitator',
    color: '#00ec97',
  },
  config: nearX402,
  discoveryConfig: nearX402Discovery,
  facilitatorUrl: FACILITATOR_URL,
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
} as const satisfies Facilitator<NearX402Props>;
