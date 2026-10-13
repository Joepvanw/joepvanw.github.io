/* =============================================
   HERO TEAR
   Draws a torn opening in the empty space between the hero text and the
   stat cards. On load the tear rips open while the hero trembles briefly.
   Skipped when there is no room for it (stacked mobile layout).
   ============================================= */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const content = hero.querySelector('.hero__content');
  const cards = hero.querySelectorAll('.hero__card');
  if (!content || !cards.length) return;

  const NS = 'http://www.w3.org/2000/svg';
  const RIP_DELAY = 350;     // ms before the tear starts forming
  const RIP_DURATION = 750;  // ms for the tear to fully open
  const MIN_GAP = 140;       // px of free space needed to draw the tear
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Seeded random, so the tear looks the same on every visit and every resize.
  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    if (parent) parent.appendChild(node);
    return node;
  }

  const toPoints = (list) => list.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

  // Jagged line through the control points.
  function centerline(ctrl, step, jag, rand) {
    const out = [];
    for (let i = 0; i < ctrl.length - 1; i++) {
      const [ax, ay] = ctrl[i];
      const [bx, by] = ctrl[i + 1];
      const len = Math.hypot(bx - ax, by - ay);
      const n = Math.max(2, Math.round(len / step));
      const nx = -(by - ay) / len;
      const ny = (bx - ax) / len;
      for (let j = 0; j < n; j++) {
        const t = j / n;
        const off = (rand() - 0.5) * jag * 2;
        out.push([ax + (bx - ax) * t + nx * off, ay + (by - ay) * t + ny * off]);
      }
    }
    out.push(ctrl[ctrl.length - 1].slice());
    return out;
  }

  // Ragged two-sided outline around a centerline. `widthAt(t)` gives the
  // opening width at position t (0..1) along the line.
  function outline(line, widthAt, rag, rand) {
    const left = [];
    const right = [];
    const normals = [];
    const n = line.length;
    for (let i = 0; i < n; i++) {
      const prev = line[Math.max(i - 1, 0)];
      const next = line[Math.min(i + 1, n - 1)];
      const dx = next[0] - prev[0];
      const dy = next[1] - prev[1];
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const half = widthAt(i / (n - 1)) / 2;
      const l = half + (rand() - 0.5) * rag;
      const r = half + (rand() - 0.5) * rag;
      left.push([line[i][0] + nx * l, line[i][1] + ny * l]);
      right.push([line[i][0] - nx * r, line[i][1] - ny * r]);
      normals.push([nx, ny]);
    }
    return { line, left, right, normals, poly: left.concat(right.slice().reverse()) };
  }

  // Thin crack running out from the tear, thickest at its origin.
  function crack(svg, from, angle, length, width, rand) {
    const ctrl = [from];
    const segs = 3 + Math.floor(rand() * 3);
    let a = angle;
    let p = from;
    for (let i = 0; i < segs; i++) {
      a += (rand() - 0.5) * 0.9;
      p = [p[0] + Math.cos(a) * (length / segs), p[1] + Math.sin(a) * (length / segs)];
      ctrl.push(p);
    }
    const shape = outline(centerline(ctrl, 5, 1.2, rand), (t) => width * (1 - t), 0.3, rand);
    el('polygon', { points: toPoints(shape.poly), fill: 'rgba(15,23,42,.4)' }, svg);
  }

  function cracks(svg, tear, count, length, width, spread, rand) {
    for (let i = 0; i < count; i++) {
      const fromLeft = rand() < 0.5;
      const edge = fromLeft ? tear.left : tear.right;
      const idx = Math.round((0.08 + rand() * 0.84) * (edge.length - 1));
      const [nx, ny] = tear.normals[idx];
      const dir = fromLeft ? 1 : -1;
      const angle = Math.atan2(ny * dir, nx * dir) + (rand() - 0.5) * spread;
      crack(svg, edge[idx], angle, length * (0.5 + rand()), width, rand);
    }
  }

  // A piece of the page curled back over the edge of the tear.
  function flap(svg, tear, fromLeft, t0, t1, height) {
    const edge = fromLeft ? tear.left : tear.right;
    const i0 = Math.round(t0 * (edge.length - 1));
    const i1 = Math.round(t1 * (edge.length - 1));
    const iMid = Math.round((i0 + i1) / 2);
    const a = edge[i0];
    const b = edge[i1];
    const [nx, ny] = tear.normals[iMid];
    const dir = fromLeft ? 1 : -1;
    const apex = [
      edge[iMid][0] + nx * height * dir + (b[0] - a[0]) * 0.25,
      edge[iMid][1] + ny * height * dir + (b[1] - a[1]) * 0.25,
    ];
    const base = edge.slice(i0, i1 + 1);
    const d = 'M' + toPoints(base).split(' ').join(' L') +
      ' Q' + ((b[0] + apex[0]) / 2 + nx * 6 * dir) + ',' + ((b[1] + apex[1]) / 2 + ny * 6 * dir) + ' ' + apex[0] + ',' + apex[1] +
      ' Q' + ((a[0] + apex[0]) / 2) + ',' + ((a[1] + apex[1]) / 2) + ' ' + a[0] + ',' + a[1] + ' Z';
    el('path', { d, fill: 'url(#tear-flap)', stroke: '#fff', 'stroke-width': 1.5, filter: 'url(#tear-lift)', 'stroke-linejoin': 'round' }, svg);
  }

  function debris(svg, tear, count, spread, rand) {
    for (let i = 0; i < count; i++) {
      const p = tear.line[Math.floor(rand() * tear.line.length)];
      const angle = rand() * Math.PI * 2;
      const dist = spread * (0.4 + rand());
      const x = p[0] + Math.cos(angle) * dist;
      const y = p[1] + Math.sin(angle) * dist;
      const s = 1 + rand() * 3;
      const tri = [[x, y - s], [x + s * (0.6 + rand()), y + s * 0.6], [x - s * (0.6 + rand()), y + s * (0.4 + rand())]];
      el('polygon', { points: toPoints(tri), fill: rand() < 0.6 ? '#fff' : '#334155', opacity: 0.55 + rand() * 0.45 }, svg);
    }
  }

  function defs(svg) {
    el('defs', {}, svg).innerHTML =
      '<linearGradient id="tear-under" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#0b1225"/><stop offset=".55" stop-color="#1e293b"/><stop offset="1" stop-color="#3b2a1a"/>' +
      '</linearGradient>' +
      '<linearGradient id="tear-flap" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#e8f0fd"/><stop offset="1" stop-color="#c9d8f3"/>' +
      '</linearGradient>' +
      '<filter id="tear-rough" x="-20%" y="-20%" width="140%" height="140%">' +
        '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/>' +
      '</filter>' +
      '<filter id="tear-grain" x="0" y="0" width="100%" height="100%">' +
        '<feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="9"/>' +
        '<feColorMatrix values="0 0 0 0 .55  0 0 0 0 .42  0 0 0 0 .3  0 0 0 1.4 -.55"/>' +
      '</filter>' +
      '<filter id="tear-inner" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>' +
      '<filter id="tear-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>' +
      '<filter id="tear-lift" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#0f172a" flood-opacity=".28"/>' +
      '</filter>';
  }

  // The opening itself: shadow on the page, white torn fibres, dark depth inside.
  function hole(svg, tear) {
    const points = toPoints(tear.poly);
    el('polygon', { points, fill: 'none', stroke: 'rgba(15,23,42,.22)', 'stroke-width': 9, filter: 'url(#tear-soft)', 'stroke-linejoin': 'round' }, svg);
    el('polygon', { points, fill: '#fff', stroke: '#fff', 'stroke-width': 5, filter: 'url(#tear-rough)', 'stroke-linejoin': 'round' }, svg);

    const clip = el('clipPath', { id: 'tear-clip' }, svg);
    el('polygon', { points }, clip);
    const inside = el('g', { 'clip-path': 'url(#tear-clip)' }, svg);
    const xs = tear.poly.map((p) => p[0]);
    const ys = tear.poly.map((p) => p[1]);
    const box = { x: Math.min(...xs) - 20, y: Math.min(...ys) - 20 };
    box.width = Math.max(...xs) - box.x + 20;
    box.height = Math.max(...ys) - box.y + 20;
    el('rect', { ...box, fill: 'url(#tear-under)' }, inside);
    el('rect', { ...box, filter: 'url(#tear-grain)', opacity: 0.65 }, inside);
    el('polygon', { points, fill: 'none', stroke: '#000', 'stroke-width': 18, opacity: 0.7, filter: 'url(#tear-inner)' }, inside);
  }

  // Free space between the text column and the cards, in hero coordinates.
  function layout() {
    const heroBox = hero.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    let cardsLeft = Infinity;
    cards.forEach((card) => { cardsLeft = Math.min(cardsLeft, card.getBoundingClientRect().left); });
    const gapLeft = contentBox.right - heroBox.left;
    const gapRight = cardsLeft - heroBox.left;
    return {
      width: heroBox.width,
      height: heroBox.height,
      gap: gapRight - gapLeft,
      mid: (gapLeft + gapRight) / 2,
    };
  }

  // `k` (0..1) is how far the tear has opened.
  function draw(box, k) {
    const svg = el('svg', { class: 'hero__tear', width: box.width, height: box.height, viewBox: '0 0 ' + box.width + ' ' + box.height, 'aria-hidden': 'true' });
    defs(svg);

    const H = box.height;
    const x = box.mid;
    const line = centerline([
      [x + 55, H * 0.04], [x + 20, H * 0.2], [x + 45, H * 0.38], [x - 5, H * 0.56],
      [x + 20, H * 0.74], [x - 35, H * 0.96],
    ], 8, 5, rng(64));
    const widthRand = rng(37);
    const tear = outline(line, (t) => 88 * k * Math.pow(Math.sin(Math.PI * t), 0.6) * (0.75 + widthRand() * 0.5), 5.5, rng(91));

    const crackRand = rng(19);
    cracks(svg, tear, 11, 85 * k, 2.6, 1.2, crackRand);
    cracks(svg, tear, 10, 40 * k, 1.5, 1.4, crackRand);
    hole(svg, tear);
    if (k > 0.55) {
      flap(svg, tear, true, 0.2, 0.32, 50 * k);
      flap(svg, tear, false, 0.42, 0.54, 56 * k);
      flap(svg, tear, true, 0.66, 0.77, 42 * k);
    }
    debris(svg, tear, Math.round(36 * k), 60, rng(31));
    return svg;
  }

  let current = null;
  let frame = 0;

  function paint(k) {
    const box = layout();
    if (current) current.remove();
    current = null;
    if (box.gap < MIN_GAP) return;
    current = draw(box, k);
    hero.appendChild(current);
  }

  function rip() {
    if (reduceMotion || layout().gap < MIN_GAP) { paint(1); return; }
    setTimeout(() => {
      hero.classList.add('hero--tremble');
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / RIP_DURATION);
        paint(Math.max(0.02, 1 - Math.pow(1 - t, 3))); // ease-out: rips fast, then settles
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, RIP_DELAY);
  }

  hero.addEventListener('animationend', (e) => {
    if (e.animationName === 'hero-tremble') hero.classList.remove('hero--tremble');
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { cancelAnimationFrame(frame); paint(1); }, 120);
  });

  // Wait for fonts so the measured gap matches the final layout.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rip);
  else rip();
})();
