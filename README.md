# token.spidertag.vyvanse.beer

The page for **$SPIDERTAG**, the token for [SPIDERTAG](https://spidertag.vyvanse.beer), the Robinhood Chain game:
web-slinger tag between Radbros, and its 1v1 wager matches, best of 3, for a stake. The game lives at
spidertag.vyvanse.beer (its `/token` path redirects here); this page lives at https://token.spidertag.vyvanse.beer.

A small static Vite site. No framework, no trackers, no cookies. The only thing it fetches from another
origin is the DexScreener price, and only once a contract address is set.

## Launch day

Everything token-shaped lives in one file, [`src/token.config.js`](src/token.config.js):

- `token.address`: empty until the coin exists. Set it and the DexScreener and Robinhood Chain
  Blockscout links, the copy button and the live stats strip all switch on.
- `token.links.trade`: the Buy link, set by hand at launch.
- `wager.stage`: `'testnet'` (the beta, test tokens) or `'mainnet'` once the vault holds the real coin.
- `wager.showLink`: hides the wager link if set to `false`.

Then `npm run build` and deploy.

## Run it

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
```

`vite.config.js` fills the `<!-- slot -->` markers in `index.html` from the config at build time, so the
shipped HTML has every link before any JS runs. `src/main.js` only does the copy button and the stats strip.

## Art

The key art is the game's: Radbros #652, #4764, #3704 and #3710, with #723 on the street. The share card is
`og/og.html` rendered with headless Chromium at 1200x630 into `public/og2.jpg` (`og.jpg` is the same image, kept for old links).

## Licence

Code: MIT ([LICENSE](LICENSE)). Art: Viral Public License ([LICENSE-ASSETS](LICENSE-ASSETS)).

Not affiliated with or endorsed by Robinhood. SPIDERTAG is a game token, not an investment.
