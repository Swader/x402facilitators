import { Network, AccessType } from '../types';
import { USDC_SOLANA_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

export const twzrd: FacilitatorConfig = {
  url: 'https://intel.twzrd.xyz',
};

export const twzrdDiscovery: FacilitatorConfig = {
  url: 'https://intel.twzrd.xyz',
};

export const twzrdFacilitator = {
  id: 'twzrd',
  metadata: {
    name: 'TWZRD',
    image: 'https://twzrd.xyz/icon-512.png',
    docsUrl: 'https://intel.twzrd.xyz/llms.txt',
    color: '#2DD4BF',
  },
  config: twzrd,
  discoveryConfig: twzrdDiscovery,
  facilitatorUrl: 'https://intel.twzrd.xyz',
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.SOLANA]: [
      {
        // Settlement feePayer advertised in GET /supported (signers["solana:*"])
        address: '4LkEFjJdXARkKx8FBx4LBFa2SvJNmjQpgGDLoJcypZUE',
        tokens: [USDC_SOLANA_TOKEN],
        // First external mainnet settlement, verified on-chain:
        // tx 3aXGtvmNvFhSSDXF8D4DBDntXFczraUABg75MdWtCgchdYAApRwC7KxdGxbCmewYcA6ZNzw6FvdAHcoevMUG44Sc
        // slot 421708612
        dateOfFirstTransaction: new Date('2026-05-23'),
      },
    ],
  },
} as const satisfies Facilitator;
