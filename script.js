(function () {
  'use strict';

  /* =====================================================
     1. VẼ BÓ HOA BẰNG SVG
     ===================================================== */

  // Bộ sinh số ngẫu nhiên cố định, để bó hoa luôn giống nhau mỗi lần tải
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = mulberry32(20261019);
  const f = n => Math.round(n * 10) / 10;

  function ring(n, dist, rx, ry, off, fill, stroke) {
    let out = '';
    for (let i = 0; i < n; i++) {
      const a = off + (360 / n) * i;
      const r = (a * Math.PI) / 180;
      const px = Math.cos(r) * dist;
      const py = Math.sin(r) * dist;
      out += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" ` +
             `transform="rotate(${f(a + 90)} ${f(px)} ${f(py)})" ` +
             `fill="${fill}" stroke="${stroke}" stroke-width="0.9"/>`;
    }
    return out;
  }

  // Một bông hồng nhìn từ phía trước: nhiều lớp cánh chồng lên nhau
  function rose(x, y, s, h, sat, lig) {
    const c = dl => `hsl(${h} ${sat}% ${Math.max(8, Math.min(94, lig + dl))}%)`;
    const rot = f(rnd() * 360);
    let g = `<g transform="translate(${x} ${y})">`;
    g += `<ellipse cx="2" cy="${f(s * 0.12)}" rx="${f(s * 1.02)}" ry="${f(s * 0.98)}" fill="rgba(70,10,35,0.12)"/>`;
    g += `<g transform="rotate(${rot})">`;
    g += ring(6, s * 0.42, s * 0.62, s * 0.44, 10, c(-16), c(-30));
    g += ring(5, s * 0.27, s * 0.47, s * 0.34, 25, c(-8), c(-24));
    g += ring(4, s * 0.16, s * 0.33, s * 0.25, 50, c(2), c(-16));
    g += ring(3, s * 0.08, s * 0.21, s * 0.16, 10, c(12), c(-8));
    g += `<path d="M ${f(-s * 0.09)} 0 a ${f(s * 0.09)} ${f(s * 0.09)} 0 1 1 ${f(s * 0.18)} 0 ` +
         `a ${f(s * 0.05)} ${f(s * 0.05)} 0 1 1 ${f(-s * 0.1)} 0" fill="none" stroke="${c(-30)}" stroke-width="1.1"/>`;
    g += `</g>`;
    g += `<circle r="${f(s * 0.98)}" fill="url(#rShade)"/>`;
    g += `<ellipse cx="${f(-s * 0.27)}" cy="${f(-s * 0.33)}" rx="${f(s * 0.42)}" ry="${f(s * 0.24)}" ` +
         `transform="rotate(-35 ${f(-s * 0.27)} ${f(-s * 0.33)})" fill="url(#rLight)"/>`;
    g += `</g>`;
    return g;
  }

  function leaf(angle) {
    const r = (angle * Math.PI) / 180;
    const bx = 200 + Math.cos(r) * 55;
    const by = 250 + Math.sin(r) * 45;
    const len = 105 + rnd() * 22;
    const rot = angle + (rnd() * 16 - 8);
    return `<g transform="translate(${f(bx)} ${f(by)}) rotate(${f(rot)})">` +
      `<path d="M0 0 C ${f(len * 0.3)} ${f(-len * 0.26)}, ${f(len * 0.75)} ${f(-len * 0.24)}, ${f(len)} 0 ` +
      `C ${f(len * 0.75)} ${f(len * 0.24)}, ${f(len * 0.3)} ${f(len * 0.26)}, 0 0Z" ` +
      `fill="url(#leafG)" stroke="#2c5a38" stroke-width="0.8"/>` +
      `<path d="M4 0 Q ${f(len * 0.5)} -2 ${f(len * 0.94)} 0" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none"/>` +
      `</g>`;
  }

  // Hoa baby (gypsophila): cành mảnh với nhiều bông trắng nhỏ
  function babyBreath() {
    let s = '';
    for (let i = 0; i < 20; i++) {
      const a = -(15 + rnd() * 150) * Math.PI / 180;
      const len = 125 + rnd() * 55;
      const ex = 200 + Math.cos(a) * len;
      const ey = 258 + Math.sin(a) * len * 0.9;
      const cx = 200 + Math.cos(a) * len * 0.5 + (rnd() - 0.5) * 30;
      const cy = 258 + Math.sin(a) * len * 0.45;
      s += `<path d="M200 262 Q ${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}" stroke="#7f9d74" stroke-width="1" fill="none"/>`;
      for (let j = 0; j < 8; j++) {
        const t = 0.55 + j * 0.06;
        const u = 1 - t;
        const px = u * u * 200 + 2 * u * t * cx + t * t * ex + (rnd() - 0.5) * 14;
        const py = u * u * 262 + 2 * u * t * cy + t * t * ey + (rnd() - 0.5) * 14;
        const rr = 2 + rnd() * 1.9;
        s += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(rr)}" fill="#fffdf9" stroke="rgba(110,140,110,0.4)" stroke-width="0.6"/>`;
      }
    }
    return s;
  }

  function buildBouquet() {
    const defs = `
      <defs>
        <radialGradient id="rShade" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stop-color="rgba(60,0,25,0)"/>
          <stop offset="100%" stop-color="rgba(60,0,25,0.2)"/>
        </radialGradient>
        <radialGradient id="rLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient id="leafG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#2f6b43"/>
          <stop offset="100%" stop-color="#6fae6a"/>
        </linearGradient>
        <linearGradient id="kraft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ecd5ae"/>
          <stop offset="100%" stop-color="#c9a674"/>
        </linearGradient>
        <linearGradient id="paperFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff3f6"/>
          <stop offset="100%" stop-color="#f3b9c9"/>
        </linearGradient>
        <linearGradient id="ribbonG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e0457b"/>
          <stop offset="100%" stop-color="#9d1b4d"/>
        </linearGradient>
      </defs>`;

    const backPaper =
      `<path d="M46 236 Q200 210 354 236 L224 446 Q200 460 176 446 Z" fill="url(#kraft)" stroke="rgba(120,80,30,0.35)" stroke-width="1"/>` +
      `<path d="M120 232 L186 444 M280 232 L214 444" stroke="rgba(120,80,30,0.2)" stroke-width="1" fill="none"/>`;

    let leaves = '';
    [-172, -150, -128, -106, -84, -62, -40, -18, -4].forEach(a => { leaves += leaf(a); });

    // [x, y, bán kính, hue, độ bão hòa, độ sáng] vẽ từ trên xuống dưới
    const roses = [
      [200, 112, 40, 350, 72, 62],
      [142, 146, 40, 338, 66, 70],
      [258, 146, 40, 14, 82, 68],
      [96, 196, 38, 350, 72, 60],
      [200, 172, 44, 352, 78, 54],
      [304, 196, 38, 24, 84, 72],
      [146, 214, 40, 345, 62, 78],
      [254, 214, 40, 40, 70, 84],
      [104, 254, 34, 338, 70, 66],
      [200, 248, 40, 350, 74, 62],
      [296, 254, 34, 8, 80, 68]
    ];
    let flowers = '';
    roses.forEach(r => { flowers += rose(r[0], r[1], r[2], r[3], r[4], r[5]); });

    const frontPaper =
      `<path d="M66 266 Q200 304 334 266 L222 452 Q200 462 178 452 Z" fill="url(#paperFront)" stroke="rgba(150,50,90,0.3)" stroke-width="1"/>` +
      `<path d="M66 266 Q200 304 334 266 L318 292 Q200 332 82 292 Z" fill="rgba(255,255,255,0.55)"/>` +
      `<path d="M200 300 L194 452 M122 284 L188 448 M278 284 L212 448" stroke="rgba(150,50,90,0.2)" stroke-width="1" fill="none"/>`;

    const ribbon =
      `<path d="M197 342 C 188 366, 180 384, 172 402 L186 396 L190 412 C 196 388, 201 366, 203 346Z" fill="url(#ribbonG)"/>` +
      `<path d="M203 342 C 212 366, 220 384, 228 402 L214 396 L210 412 C 204 388, 199 366, 197 346Z" fill="url(#ribbonG)"/>` +
      `<path d="M200 336 C 160 298, 128 330, 150 352 C 166 366, 190 350, 200 336Z" fill="url(#ribbonG)" stroke="rgba(80,0,30,0.35)" stroke-width="0.8"/>` +
      `<path d="M200 336 C 240 298, 272 330, 250 352 C 234 366, 210 350, 200 336Z" fill="url(#ribbonG)" stroke="rgba(80,0,30,0.35)" stroke-width="0.8"/>` +
      `<path d="M196 336 C 170 316, 150 330, 156 344" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>` +
      `<path d="M204 336 C 230 316, 250 330, 244 344" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.6"/>` +
      `<ellipse cx="200" cy="339" rx="11" ry="12" fill="url(#ribbonG)" stroke="rgba(80,0,30,0.4)" stroke-width="0.8"/>`;

    return `<svg viewBox="0 0 400 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">` +
      defs + backPaper + leaves + babyBreath() + flowers + frontPaper + ribbon + `</svg>`;
  }

  const bouquet = document.getElementById('bouquet');
  bouquet.innerHTML = buildBouquet();

  /* =====================================================
     2. BÓNG BAY VÀ PHÁO GIẤY
     ===================================================== */

  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BALLOON_COLORS = ['#ff6b8b', '#ff8fab', '#ffb703', '#ffd166', '#8ecae6', '#74c0fc', '#b197fc', '#69db7c', '#ffa8a8'];
  const CONFETTI_COLORS = ['#ff6b8b', '#ff8fab', '#ffb703', '#ffd166', '#4cc9f0', '#b197fc', '#69db7c', '#f4c95d', '#ffffff'];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  function launchBalloons(count) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'balloon-wrap';
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      const color = pick(BALLOON_COLORS);
      balloon.style.background = color;
      balloon.style.color = color;
      balloon.style.scale = rand(0.8, 1.35);
      balloon.appendChild(document.createElement('i'));
      wrap.appendChild(balloon);

      wrap.style.left = rand(0.04, 0.92) * vw + 'px';
      document.body.appendChild(wrap);

      const duration = rand(4500, 8500);
      const delay = rand(0, 700);
      const rise = vh + 340;
      const drift = rand(-80, 80);

      if (reduceMotion) {
        wrap.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1500, delay, fill: 'forwards' })
          .onfinish = () => wrap.remove();
        continue;
      }

      wrap.animate(
        [{ transform: 'translate(0, 0)' }, { transform: `translate(${drift}px, ${-rise}px)` }],
        { duration, delay, easing: 'cubic-bezier(0.25, 0.1, 0.35, 1)', fill: 'forwards' }
      ).onfinish = () => wrap.remove();

      const sway = rand(6, 13);
      balloon.animate(
        [{ transform: `rotate(${-sway}deg)` }, { transform: `rotate(${sway}deg)` }],
        { duration: rand(900, 1500), delay, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' }
      );
    }
  }

  let particles = [];
  let running = false;

  function burstConfetti(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05);
      const speed = rand(6, 17);
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: rand(6, 11),
        h: rand(4, 7),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.3, 0.3),
        color: pick(CONFETTI_COLORS),
        life: 0,
        maxLife: rand(110, 190),
        wobble: rand(0, Math.PI * 2),
        round: Math.random() < 0.2
      });
    }
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter(p => p.life < p.maxLife && p.y < window.innerHeight + 30);

    for (const p of particles) {
      p.life++;
      p.vy += 0.28;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.wobble += 0.15;
      p.x += p.vx + Math.sin(p.wobble) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.globalAlpha = Math.min(1, (p.maxLife - p.life) / 40);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.abs(Math.cos(p.wobble)) * 0.8 + 0.2);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.h / 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }

    if (particles.length) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  bouquet.addEventListener('click', () => {
    const rect = bouquet.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.35; // bắn ra từ phần đầu hoa

    bouquet.classList.remove('pop');
    void bouquet.offsetWidth; // khởi động lại animation
    bouquet.classList.add('pop');

    launchBalloons(reduceMotion ? 6 : 18);
    burstConfetti(cx, cy, reduceMotion ? 40 : 160);
    if (!reduceMotion) setTimeout(() => burstConfetti(cx, cy, 80), 180);
  });
})();
