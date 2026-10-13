/* PROTOTYPE — throwaway script for prototype-homepage.html. Forms are stubs; nothing is sent. */

/* =============================================
   VARIANT SWITCHER
   Hidden variants keep their ids under data-pv-id so the visible variant owns
   the shared anchors (#pv-contact etc).
   ============================================= */
const variants = Array.from(document.querySelectorAll('.pv'));
const keys = variants.map(v => v.dataset.variant);

function showVariant(key) {
  if (!keys.includes(key)) key = keys[0];
  variants.forEach(v => {
    const active = v.dataset.variant === key;
    v.hidden = !active;
    v.querySelectorAll(active ? '[data-pv-id]' : '[id]').forEach(el => {
      if (active) { el.id = el.dataset.pvId; delete el.dataset.pvId; }
      else { el.dataset.pvId = el.id; el.removeAttribute('id'); }
    });
  });
  const v = variants.find(v => v.dataset.variant === key);
  document.getElementById('pvLabel').textContent = `${key} — ${v.dataset.name}`;
  const url = new URL(location.href);
  url.searchParams.set('variant', key);
  history.replaceState(null, '', url);
  window.scrollTo(0, 0);
}

function cycle(dir) {
  const current = new URL(location.href).searchParams.get('variant') || keys[0];
  const i = (keys.indexOf(current) + dir + keys.length) % keys.length;
  showVariant(keys[i]);
}

// Only shown when served locally, so the bar can never leak onto the live domain.
if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
  document.getElementById('pvSwitcher').hidden = false;
  document.getElementById('pvPrev').addEventListener('click', () => cycle(-1));
  document.getElementById('pvNext').addEventListener('click', () => cycle(1));
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowLeft') cycle(-1);
    if (e.key === 'ArrowRight') cycle(1);
  });
}

/* =============================================
   SHARED: header, mobile menu, FAQ, stub forms
   ============================================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  nav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  nav.classList.remove('open');
}));

document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    btn.nextElementSibling.classList.toggle('open', open);
  });
});

function stubSubmit(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log('[prototype] form would submit:', data);
    form.querySelector('.pv-stub-msg').hidden = false;
  });
}
document.querySelectorAll('.pv-stub-form').forEach(stubSubmit);

document.querySelectorAll('[data-scroll-top]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => document.querySelector('.pva-callback input')?.focus(), 400);
}));

/* =============================================
   VARIANT B — KEUZEHULP
   ============================================= */
// Deadlines are PLACEHOLDERS — Joep must verify the real IMG termijnen.
const ZIENSWIJZE_DAGEN = 14;
const BEZWAAR_DAGEN = 42;

const SITUATIES = {
  nieuw:     'Schade, nog niets gemeld',
  rapport:   'Adviesrapport ontvangen, niet eens',
  besluit:   'Besluit ontvangen, wil bezwaar',
  vast:      'Twijfel vaste vergoeding / maatwerk',
  afgewezen: 'Eerder afgewezen',
  anders:    'Iets anders',
};

let quiz = null; // { situatie, step, answers: {} }

function questionsFor(situatie) {
  const qs = [{ key: 'postcode', label: 'Postcode', q: 'Wat is de postcode van de woning?', type: 'text', placeholder: '9900 AB' }];
  if (situatie === 'rapport') {
    qs.push({ key: 'datum', label: 'Rapport ontvangen op', q: 'Wanneer heeft u het adviesrapport ontvangen?', type: 'date' });
  } else if (situatie === 'besluit') {
    qs.push({ key: 'datum', label: 'Datum besluit', q: 'Welke datum staat op het besluit van het IMG?', type: 'date' });
  } else {
    qs.push({ key: 'ernst', label: 'Schade', q: 'Hoe zou u de schade omschrijven?', type: 'opts',
      opts: ['Een paar kleine scheurtjes', 'Meerdere scheuren of scheve deuren/ramen', 'Ernstige schade, bijv. fundering of verzakking'] });
  }
  qs.push({ key: 'eigenaar', label: 'Eigendom', q: 'Bent u eigenaar van de woning?', type: 'opts',
    opts: ['Ja, ik ben eigenaar', 'Nee, ik huur', 'Het is een VvE / bedrijfspand'] });
  return qs;
}

function daysLeft(dateStr, termijn) {
  const start = new Date(dateStr);
  if (isNaN(start)) return null;
  const end = new Date(start.getTime() + termijn * 864e5);
  return Math.ceil((end - new Date()) / 864e5);
}

function advice(s, a) {
  const groot = a.ernst && !a.ernst.startsWith('Een paar');
  const res = {
    nieuw:     groot
      ? { route: 'Maatwerk', title: 'Waarschijnlijk levert maatwerk meer op', text: 'Bij meerdere of ernstige schades is een volledige opname vaak de moeite waard. Joep loopt met u door wat u kunt verwachten.' }
      : { route: 'Vaste vergoeding', title: 'De vaste vergoeding kan voor u volstaan', text: 'Bij beperkte schade is de vaste vergoeding (tot €10.000) snel geregeld. Joep checkt of maatwerk niet toch meer oplevert.' },
    vast:      groot
      ? { route: 'Maatwerk', title: 'Kies niet te snel voor de vaste vergoeding', text: 'Met deze schade loopt u mogelijk geld mis als u de vaste vergoeding kiest. Laat het eerst bekijken.' }
      : { route: 'Vaste vergoeding', title: 'Vaste vergoeding lijkt logisch — maar check het', text: 'Joep rekent in het gesprek beide routes voor u door.' },
    rapport:   { route: 'Zienswijze', title: 'U kunt nog reageren op het rapport', text: 'Met een zienswijze wijst u het IMG op gemiste of te laag ingeschatte schade, vóórdat het besluit valt.' },
    besluit:   { route: 'Bezwaar', title: 'Bezwaar maken is mogelijk', text: 'Joep beoordeelt het besluit en schrijft het bezwaar, zo nodig met een contra-expertise.' },
    afgewezen: { route: 'Herbeoordeling', title: 'Een afwijzing is niet altijd het einde', text: 'Afhankelijk van wanneer en waarom u bent afgewezen, is een nieuwe melding of bezwaar mogelijk.' },
    anders:    { route: 'Gratis gesprek', title: 'Laten we het gewoon even bespreken', text: 'Joep belt u en zoekt samen met u uit wat de beste stap is.' },
  }[s];

  if (a.datum) {
    const left = daysLeft(a.datum, s === 'rapport' ? ZIENSWIJZE_DAGEN : BEZWAAR_DAGEN);
    if (left !== null) res.deadline = left;
  }
  if (a.eigenaar && !a.eigenaar.startsWith('Ja')) {
    res.extra = a.eigenaar.includes('huur')
      ? 'Let op: als huurder heeft u toestemming van de eigenaar nodig. Joep legt uit hoe dat werkt.'
      : 'Voor VvE’s en bedrijfspanden werkt het traject iets anders — Joep bespreekt dit met u.';
  }
  return res;
}

function renderState() {
  const dl = document.getElementById('pvbState');
  const rows = [['Situatie', SITUATIES[quiz.situatie]]];
  questionsFor(quiz.situatie).forEach(q => rows.push([q.label, quiz.answers[q.key] || '—']));
  dl.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
}

function renderStep() {
  const qs = questionsFor(quiz.situatie);
  const box = document.getElementById('pvbStep');
  document.getElementById('pvbProgress').style.width = `${Math.min(quiz.step, qs.length) / qs.length * 100}%`;
  renderState();

  if (quiz.step >= qs.length) return renderResult();

  const q = qs[quiz.step];
  let body = '';
  if (q.type === 'opts') {
    body = `<div class="pvb-opts">${q.opts.map(o => `<button class="pvb-opt" type="button">${o}</button>`).join('')}</div>`;
  } else {
    body = `<form class="pvb-input"><input type="${q.type}" placeholder="${q.placeholder || ''}" value="${quiz.answers[q.key] || ''}" required><button class="btn btn--primary" type="submit">Volgende →</button></form>`;
  }
  box.innerHTML = `<p class="pvb-q">${q.q}</p>${body}${quiz.step > 0 ? '<button class="pvb-back" type="button">← Vorige vraag</button>' : ''}`;

  box.querySelectorAll('.pvb-opt').forEach(b => b.addEventListener('click', () => answer(q.key, b.textContent)));
  const f = box.querySelector('form');
  if (f) {
    f.addEventListener('submit', e => { e.preventDefault(); answer(q.key, f.querySelector('input').value.trim()); });
    f.querySelector('input').focus();
  }
  box.querySelector('.pvb-back')?.addEventListener('click', () => { quiz.step--; renderStep(); });
}

function answer(key, value) {
  if (!value) return;
  quiz.answers[key] = value;
  quiz.step++;
  renderStep();
}

function renderResult() {
  const r = advice(quiz.situatie, quiz.answers);
  let deadline = '';
  if (r.deadline !== undefined) {
    deadline = r.deadline > 0
      ? `<div class="pvb-alert">⏱ Nog ongeveer <strong>${r.deadline} dagen</strong> om te reageren <mark class="ph">(termijn verifiëren)</mark>. Wacht niet te lang.</div>`
      : `<div class="pvb-alert">⏱ De gebruikelijke termijn lijkt verstreken. Neem toch contact op — soms is er nog iets mogelijk.</div>`;
  }
  const summary = [SITUATIES[quiz.situatie], ...Object.values(quiz.answers)].join(' · ');
  document.getElementById('pvbStep').innerHTML = `
    <div class="pvb-result">
      <span class="pvb-result__route">Advies: ${r.route}</span>
      <h3>${r.title}</h3>
      <p>${r.text}</p>
      ${deadline}
      ${r.extra ? `<div class="pvb-alert pvb-alert--ok">ℹ️ ${r.extra}</div>` : ''}
      <div class="pvb-cost"><strong>Kosten:</strong> €0 vooraf. Pas na uitbetaling <mark class="ph">XX%</mark> — geen resultaat, geen kosten.</div>
      <form class="pvb-form pv-stub-form" novalidate>
        <label>Naam<input name="naam" required></label>
        <label>Telefoon<input name="tel" type="tel" required></label>
        <label class="is-wide">E-mail (optioneel)<input name="email" type="email"></label>
        <label class="is-wide">IMG-rapport of brief meesturen (optioneel)<input name="bestand" type="file" accept=".pdf,image/*"></label>
        <label class="is-wide">Uw antwoorden (gaan mee)<textarea name="samenvatting" rows="2">${summary}</textarea></label>
        <button class="btn btn--primary btn--lg is-wide" type="submit">Stuur naar Joep — hij belt binnen 1 werkdag</button>
        <p class="pv-stub-msg is-wide" hidden>✓ (prototype) Verstuurd — Joep belt u terug.</p>
      </form>
    </div>`;
  stubSubmit(document.querySelector('.pvb-form'));
}

function startQuiz(situatie) {
  quiz = { situatie, step: 0, answers: {} };
  document.querySelectorAll('.pvb-tile').forEach(t => t.classList.toggle('is-active', t.dataset.situatie === situatie));
  const check = document.getElementById('pvbCheck');
  check.hidden = false;
  renderStep();
  check.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.pvb-tile').forEach(t => t.addEventListener('click', () => startQuiz(t.dataset.situatie)));
document.getElementById('pvbReset').addEventListener('click', () => {
  document.getElementById('pvbCheck').hidden = true;
  document.querySelectorAll('.pvb-tile').forEach(t => t.classList.remove('is-active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   VARIANT C — FEE CALCULATOR
   ============================================= */
const euro = n => '€' + Math.round(n).toLocaleString('nl-NL');
const range = document.getElementById('pvcRange');
const pct = document.getElementById('pvcPct');

function calc() {
  const amount = +range.value;
  const p = +pct.value / 100;
  const fee = amount * p;
  document.getElementById('pvcAmount').textContent = euro(amount);
  document.getElementById('pvcPctLabel').textContent = `${pct.value}%`;
  document.getElementById('pvcKeep').textContent = euro(amount - fee);
  document.getElementById('pvcFee').textContent = euro(fee);
  document.getElementById('pvcBarKeep').style.width = `${(1 - p) * 100}%`;
  document.getElementById('pvcBarFee').style.width = `${p * 100}%`;
}
range.addEventListener('input', calc);
pct.addEventListener('input', calc);
calc();

// Last, so every variant's elements were wired up while they still had their ids.
showVariant(new URL(location.href).searchParams.get('variant') || 'A');
