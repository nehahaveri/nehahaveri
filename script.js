/* ═══════════════════════════════════════════════════════════════════
   Neha Haveri — Portfolio · script.js
   ═══════════════════════════════════════════════════════════════════ */

(() => {

  /* ─── Typing animation ─────────────────────────────────────────── */
  const roles = [
    'Software Engineer',
    'Backend Engineer',
    'Full-Stack Engineer',
    'AI/ML Developer',
    'Microservices Architect',
    'Certified Data Scientist',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typing-text');

  function type() {
    if (!typingEl) return;
    const current = roles[roleIndex];
    typingEl.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    } else {
      charIndex += isDeleting ? -1 : 1;
    }
    setTimeout(type, delay);
  }

  /* ─── Navbar scroll state ──────────────────────────────────────── */
  function setupNavScroll() {
    const navbar = document.getElementById('navbar');
    const backTop = document.querySelector('.back-top');
    if (!navbar) return;

    const onScroll = () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 40);
      if (backTop) backTop.classList.toggle('visible', y > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Hamburger menu ───────────────────────────────────────────── */
  function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;

    const closeMenu = () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ─── Fade-in observer ─────────────────────────────────────────── */
  function setupFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ─── Active nav link on scroll ───────────────────────────────── */
  function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  /* ─── Cursor glow (desktop only) ──────────────────────────────── */
  function setupCursorGlow() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX, curY = targetY;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function loop() {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ─── Magnetic buttons ─────────────────────────────────────────── */
  function setupMagnetic() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const els = document.querySelectorAll('[data-mag]');

    els.forEach(el => {
      const strength = parseFloat(el.dataset.mag) || 0.3;

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      };

      const onLeave = () => {
        el.style.transform = '';
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─── Tilt cards ───────────────────────────────────────────────── */
  function setupTilt() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotX = (y - 0.5) * -6;
        const rotY = (x - 0.5) * 6;
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      };
      const onLeave = () => { card.style.transform = ''; };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─── Bento card spotlight (border glow follows cursor) ───────── */
  function setupBentoSpotlight() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.bento-card, .stack-cat, .work-card, .ach-card, .recog-card, .beyond-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ─── Counter animations ───────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    const duration = 1600;
    const start = performance.now();
    const startVal = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  /* ─── Smooth in-page anchor scroll (offset for navbar) ────────── */
  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ─── Scroll progress bar ──────────────────────────────────────── */
  function setupScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH ? scrollTop / docH : 0;
      bar.style.transform = `scaleX(${pct})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Particle constellation canvas ────────────────────────────── */
  function setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    const particles = [];
    const MAX_DIST = 130;
    const MAX_SPEED = 0.9;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = Math.min(90, Math.floor((W * H) / 10000));

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 1.6 + 0.4,
        a:  Math.random() * 0.55 + 0.2,
      });
    }

    let mouseX = W / 2, mouseY = H / 2;
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }, { passive: true });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // nudge toward mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const md = Math.hypot(dx, dy);
        if (md < 180) {
          p.vx += (dx / md) * 0.012;
          p.vy += (dy / md) * 0.012;
        }

        // dampen & cap speed
        p.vx *= 0.98;
        p.vy *= 0.98;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < 0)  p.x = W;
        if (p.x > W)  p.x = 0;
        if (p.y < 0)  p.y = H;
        if (p.y > H)  p.y = 0;

        // draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`;
        ctx.fill();

        // connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* ─── Init ──────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    type();
    setupNavScroll();
    setupHamburger();
    setupFadeIn();
    setupActiveNav();
    setupCursorGlow();
    setupMagnetic();
    setupTilt();
    setupBentoSpotlight();
    setupCounters();
    setupSmoothAnchors();
    setupScrollProgress();
    setupParticles();
  });

})();
