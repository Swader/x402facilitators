#!/usr/bin/env bun
import { mkdir, writeFile, copyFile, readFile } from 'fs/promises';
import { join } from 'path';
import { allFacilitators } from '../src/lists/all';
import type { Facilitator } from '../src/types';
import { Network } from '../src/types';

const OUTPUT_DIR = join(import.meta.dir, '..', 'dist');
const ASSETS_DIR = join(import.meta.dir, '..', 'assets');
const TEMPLATE_PATH = join(import.meta.dir, 'template.html');
const CNAME_PATH = join(import.meta.dir, '..', 'CNAME');

// Helper to count total addresses for a facilitator
function getTotalAddressesForFacilitator(facilitator: Facilitator): number {
  return Object.values(facilitator.addresses).reduce(
    (sum, addresses) => sum + addresses.length,
    0
  );
}

// Generate HTML for the website
async function generateHTML() {
  const facilitatorCards = allFacilitators
    .sort((a, b) => {
      // Sort by total addresses, descending (most addresses first)
      const aTotal = getTotalAddressesForFacilitator(a);
      const bTotal = getTotalAddressesForFacilitator(b);
      return bTotal - aTotal;
    })
    .map((facilitator: Facilitator) => generateCard(facilitator))
    .join('\n');

  // Read template
  const template = await readFile(TEMPLATE_PATH, 'utf-8');

  // Replace placeholders
  const html = template
    .replace('{{TOTAL_FACILITATORS}}', allFacilitators.length.toString())
    .replace('{{TOTAL_NETWORKS}}', getTotalNetworks().toString())
    .replace('{{TOTAL_ADDRESSES}}', getTotalAddresses().toString())
    .replace('{{FACILITATOR_CARDS}}', facilitatorCards);

  return html;
}

// Keep the rest of the HTML generation below for backwards compatibility

function getExplorerUrl(address: string, network: Network): string {
  const explorers = {
    [Network.BASE]: `https://basescan.org/address/${address}`,
    [Network.POLYGON]: `https://polygonscan.com/address/${address}`,
    [Network.SOLANA]: `https://explorer.solana.com/address/${address}`,
  };
  return explorers[network];
}

function getNetworkIcon(network: Network): string {
  const icons = {
    [Network.BASE]: 'base.webp',
    [Network.POLYGON]: 'polygon.webp',
    [Network.SOLANA]: 'solana.webp',
  };
  return icons[network];
}

function getAccessTypeIcons(accessType: string): string {
  if (accessType === 'gated_paid') {
    return '<span class="access-icon">🔒</span><span class="access-icon">💰</span>';
  } else if (accessType === 'gated') {
    return '<span class="access-icon">🔒</span>';
  }
  return '';
}

function generateAddressList(facilitator: Facilitator): string {
  const addressItems: string[] = [];
  
  for (const [network, addresses] of Object.entries(facilitator.addresses)) {
    for (const addr of addresses) {
      const networkName = network as Network;
      const explorerUrl = getExplorerUrl(addr.address, networkName);
      const networkIcon = getNetworkIcon(networkName);
      
      addressItems.push(`
        <div class="address-item">
          <span class="network-label ${network}">${network}</span>
          <div class="address-text">${addr.address}</div>
          <div class="explorer-links">
            <a href="${explorerUrl}" target="_blank" rel="noopener noreferrer" class="explorer-btn">
              <img src="${networkIcon}" alt="${network}" class="explorer-icon" />
              View on ${network === 'base' ? 'BaseScan' : network === 'polygon' ? 'PolygonScan' : 'Solana Explorer'}
            </a>
          </div>
        </div>
      `);
    }
  }
  
  return addressItems.join('');
}

function generateCard(facilitator: Facilitator): string {
  const networks = Object.keys(facilitator.addresses);
  const totalAddresses = Object.values(facilitator.addresses).reduce(
    (sum, addresses) => sum + addresses.length,
    0
  );
  const firstDate = getFirstTransactionDate(facilitator);
  const addressList = generateAddressList(facilitator);
  const accessIcons = getAccessTypeIcons(facilitator.accessType);
  const isFree = facilitator.fee === 0;
  const accessType = facilitator.accessType || 'open';

  return `
    <div class="card" id="card-${facilitator.id}" 
         data-networks="${networks.join(',')}"
         data-fee="${isFree ? 'free' : 'paid'}"
         data-access="${accessType}">
      <div class="card-accent" style="background: ${facilitator.metadata.color};"></div>
      <div class="card-header">
        <img 
          src="${facilitator.metadata.image}" 
          alt="${facilitator.metadata.name} logo" 
          class="card-logo"
          onerror="this.style.display='none'"
        />
        <div class="card-title-section">
          <div class="card-title">${facilitator.metadata.name}</div>
          <div class="card-id">${facilitator.id}</div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="main-address-container">
          <div class="main-address-label">
            Facilitator API URL
            ${accessIcons ? `<div class="access-icons">${accessIcons}</div>` : ''}
            ${facilitator.fee > 0 ? `<span class="fee-display">${facilitator.fee}% Fee</span>` : '<span class="fee-display">0% Fee</span>'}
          </div>
          <div class="main-address-display">
            <div class="main-address-text">${facilitator.facilitatorUrl}</div>
            <button class="copy-btn" onclick="copyAddress('${facilitator.facilitatorUrl}', this)">
              Copy
            </button>
          </div>
        </div>

        <div class="info-row">
          <span class="info-label">Networks</span>
          <div class="networks">
            ${networks
              .map(
                (network) =>
                  `<span class="network-badge network-${network}">${network}</span>`
              )
              .join('')}
          </div>
        </div>
        
        <div class="info-row-wrapper">
          <div class="info-row addresses-interactive" onclick="toggleAddresses('${facilitator.id}')">
            <span class="info-label">Addresses</span>
            <span class="addresses-count">${totalAddresses}</span>
          </div>
          
          <div class="address-list">
            ${addressList}
          </div>
        </div>
        
        ${
          firstDate
            ? `
        <div class="info-row">
          <span class="info-label">First Transaction</span>
          <span class="info-value">${firstDate}</span>
        </div>
        `
            : ''
        }
        
        <a href="${facilitator.metadata.docsUrl}" target="_blank" class="card-link">
          View Documentation
        </a>
      </div>
    </div>
  `;
}

function getFirstTransactionDate(facilitator: Facilitator): string | null {
  const dates: Date[] = [];

  for (const addresses of Object.values(facilitator.addresses)) {
    for (const addr of addresses) {
      if (addr.dateOfFirstTransaction) {
        dates.push(addr.dateOfFirstTransaction);
      }
    }
  }

  if (dates.length === 0) return null;

  const earliest = new Date(Math.min(...dates.map((d) => d.getTime())));
  return earliest.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getTotalNetworks(): number {
  const networks = new Set<string>();
  for (const facilitator of allFacilitators) {
    for (const network of Object.keys(facilitator.addresses)) {
      networks.add(network);
    }
  }
  return networks.size;
}

function getTotalAddresses(): number {
  let total = 0;
  for (const facilitator of allFacilitators) {
    for (const addresses of Object.values(facilitator.addresses)) {
      total += addresses.length;
    }
  }
  return total;
}

async function build() {
  console.log('🚀 Building x402 Facilitators website...');

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Copy network icons
  console.log('📦 Copying assets...');
  const icons = ['base.webp', 'polygon.webp', 'solana.webp'];
  for (const icon of icons) {
    await copyFile(
      join(ASSETS_DIR, icon),
      join(OUTPUT_DIR, icon)
    );
  }

  // Copy CNAME file for GitHub Pages
  try {
    await copyFile(CNAME_PATH, join(OUTPUT_DIR, 'CNAME'));
    console.log('📄 Copied CNAME file');
  } catch {
    console.log('⚠️  No CNAME file found (skipping)');
  }

  // Generate HTML
  const html = await generateHTML();

  // Write HTML file
  await writeFile(join(OUTPUT_DIR, 'index.html'), html);

  console.log('✅ Website built successfully!');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log('🌐 To serve locally: cd dist && npx http-server');
}

// Run the build
build().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});

