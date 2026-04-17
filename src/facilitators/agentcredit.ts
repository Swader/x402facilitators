import { Network, AccessType } from '../types';
import { USDC_BASE_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const agentcredit: FacilitatorConfig = {
  url: 'https://agentlending.spekn.com',
};

export const agentcreditFacilitator = {
  id: 'agentcredit',
  metadata: {
    name: 'AgentCredit',
    image: 'https://agentlending.spekn.com/logo.png',
    docsUrl: 'https://agentlending.spekn.com',
    color: '#0052FF',
  },
  config: agentcredit,
  facilitatorUrl: 'https://agentlending.spekn.com',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.BASE]: [
      {
        address: '0x510a64F194CB6196d34C93717d88f13aCF0C979f',
        tokens: [USDC_BASE_TOKEN],
        dateOfFirstTransaction: new Date('2026-04-17'),
      },
    ],
  },
} as const satisfies Facilitator;
