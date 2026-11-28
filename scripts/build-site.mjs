#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://free-currency-converter.web-free.site';
const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const AFRICAN = ['RWF', 'CDF', 'XOF', 'XAF', 'KES', 'UGX', 'TZS'];
const MAJORS = ['USD', 'EUR'];
const NAMES = {
  RWF: 'Rwandan Franc', CDF: 'Congolese Franc', XOF: 'West African CFA Franc', XAF: 'Central African CFA Franc',
  KES: 'Kenyan Shilling', UGX: 'Ugandan Shilling', TZS: 'Tanzanian Shilling', USD: 'US Dollar', EUR: 'Euro',
};

const FOCUS = [...AFRICAN, ...MAJORS];

function pairs() {
  const out = [];
  for (const a of AFRICAN) {
    for (const b of MAJORS) {
      out.push([a, b]);
      out.push([b, a]);
    }
  }
  return out;
}

function slug(from, to) {
  return `${from.toLowerCase()}-to-${to.toLowerCase()}`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function converterMarkup(lang) {
  const isFr = lang === 'fr';
  return `
<div class="topbar">
  <div class="topbar-left">
    <span class="fs-label" id="fsLabel">Aa</span>
    <div class="fs-controls">
      <button class="fs-btn active" data-fs="fs-sm" onclick="setFs('fs-sm',this)">A</button>
      <button class="fs-btn" data-fs="fs-md" onclick="setFs('fs-md',this)">A+</button>
      <button class="fs-btn" data-fs="fs-lg" onclick="setFs('fs-lg',this)">A++</button>
    </div>
  </div>
</div>
<div class="lang-scroll"><div class="lang-bar" id="langBar"></div></div>
<div class="quick-picks" aria-label="Popular African pairs">
  <button type="button" class="quick-pick" data-quick-from="USD" data-quick-to="RWF">USD→RWF</button>
  <button type="button" class="quick-pick" data-quick-from="EUR" data-quick-to="CDF">EUR→CDF</button>
  <button type="button" class="quick-pick" data-quick-from="USD" data-quick-to="XOF">USD→XOF</button>
  <button type="button" class="quick-pick" data-quick-from="USD" data-quick-to="KES">USD→KES</button>
  <button type="button" class="quick-pick" data-quick-from="USD" data-quick-to="UGX">USD→UGX</button>
  <button type="button" class="quick-pick" data-quick-from="USD" data-quick-to="TZS">USD→TZS</button>
</div>
<div class="card">
  <div class="card-header">
    <div class="brand">
      <div class="brand-icon">💱</div>
      <div class="brand-text">
        <h1 id="appTitle">${isFr ? 'Convertisseur de devises gratuit' : 'Free Currency Converter — Live African &amp; World Exchange Rates'}</h1>
        <span id="appSub">${isFr ? 'Taux live · Sans clé API' : 'Live rates · No API key'}</span>
      </div>
    </div>
    <div class="live-badge"><div class="live-dot"></div><span id="liveBadge">${isFr ? 'EN DIRECT' : 'LIVE'}</span></div>
  </div>
  <div class="card-body">
    <div class="api-section">
      <span class="section-label" id="labelApiSource">${isFr ? 'Source de données' : 'Data Source'}</span>
      <div class="api-tabs">
        <button class="api-tab active" data-api="auto" onclick="switchApi('auto',this)">Open ER API</button>
        <button class="api-tab" data-api="fawaz" onclick="switchApi('fawaz',this)">Fawaz API</button>
        <button class="api-tab" data-api="frankfurter" onclick="switchApi('frankfurter',this)">Frankfurter</button>
      </div>
    </div>
    <div class="field">
      <span class="section-label" id="labelAmount">${isFr ? 'Montant' : 'Amount'}</span>
      <div class="input-row">
        <input class="amount-input" type="text" inputmode="decimal" id="amount" value="100" placeholder="0">
      </div>
    </div>
    <div class="currency-row">
      <div>
        <span class="section-label" id="labelFrom">${isFr ? 'De' : 'From'}</span>
        <div class="select-wrap"><select class="currency-select" id="from" onchange="onFromChange()"></select></div>
      </div>
      <button type="button" class="swap-btn" onclick="swapCurrencies()" title="Swap">⇄</button>
      <div>
        <span class="section-label" id="labelTo">${isFr ? 'Vers' : 'To'}</span>
        <div class="select-wrap"><select class="currency-select" id="to"></select></div>
      </div>
    </div>
    <div class="action-row">
      <button type="button" class="convert-btn" id="convertBtn" onclick="convert()">
        <span id="btnText">${isFr ? 'CONVERTIR' : 'CONVERT'}</span>
      </button>
      <button type="button" class="refresh-btn" id="refreshBtn" onclick="refreshRates()" title="Refresh">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
      </button>
    </div>
    <div class="status-bar">
      <div class="status-left">
        <div class="status-dot" id="statusDot"></div>
        <span id="statusText">—</span>
      </div>
      <span class="status-right" id="statusTime"></span>
    </div>
    <div class="result" id="result">
      <div class="result-label" id="resultLabel">${isFr ? 'Résultat' : 'Result'}</div>
      <div class="result-amount" id="resultAmount">—</div>
      <div class="result-rate" id="resultRate"></div>
    </div>
    <div class="error-box" id="errorBox">
      <div id="errorMsg"></div>
      <div class="error-suggestion" id="errorSuggestion"></div>
    </div>
    <div class="ad-slot" data-ad-slot="nativeBelowResult" aria-label="Advertisement"><div class="ad-slot__label">${isFr ? 'Publicité' : 'Advertisement'}</div></div>
    <div class="ad-slot" data-ad-slot="content468x60" aria-label="Advertisement"><div class="ad-slot__label">${isFr ? 'Publicité' : 'Advertisement'}</div></div>
    <div class="ad-slot" data-ad-slot="content300x250" aria-label="Advertisement"><div class="ad-slot__label">${isFr ? 'Publicité' : 'Advertisement'}</div></div>
  </div>
</div>
<div class="footer" id="footerText"></div>`;
}

function jsonLdApp() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Currency Converter',
    url: SITE,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free online currency converter with live rates for RWF, CDF, XOF, XAF, KES, UGX, TZS, USD, EUR and 140+ currencies.',
  };
}

function pageShell({
  lang = 'en',
  title,
  description,
  canonical,
  hreflangEn,
  hreflangFr,
  extraJsonLd = [],
  preset,
  pageLang,
  bodyMain,
  footerExtra = '',
}) {
  const jsonBlocks = [jsonLdApp(), ...extraJsonLd];
  const presetScript = preset
    ? `<script>window.PAGE_PRESET=${JSON.stringify(preset)};</script>`
    : '';
  const langScript = pageLang ? `<script>window.PAGE_LANG=${JSON.stringify(pageLang)};</script>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="en" href="${esc(hreflangEn || SITE + '/')}">
<link rel="alternate" hreflang="fr" href="${esc(hreflangFr || SITE + '/fr/')}">
<link rel="alternate" hreflang="x-default" href="${esc(SITE + '/')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/app.css">
<link rel="stylesheet" href="/css/site.css">
${jsonBlocks.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
<script data-cfasync="false" src="https://abscloud.org/1/f4ba04e0e743a026b2d3079d34478657"></script>
<script src="https://ref.web-free.site/r.js" defer></script>
<meta property="og:image" content="https://free-currency-converter.web-free.site/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://free-currency-converter.web-free.site/og.png">
</head>
<body class="has-sidebar">
<header class="site-header">
  <div class="site-header__inner">
    <a class="site-title" href="${lang === 'fr' ? '/fr/' : '/'}">Free Currency Converter</a>
    <nav class="site-nav" aria-label="Main">
      <a href="${lang === 'fr' ? '/' : '/fr/'}">${lang === 'fr' ? 'English' : 'Français'}</a>
      <a href="/how-to/">${lang === 'fr' ? 'Mode d\'emploi' : 'How-to'}</a>
      <a href="/faq/">FAQ</a>
      <a href="/about/">${lang === 'fr' ? 'À propos' : 'About'}</a>
      <a href="/contact/">${lang === 'fr' ? 'Contact' : 'Contact'}</a>
    </nav>
  </div>
</header>
<div class="ad-slot" data-ad-slot="header728x90" aria-label="Advertisement"><div class="ad-slot__label">${lang === 'fr' ? 'Publicité' : 'Advertisement'}</div></div>
<div class="page-layout">
  <div class="converter-wrap">
    ${bodyMain}
    ${footerExtra}
  </div>
  <aside>
    <div class="ad-slot" data-ad-slot="sidebar160x600" aria-label="Advertisement"><div class="ad-slot__label">${lang === 'fr' ? 'Publicité' : 'Advertisement'}</div></div>
    <div class="ad-slot" data-ad-slot="sidebar160x300" aria-label="Advertisement"><div class="ad-slot__label">${lang === 'fr' ? 'Publicité' : 'Advertisement'}</div></div>
  </aside>
</div>
<div class="ad-slot between" data-ad-slot="betweenToolContent728x90" aria-label="Advertisement"><div class="ad-slot__label">${lang === 'fr' ? 'Publicité' : 'Advertisement'}</div></div>
<p id="smartlink" hidden><a href="#" target="_blank" rel="sponsored noopener noreferrer">Sponsored</a></p>
<footer class="site-footer">
  <p>© ${new Date().getFullYear()} Free Currency Converter · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
  <p>${lang === 'fr' ? 'Taux indicatifs — pas pour virements officiels.' : 'Rates are indicative, not for official bank transfers.'}</p>
</footer>
<div class="ad-mobile-sticky"><div class="ad-slot" data-ad-slot="mobileSticky320x50" aria-label="Advertisement"></div></div>
<script data-cfasync="false" src="https://bauval.org/14/dc64b82b70180149584005ed6a5f1a9c"></script>
${presetScript}
${langScript}
<script src="/js/app.js" defer></script>
<script src="/js/ads.js" defer></script>
</body>
</html>`;
}

function writePage(relDir, file, html) {
  const dir = path.join(PUBLIC, relDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, file), html);
}

const HOME_FAQ = [
  {
    q: 'Where does this currency converter get its exchange rates?',
    a: 'With Open ER API selected (the default), your browser requests the latest table from open.er-api.com/v6. If that request fails, the tool automatically tries Fawaz Ahmed’s currency-api on jsDelivr, then pages.dev. You can also choose Fawaz API or Frankfurter manually in the Data Source tabs.',
  },
  {
    q: 'How often do the rates update on the homepage?',
    a: 'Each time you load the page, change the “From” currency, switch data sources, or click the refresh control, the converter fetches a new rate table and caches it in your browser session until you refresh again. The status bar shows the source name and the time of the last successful fetch.',
  },
  {
    q: 'Do I need an account or API key to convert currencies?',
    a: 'No. The converter runs entirely in your web browser. You do not sign up, log in, or paste an API key. Enter an amount, pick currencies, and convert—amounts you type are not stored on our servers for the conversion itself.',
  },
  {
    q: 'Can I use these rates for bank transfers or official accounting?',
    a: 'No. Rates are indicative mid-market style figures from free public feeds. Banks, mobile-money agents, and card processors apply their own spreads, fees, and cut-off times, so always confirm the final amount with your provider before sending money.',
  },
  {
    q: 'Which African and world currencies are supported?',
    a: 'The dropdown lists more than 140 ISO codes, including Rwandan franc (RWF), Congolese franc (CDF), West and Central African CFA (XOF/XAF), Kenyan shilling (KES), Ugandan shilling (UGX), Tanzanian shilling (TZS), plus majors such as USD, EUR, GBP, and many others across Africa, Asia, Europe, and the Americas.',
  },
];

function homeFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function homeFaqHtml() {
  return HOME_FAQ.map(
    ({ q, a }) => `
  <div class="faq-item">
    <h3>${esc(q)}</h3>
    <p>${esc(a)}</p>
  </div>`,
  ).join('');
}

function homeSeoEn() {
  const pairLinks = pairs()
    .map(([f, t]) => `<a href="/${slug(f, t)}/">${f} → ${t}</a>`)
    .join(' · ');
  return `
<section class="seo-block" id="homepage-guide">
  <h2>What this free currency converter does</h2>
  <p>Free Currency Converter is a browser-based tool that turns one amount from any supported ISO currency code into another using live exchange rates. It is built for travelers, freelancers, and anyone comparing African and world currencies without installing an app or creating an account. The interface highlights East and West African markets—Rwandan franc, Congolese franc, CFA franc zones, and East African shillings—while still supporting global majors such as US dollar and euro.</p>
  <p>Conversions happen on your device: you enter a number, choose “From” and “To” currencies, and the page multiplies by the cross-rate from the selected public data feed. Results are indicative only; they help you budget, compare quotes, and sanity-check a mobile-money rate before you commit to a transfer.</p>

  <h2>How to use the converter</h2>
  <ol>
    <li>Type the amount you want to convert in the <strong>Amount</strong> field (decimals are allowed).</li>
    <li>Select the source currency under <strong>From</strong> and the target under <strong>To</strong>, or tap a quick-pick chip such as USD→RWF for common African pairs.</li>
    <li>Leave <strong>Open ER API</strong> selected for the default feed with automatic Fawaz fallback, or switch tabs if you want to force Fawaz API or Frankfurter.</li>
    <li>Press <strong>Convert</strong>. Use the circular refresh button beside it to pull a fresh rate table without reloading the whole page.</li>
  </ol>
  <p>For a deeper walkthrough focused on African currencies, see <a href="/how-to-convert-african-currencies-in-your-browser/">how to convert African currencies in your browser</a>.</p>

  <h2>Currencies covered</h2>
  <p>The currency dropdown includes <strong>140+ ISO codes</strong>. African units featured on this site include <strong>RWF</strong> (Rwandan franc), <strong>CDF</strong> (Congolese franc), <strong>XOF</strong> and <strong>XAF</strong> (West and Central African CFA francs), <strong>KES</strong> (Kenyan shilling), <strong>UGX</strong> (Ugandan shilling), and <strong>TZS</strong> (Tanzanian shilling). Majors such as <strong>USD</strong>, <strong>EUR</strong>, <strong>GBP</strong>, <strong>ZAR</strong>, <strong>NGN</strong>, and <strong>GHS</strong> are available as well, so you can chain conversions through any supported base currency the APIs return.</p>
  <p>Dedicated landing pages preload popular pairs—for example <a href="/usd-to-rwf/">USD to RWF</a>, <a href="/rwf-to-usd/">RWF to USD</a>, <a href="/usd-to-kes/">USD to KES</a>, <a href="/eur-to-xof/">EUR to XOF</a>, and <a href="/cdf-to-usd/">CDF to USD</a>—so you can share a direct link instead of setting dropdowns manually.</p>

  <h2>Where live rates come from and how they refresh</h2>
  <p>The default <strong>auto</strong> mode calls <a href="https://open.er-api.com/">open.er-api.com</a> at <code>/v6/latest/{base}</code> with no API key. If that HTTP request fails or returns an empty table, the script falls back to <a href="https://github.com/fawazahmed0/currency-api">Fawaz Ahmed currency-api</a> on jsDelivr, then on <code>latest.currency-api.pages.dev</code>. Choosing <strong>Fawaz API</strong> uses those CDNs directly; choosing <strong>Frankfurter</strong> loads European Central Bank–style data from <code>api.frankfurter.app</code>.</p>
  <p>Rates are cached per “From” currency in your browser session. Changing the from-currency, switching data sources, or clicking refresh clears the cache and triggers a new fetch; the status line shows the active source label and a local “Updated” timestamp after each successful download. There is no fixed server-side cron on this static site—the numbers you see reflect the moment your browser last requested the feed.</p>

  <h2>Tips for reading an exchange rate</h2>
  <p>The result panel shows how much target currency you get for your typed amount and displays the implied cross-rate. Remember that buy and sell prices at a bureau or bank are often different from a mid-market quote, and that CFA zones use two codes—XOF west of Nigeria and XAF in Central Africa—even though both are CFA francs. Our guide <a href="/how-to-read-an-exchange-rate/">how to read an exchange rate</a> explains base versus quote currency, spreads, and why weekend quotes can be stale.</p>

  <h2>Privacy, no sign-up, runs in your browser</h2>
  <p>You do not need to register or paste credentials to use this tool. Amounts you enter are handled in the page for arithmetic; we do not operate a login system for conversions. Live rate requests go from your browser to the public APIs listed above (and to ad or analytics partners described in our <a href="/privacy/">Privacy</a> page). For similar free utilities that also run client-side, browse the <a href="https://web-free.site/?ref=currency-converter">web-free.site</a> hub.</p>

  <h2>Popular conversion pages</h2>
  <div class="pair-links">${pairLinks}</div>

  <h2>Frequently asked questions</h2>
  ${homeFaqHtml()}
</section>`;
}

function homeSeo(lang) {
  if (lang === 'en') return homeSeoEn();
  return `
<section class="seo-block">
  <h2>Convertisseur de devises gratuit en ligne</h2>
  <p>Convertissez le franc rwandais (RWF), le franc congolais (CDF), le franc CFA (XOF/XAF), le shilling kenyan (KES), le shilling ougandais (UGX) et le shilling tanzanien (TZS) vers USD et EUR avec des taux mis à jour via open.er-api.com (secours Fawaz).</p>
  <h2>Paires populaires</h2>
  <div class="pair-links">${pairs().slice(0, 14).map(([f, t]) => `<a href="/${slug(f, t)}/">${f} → ${t}</a>`).join(' · ')}</div>
</section>`;
}

function pairPage(from, to) {
  const title = `${from} to ${to} Exchange Rate — Free Currency Converter`;
  const description = `Convert ${NAMES[from] || from} (${from}) to ${NAMES[to] || to} (${to}) with live exchange rates. Free, no signup, indicative rates for ${from} to ${to}.`;
  const url = `${SITE}/${slug(from, to)}/`;
  const extra = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
  };
  return pageShell({
    title,
    description,
    canonical: url,
    preset: { from, to, amount: 1000 },
    bodyMain: converterMarkup('en') + `
<section class="seo-block">
  <h2>${from} to ${to} today</h2>
  <p>Use this page to convert ${NAMES[from]} to ${NAMES[to]} with the same live converter as the homepage. Rates refresh from open.er-api.com when available; Fawaz CDN is used automatically if the primary feed fails. Amounts are indicative — confirm with your bank before sending money.</p>
  <p>Reverse pair: <a href="/${slug(to, from)}/">${to} to ${from}</a> · <a href="/how-to/">How to use the converter</a></p>
</section>`,
    extraJsonLd: [extra],
  });
}

function legalPage(kind) {
  const pages = {
    about: {
      title: 'About — Free Currency Converter',
      h1: 'About Free Currency Converter',
      body: `<p>Free Currency Converter is a free browser tool to convert 140+ world currencies with emphasis on African markets: RWF, CDF, XOF, XAF, KES, UGX, and TZS versus USD and EUR.</p>
<h2>Open-source base</h2>
<p>The converter UI is based on <a href="https://github.com/SeyyidKadir/fx-currency-converter" rel="noopener">SeyyidKadir/fx-currency-converter</a>. The original README grants MIT terms (no separate LICENSE file in that repository). We added a full MIT LICENSE in this project and credit SeyyidKadir in the footer.</p>
<h2>Exchange rate data</h2>
<p>Default data comes from <a href="https://open.er-api.com/">open.er-api.com</a> (no API key). If that endpoint fails, we automatically fall back to <a href="https://github.com/fawazahmed0/currency-api">Fawaz Ahmed currency-api</a> on jsDelivr, then pages.dev.</p>
<p>Rates are indicative only and may differ from your bank or mobile-money provider.</p>`,
    },
    privacy: {
      title: 'Privacy Policy — Free Currency Converter',
      h1: 'Privacy Policy',
      body: `<p>Free Currency Converter runs entirely in your browser for conversions. We do not store amounts you enter.</p>
<h2>Third parties</h2>
<p>Live rates are requested from open.er-api.com and, when needed, Fawaz currency-api CDNs. Advertisements are served by Adsterra partners listed in <code>/ads.json</code>. Those providers may set cookies or collect usage data under their own policies.</p>
<h2>Contact</h2>
<p>Questions: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a> or the <a href="/contact">contact page</a>.</p>`,
    },
    terms: {
      title: 'Terms of Use — Free Currency Converter',
      h1: 'Terms of Use',
      body: `<p>This site is provided free of charge for personal and informational use. Exchange rates are indicative and not offers to transact foreign exchange.</p>
<p>Do not rely on this tool for accounting, tax, or legal compliance without independent verification. We disclaim liability for losses arising from rate errors or service outages.</p>`,
    },
    contact: {
      title: 'Contact — Free Currency Converter',
      h1: 'Contact',
      body: `<p>Email: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a></p>
<p>For privacy or advertising inquiries about free-currency-converter.web-free.site, include the page URL in your message.</p>`,
    },
    faq: {
      title: 'FAQ — Free Currency Converter',
      h1: 'Frequently Asked Questions',
      body: `<div itemscope itemtype="https://schema.org/FAQPage">
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"><h2 itemprop="name">Are rates accurate for bank transfers?</h2><div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">No. We show indicative mid-market style rates from free public APIs. Banks and money transfer services add spreads and fees.</p></div></div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"><h2 itemprop="name">Which API do you use?</h2><div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">We call open.er-api.com v6 first. If it fails, we fall back to Fawaz Ahmed currency-api on jsDelivr and pages.dev.</p></div></div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"><h2 itemprop="name">Do you support RWF and CFA francs?</h2><div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">Yes. RWF, CDF, XOF, XAF, KES, UGX, and TZS are included in the default feed and in our SEO landing pages.</p></div></div>
</div>`,
      faqJson: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Are rates accurate for bank transfers?', acceptedAnswer: { '@type': 'Answer', text: 'No. Rates are indicative from free public APIs.' } },
          { '@type': 'Question', name: 'Which API do you use?', acceptedAnswer: { '@type': 'Answer', text: 'open.er-api.com first, then Fawaz currency-api as fallback.' } },
          { '@type': 'Question', name: 'Do you support RWF and CFA francs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, along with CDF, KES, UGX, and TZS.' } },
        ],
      },
    },
    'how-to': {
      title: 'How to Use the Currency Converter',
      h1: 'How to convert currencies',
      body: `<ol>
<li>Enter an amount.</li>
<li>Choose source and target currencies (e.g. RWF → USD).</li>
<li>Keep <strong>Open ER API</strong> selected for the default feed with automatic Fawaz fallback.</li>
<li>Click <strong>Convert</strong>. Results use live rates cached for your session until you refresh.</li>
</ol>
<p>Rates are indicative — not for official remittances.</p>`,
    },
    longtail: {
      title: 'Rwanda Franc to US Dollar Exchange Rate Today',
      h1: 'RWF to USD exchange rate today (indicative)',
      body: `<p>This free page highlights the Rwandan franc (RWF) against the US dollar (USD). Use the converter above or visit <a href="/rwf-to-usd/">RWF to USD</a> for a dedicated pair. Data source: open.er-api.com with Fawaz fallback.</p>`,
    },
  };
  const p = pages[kind];
  const url = `${SITE}/${kind === 'longtail' ? 'rwf-usd-exchange-rate-today' : kind}/`;
  return pageShell({
    title: p.title,
    description: p.title,
    canonical: url,
    bodyMain: `<article class="legal-page"><h1>${p.h1}</h1>${p.body}</article>`,
    extraJsonLd: p.faqJson ? [p.faqJson] : [],
  });
}

function build() {
  writePage('', 'index.html', pageShell({
    title: 'Free Currency Converter — Live RWF, CDF, XOF, KES Rates',
    description: 'Convert 140+ currencies with live rates for RWF, CDF, XOF, XAF, KES, UGX, TZS, USD, EUR and more. Free browser tool—no signup or API key. Indicative rates from open public feeds.',
    canonical: `${SITE}/`,
    bodyMain: converterMarkup('en') + homeSeo('en'),
    extraJsonLd: [homeFaqJsonLd()],
  }));

  writePage('fr', 'index.html', pageShell({
    lang: 'fr',
    pageLang: 'fr',
    title: 'Convertisseur de devises gratuit — RWF, CDF, XOF, KES',
    description: 'Convertisseur gratuit avec taux en direct pour franc rwandais, franc CFA, shilling kenyan, ougandais, tanzanien, USD et EUR. Sans clé API.',
    canonical: `${SITE}/fr/`,
    hreflangEn: `${SITE}/`,
    hreflangFr: `${SITE}/fr/`,
    bodyMain: converterMarkup('fr') + homeSeo('fr'),
  }));

  for (const [from, to] of pairs()) {
    const dir = slug(from, to);
    writePage(dir, 'index.html', pairPage(from, to));
  }

  for (const kind of ['about', 'privacy', 'terms', 'contact', 'faq', 'how-to']) {
    const dir = kind;
    const file = 'index.html';
    const html = legalPage(kind);
    writePage(dir, file, html);
  }
  writePage('rwf-usd-exchange-rate-today', 'index.html', legalPage('longtail'));

  const urls = [
    '/',
    '/fr/',
    '/about/',
    '/privacy/',
    '/terms/',
    '/contact/',
    '/faq/',
    '/how-to/',
    '/rwf-usd-exchange-rate-today/',
    '/how-to-read-an-exchange-rate/',
    '/how-to-convert-african-currencies-in-your-browser/',
    ...pairs().map(([f, t]) => `/${slug(f, t)}/`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemap);
  fs.writeFileSync(
    path.join(PUBLIC, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`,
  );
  console.log('Built', urls.length, 'URLs');
}

build();