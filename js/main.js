/* ============================================================
   Sarbala Studio — Main JS
   ============================================================ */

// ── Language ───────────────────────────────────────────────
const html = document.documentElement;
const langToggle = document.getElementById("langToggle");

function setLang(lang) {
  html.setAttribute("data-lang", lang);
  html.setAttribute("lang", lang);
  try {
    localStorage.setItem("sarbala-lang", lang);
  } catch (e) {}
}

function toggleLang() {
  const current = html.getAttribute("data-lang") || "fa";
  setLang(current === "fa" ? "en" : "fa");
}

(function initLang() {
  let saved = "fa";
  try {
    saved = localStorage.getItem("sarbala-lang") || "fa";
  } catch (e) {}
  setLang(saved);
})();

if (langToggle) langToggle.addEventListener("click", toggleLang);

// ── Navigation ──────────────────────────────────────────────
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mmLinks = document.querySelectorAll(".mm-link");

function handleScroll() {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);

  // Scroll-to-top button
  const scrollTop = document.getElementById("scrollTop");
  if (scrollTop) scrollTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

function openMenu() {
  mobileMenu.classList.add("open");
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (hamburger)
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

mmLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// ── Scroll Reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal, .reveal-hero");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

// Hero elements use the same in-view class but via reveal-hero class
// Trigger hero immediately after preloader
function triggerHero() {
  document.querySelectorAll(".reveal-hero").forEach(function (el, i) {
    setTimeout(
      function () {
        el.classList.add("in-view");
      },
      200 + i * 120,
    );
  });
}

// ── Preloader ───────────────────────────────────────────────
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(function () {
    if (preloader) preloader.classList.add("done");
    triggerHero();
  }, 400);
});

// Fallback if load fires very late
setTimeout(function () {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains("done")) {
    preloader.classList.add("done");
    triggerHero();
  }
}, 2500);

// ── Scroll Top ──────────────────────────────────────────────
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Game card keyboard support ──────────────────────────────
document.querySelectorAll(".game-card").forEach(function (card) {
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// ── Stat counter animation ──────────────────────────────────
function animateCounter(el, target, suffix) {
  let current = 0;
  const increment = target / 45;
  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 28);
}

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.dataset.count;
      if (raw) {
        animateCounter(el, parseInt(raw, 10), "K");
      }
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("[data-count]").forEach(function (el) {
  counterObserver.observe(el);
});

// ── Hero Canvas Constellation ───────────────────────────────
(function heroCanvas() {
  var canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var W, H, dpr;
  var mouse = { x: -9999, y: -9999, on: false };
  var particles = [];
  var snippets = [];
  var raf;
  var introStart = null;
  var INTRO_MS = 1600;
  var CONNECT = 130;
  var REPEL = 115;
  var R = [230, 57, 70];
  var CODE = [
    "{  }",
    "( )",
    "//",
    "->",
    "&&",
    "fn",
    "var",
    "if",
    "[ ]",
    "=>",
    "/**",
    "*/",
    "01",
    "10",
    "++",
    "class",
    "new",
    "null",
  ];
  var N = window.innerWidth < 600 ? 34 : 60;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function mkParticle() {
    var edge = (Math.random() * 4) | 0;
    var x =
      edge === 0
        ? Math.random() * W
        : edge === 1
          ? W + 20
          : edge === 2
            ? Math.random() * W
            : -20;
    var y =
      edge === 0
        ? -20
        : edge === 1
          ? Math.random() * H
          : edge === 2
            ? H + 20
            : Math.random() * H;
    return {
      x: x,
      y: y,
      tx: W * 0.1 + Math.random() * W * 0.8,
      ty: H * 0.1 + Math.random() * H * 0.8,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.4 + 0.5,
      a: Math.random() * 0.45 + 0.22,
      acc: Math.random() < 0.1,
      t: 0,
    };
  }

  function mkSnippet() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      txt: CODE[(Math.random() * CODE.length) | 0],
      spd: Math.random() * 0.22 + 0.08,
      a: Math.random() * 0.065 + 0.02,
      sz: Math.random() * 4 + 9,
    };
  }

  function init() {
    resize();
    particles = [];
    snippets = [];
    for (var i = 0; i < N; i++) particles.push(mkParticle());
    for (var j = 0; j < 14; j++) snippets.push(mkSnippet());
  }

  function tick(ts) {
    if (!introStart) introStart = ts;
    var t = Math.min((ts - introStart) / INTRO_MS, 1);

    ctx.clearRect(0, 0, W, H);

    if (document.hidden) {
      raf = requestAnimationFrame(tick);
      return;
    }

    // Floating code snippets
    ctx.save();
    for (var s = 0; s < snippets.length; s++) {
      var sn = snippets[s];
      ctx.font = sn.sz + "px monospace";
      ctx.fillStyle = "rgba(148,204,148," + sn.a + ")";
      ctx.fillText(sn.txt, sn.x, sn.y);
      sn.y -= sn.spd;
      if (sn.y < -24) {
        sn.y = H + 24;
        sn.x = Math.random() * W;
        sn.txt = CODE[(Math.random() * CODE.length) | 0];
      }
    }
    ctx.restore();

    // Connections
    ctx.lineWidth = 0.5;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i],
          b = particles[j];
        var dx = a.x - b.x,
          dy = a.y - b.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          var la = (1 - d / CONNECT) * 0.13 * Math.min(a.t, b.t);
          ctx.strokeStyle = "rgba(255,255,255," + la + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (t < 1) {
        p.t = t;
        p.x += (p.tx - p.x) * 0.055;
        p.y += (p.ty - p.y) * 0.055;
      } else {
        p.t = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (mouse.on) {
          var mdx = p.x - mouse.x,
            mdy = p.y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < REPEL && md > 0) {
            var f = (REPEL - md) / REPEL;
            p.x += (mdx / md) * f * 3.2;
            p.y += (mdy / md) * f * 3.2;
          }
        }
      }
      var alpha = p.a * p.t;
      if (p.acc) {
        ctx.shadowColor = "rgba(" + R[0] + "," + R[1] + "," + R[2] + ",0.7)";
        ctx.shadowBlur = 8;
        ctx.fillStyle =
          "rgba(" + R[0] + "," + R[1] + "," + R[2] + "," + alpha + ")";
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255," + alpha * 0.72 + ")";
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    raf = requestAnimationFrame(tick);
  }

  function trackMouse(cx, cy) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = cx - rect.left;
    mouse.y = cy - rect.top;
    mouse.on = true;
  }

  document.addEventListener("mousemove", function (e) {
    trackMouse(e.clientX, e.clientY);
  });
  document.addEventListener(
    "touchmove",
    function (e) {
      trackMouse(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true },
  );
  document.addEventListener("mouseleave", function () {
    mouse.on = false;
  });

  window.addEventListener("resize", function () {
    resize();
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      if (!raf) raf = requestAnimationFrame(tick);
    }
  });

  window.addEventListener("load", function () {
    init();
    introStart = null;
    raf = requestAnimationFrame(tick);
  });
})();

// ── Hero Word Sequence ──────────────────────────────────────
(function heroWords() {
  var TIMINGS = [0, 1400, 2800, 4200];
  var DURATION = 1500;
  var DELAY = 900;
  var total = 4;
  var locked = null;

  function getLang() {
    return document.documentElement.getAttribute("data-lang") || "fa";
  }

  function showSeq(i) {
    if (locked) return;
    var lang = getLang();
    var el = document.querySelector('.hw[data-seq="' + i + '"].lang-' + lang);
    if (!el) return;

    if (i === total - 1) {
      el.classList.add("hw-lock");
      locked = el;
    } else {
      el.classList.add("hw-show");
      el.addEventListener(
        "animationend",
        function () {
          el.classList.remove("hw-show");
        },
        { once: true },
      );
    }
  }

  window.addEventListener("load", function () {
    for (var i = 0; i < total; i++) {
      (function (idx) {
        setTimeout(function () {
          if (document.hidden) return;
          showSeq(idx);
        }, DELAY + TIMINGS[idx]);
      })(i);
    }
  });

  document.addEventListener("visibilitychange", function () {});
})();
