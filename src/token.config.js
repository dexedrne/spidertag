// The one file to edit at launch. Everything token-shaped on the page comes from here.
//
// Before launch: leave `address` empty. The page then shows "at launch" in place of every
// token link, and the live stats strip stays hidden.
//
// After launch: paste the contract address. The pons, DexScreener and Blockscout links fill
// themselves in from it (set one by hand only if it lives somewhere else), the copy button
// appears, and the stats strip starts reading DexScreener.
//
// When the vault is on mainnet: set `wager.stage` to 'mainnet'.

export const token = {
  name: 'SPIDERTAG',
  symbol: 'SPIDERTAG',
  chain: 'Robinhood Chain', // always in full
  chainId: 4663,
  supply: '1,000,000,000',
  decimals: 18,

  // 0x... once the coin exists. Empty = not launched yet.
  address: '',

  // Leave empty to derive from `address`.
  links: {
    pons: '', //        https://www.ponsfamily.com/launchpad/<address>
    dexscreener: '', // https://dexscreener.com/robinhood/<address>
    explorer: '', //    https://robinhoodchain.blockscout.com/token/<address>
  },
};

export const wager = {
  // 'testnet' = the beta with test tokens; 'mainnet' = the vault holds the real coin.
  stage: 'testnet',
  game: 'https://radrun.vyvanse.beer',
  url: 'https://radrun.vyvanse.beer/?wager',
  // false hides the wager link (the game link stays).
  showLink: true,
};

export const site = {
  url: 'https://spidertag.vyvanse.beer',
  home: 'https://vyvanse.beer',
  source: 'https://github.com/dexedrne/spidertag',
  gameSource: 'https://github.com/dexedrne/radrun',
  x: 'https://x.com/dexedrne',
};

export function tokenLinks(t = token) {
  const a = t.address.trim();
  const pick = (own, derived) => own || (a ? derived : '');
  return {
    pons: pick(t.links.pons, `https://www.ponsfamily.com/launchpad/${a}`),
    dexscreener: pick(t.links.dexscreener, `https://dexscreener.com/robinhood/${a}`),
    explorer: pick(t.links.explorer, `https://robinhoodchain.blockscout.com/token/${a}`),
  };
}
