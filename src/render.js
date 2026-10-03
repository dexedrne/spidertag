// Turns src/token.config.js into the bits of HTML that depend on it, at build time, so the
// shipped page already has every link before any JS runs (vite.config.js puts them in).

import { token, wager, site, tokenLinks } from './token.config.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const short = (a) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const ext = (href, label, cls = '') =>
  `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;

const launched = () => Boolean(token.address.trim());
const isMainnet = () => wager.stage === 'mainnet';

export function renderPlay() {
  const game = `<a class="btn btn-main" href="${esc(wager.game)}">Play SPIDERTAG</a>`;
  if (!wager.showLink) return game;
  const label = isMainnet() ? 'Play for SPIDERTAG' : 'Wager beta <span class="btn-tag">testnet</span>';
  return `${game}<a class="btn btn-alt" href="${esc(wager.url)}">${label}</a>`;
}

export function renderStatus() {
  if (!launched()) {
    return `<span class="ok">[ .. ]</span> token not launched yet · launches on pons, on ${esc(token.chain)}`;
  }
  return `<span class="ok">[ OK ]</span> live on ${esc(token.chain)} · <span class="mono">${esc(short(token.address))}</span>`;
}

export function renderStage() {
  return isMainnet()
    ? `The vault is on ${esc(token.chain)} mainnet and holds the real coin.`
    : `Right now the wager matches run as a <strong>beta on ${esc(token.chain)} Testnet</strong>, with test tokens that have no value. The mainnet vault comes after the coin launches.`;
}

export function renderTokenLinks() {
  const l = tokenLinks();
  const item = (href, name) =>
    href
      ? ext(href, `${name}<span aria-hidden="true"> ↗</span>`, 'tlink')
      : `<span class="tlink tlink-off">${name}<small>at launch</small></span>`;
  const addr = launched()
    ? `<div class="addr"><span class="addr-label">Contract</span><code class="addr-value" id="addr">${esc(token.address)}</code><button class="copy" type="button" data-copy="${esc(token.address)}">copy</button></div>`
    : `<div class="addr addr-off"><span class="addr-label">Contract</span><code class="addr-value">posted here at launch</code></div>`;
  return `${addr}<div class="tlinks">${item(l.pons, 'pons')}${item(l.dexscreener, 'DexScreener')}${item(l.explorer, `${esc(token.chain)} Blockscout`)}</div>`;
}

export function renderFooterLinks() {
  return [
    ext(site.home, 'vyvanse.beer'),
    ext(wager.game, 'SPIDERTAG'),
    ext(site.source, 'this site on GitHub'),
    ext(site.gameSource, 'the game on GitHub'),
    ext(site.x, 'X'),
  ].join('<span class="dot" aria-hidden="true">·</span>');
}

export const slots = {
  '<!-- play -->': renderPlay,
  '<!-- status -->': renderStatus,
  '<!-- stage -->': renderStage,
  '<!-- token-links -->': renderTokenLinks,
  '<!-- footer-links -->': renderFooterLinks,
  '<!-- symbol -->': () => esc(token.symbol),
  '<!-- supply -->': () => esc(token.supply),
  '<!-- chain -->': () => esc(token.chain),
};
