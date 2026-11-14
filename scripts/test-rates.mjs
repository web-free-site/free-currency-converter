#!/usr/bin/env node

const AFRICAN = ['RWF', 'CDF', 'XOF', 'XAF', 'KES', 'UGX', 'TZS'];

async function fetchOpenEr(base) {
  const r = await fetch(`https://open.er-api.com/v6/latest/${base}`);
  if (!r.ok) throw new Error(`open.er ${base}: ${r.status}`);
  const d = await r.json();
  return d.rates;
}

async function fetchFawaz(base) {
  const b = base.toLowerCase();
  let r = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${b}.json`);
  if (!r.ok) {
    r = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${b}.json`);
  }
  if (!r.ok) throw new Error(`fawaz ${base}: ${r.status}`);
  const d = await r.json();
  return d[b];
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  const usd = await fetchOpenEr('USD');
  for (const c of AFRICAN) {
    assert(typeof usd[c] === 'number' && usd[c] > 0, `USD missing ${c}`);
  }

  const rwf = await fetchOpenEr('RWF');
  assert(typeof rwf.USD === 'number', 'RWF base missing USD');

  const pairs = [
    ['RWF', 'USD'],
    ['CDF', 'EUR'],
    ['XOF', 'USD'],
    ['KES', 'UGX'],
    ['TZS', 'EUR'],
  ];
  for (const [from, to] of pairs) {
    const rates = await fetchOpenEr(from);
    assert(rates[to], `${from}->${to} via open.er`);
    const amt = 1000;
    const out = amt * rates[to];
    assert(out > 0, `conversion ${from} ${to}`);
  }

  const blockHosts = new Set();
  try {
    await fetchOpenEr('USD');
  } catch {
    blockHosts.add('open.er');
  }
  if (blockHosts.has('open.er')) {
    const rw = await fetchFawaz('rwf');
    assert(rw.usd, 'fawaz fallback rwf->usd');
  }

  console.log('test:rates OK', { openErUsdRwanda: usd.RWF, pairs: pairs.length });
}

main().catch((e) => {
  console.error('test:rates FAILED', e.message);
  process.exit(1);
});