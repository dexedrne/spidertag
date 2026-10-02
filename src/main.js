import './style.css';
import { token, tokenLinks } from './token.config.js';

// Copy buttons (the contract address).
for (const btn of document.querySelectorAll('[data-copy]')) {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Older browsers / no permission: select the address so a long-press or Ctrl+C works.
      const el = document.getElementById('addr');
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
      }
    }
    btn.textContent = ok ? 'copied' : 'selected';
    btn.classList.add('done');
    setTimeout(() => {
      btn.textContent = 'copy';
      btn.classList.remove('done');
    }, 1600);
  });
}

// Live stats: hidden until there is a contract address and DexScreener knows a pool for it.
const stats = document.getElementById('stats');
const address = token.address.trim();

const usd = (n) => {
  if (!Number.isFinite(n)) return '–';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
};
const price = (n) => {
  if (!Number.isFinite(n) || n <= 0) return '–';
  if (n >= 1) return `$${n.toFixed(2)}`;
  // Small prices: keep 3 significant digits, e.g. $0.00000412
  const digits = Math.min(12, Math.max(2, -Math.floor(Math.log10(n)) + 2));
  return `$${n.toFixed(digits)}`;
};
const set = (key, text, cls) => {
  const el = stats.querySelector(`[data-stat="${key}"]`);
  if (!el) return;
  el.textContent = text;
  if (cls !== undefined) el.className = `v ${cls}`;
};

async function refresh() {
  try {
    const r = await fetch(`https://api.dexscreener.com/tokens/v1/robinhood/${address}`, { cache: 'no-store' });
    if (!r.ok) return;
    const pairs = await r.json();
    if (!Array.isArray(pairs) || pairs.length === 0) return; // still on the curve, or not indexed yet
    const p = pairs.reduce((a, b) => ((b.liquidity?.usd ?? 0) > (a.liquidity?.usd ?? 0) ? b : a));
    const ch = Number(p.priceChange?.h24);
    set('price', price(Number(p.priceUsd)));
    set('mcap', usd(Number(p.marketCap ?? p.fdv)));
    set('change', Number.isFinite(ch) ? `${ch > 0 ? '+' : ''}${ch.toFixed(1)}%` : '–', Number.isFinite(ch) ? (ch >= 0 ? 'up' : 'down') : '');
    set('vol', usd(Number(p.volume?.h24)));
    set('liq', usd(Number(p.liquidity?.usd)));
    const link = stats.querySelector('[data-stat="link"]');
    link.href = p.url || tokenLinks().dexscreener;
    stats.querySelector('[data-stat="where"]').textContent = `${p.dexId ?? 'dex'} pool`;
    stats.hidden = false;
  } catch {
    // Network or API hiccup: leave the strip as it was.
  }
}

if (address && stats) {
  refresh();
  setInterval(() => {
    if (document.visibilityState === 'visible') refresh();
  }, 60_000);
}
