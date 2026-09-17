import type { Token } from './types';

const USDC_DECIMALS = 6;
const USDC_SOLANA = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // USDC on Base
const USDC_POLYGON = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // USDC on Polygon
// On Arc, USDC is the NATIVE gas token. This is its 6-decimal ERC-20 view, which is the form x402 amounts
// are quoted in; the same balance is also addressable natively at 18 decimals.
const USDC_ARC = '0x3600000000000000000000000000000000000000'; // USDC on Arc

export const USDC_BASE_TOKEN: Token = {
  address: USDC_BASE,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_SOLANA_TOKEN: Token = {
  address: USDC_SOLANA,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_POLYGON_TOKEN: Token = {
  address: USDC_POLYGON,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_ARC_TOKEN: Token = {
  address: USDC_ARC,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};
