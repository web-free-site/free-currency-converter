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
        <h1 id="appTitle">${isFr ? 'Convertisseur de devises gratuit' : 'Free Currency Converter'}</h1>
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
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/app.css">
<link rel="stylesheet" href="/css/site.css">
${jsonBlocks.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
<script data-cfasync="false" src="https://abscloud.org/1/f4ba04e0e743a026b2d3079d34478657"></script>
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

function homeSeo(lang) {
  const isFr = lang === 'fr';
  return `
<section class="seo-block">
  <h2>${isFr ? 'Convertisseur de devises gratuit en ligne' : 'Free online currency converter'}</h2>
  <p>${isFr
    ? 'Convertissez le franc rwandais (RWF), le franc congolais (CDF), le franc CFA (XOF/XAF), le shilling kenyan (KES), le shilling ougandais (UGX) et le shilling tanzanien (TZS) vers USD et EUR avec des taux mis à jour via open.er-api.com (secours Fawaz).'
    : 'Convert Rwandan franc (RWF), Congolese franc (CDF), West and Central African CFA (XOF/XAF), Kenyan shilling (KES), Ugandan shilling (UGX), and Tanzanian shilling (TZS) to USD and EUR using live rates from open.er-api.com with Fawaz CDN fallback.'}</p>
  <h2>${isFr ? 'Paires populaires' : 'Popular conversion pages'}</h2>
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
    howto: {
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
    description: 'Free currency converter with live exchange rates for Rwandan franc, CFA, Kenyan shilling, Ugandan shilling, Tanzanian shilling, USD, EUR and 140+ currencies. No API key.',
    canonical: `${SITE}/`,
    bodyMain: converterMarkup('en') + homeSeo('en'),
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
    const html = legalPage(kind === 'how-to' ? 'howto' : kind);
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