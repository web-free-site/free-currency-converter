# Free Currency Converter

Free online currency converter hosted at [free-currency-converter.web-free.site](https://free-currency-converter.web-free.site).

Based on [SeyyidKadir/fx-currency-converter](https://github.com/SeyyidKadir/fx-currency-converter) (MIT per upstream README; see `LICENSE`).

## Stack

- Static HTML/CSS/JS in `public/`
- Cloudflare Workers **assets** (`wrangler.toml`, no deploy from this repo)
- Live rates: [open.er-api.com](https://open.er-api.com) v6, fallback [Fawaz currency-api](https://github.com/fawazahmed0/currency-api)

## Development

```bash
npm run build    # regenerate HTML from scripts/build-site.mjs
npm run test:rates
npx serve public -p 4173
```

## Credits

- UI: SeyyidKadir / fx-currency-converter
- Rates: open.er-api.com, fawazahmed0/currency-api