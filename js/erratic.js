/* ============================================================
   ERRATIC WORD SPLITTER — pairs with css/erratic.css
   Remove the <script> tag in index.html to revert
   ============================================================ */
(function () {
  const TARGETS = [
    '.hero__title',
    '.hero__tagline',
    '.about-card__q',
    '.about-card__a',
    '.xonyagar__desc',
    '.game-card__name',
    '.game-card__desc',
    '.section-title',
    '.section-label',
    '.stat-card__label',
    '.hero__cta',
    '.contact__heading',
  ];

  function seededRand(seed) {
    let s = seed;
    return function () {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function wrapWords(el, index) {
    if (el.dataset.erratic) return;
    el.dataset.erratic = '1';

    const rand = seededRand(index * 137 + 31);

    el.childNodes.forEach(function (node) {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();

      words.forEach(function (part, i) {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        if (!part) return;

        const r   = rand;
        const rot = (r() - 0.5) * 4;          /* ±2 deg */
        const tx  = (r() - 0.5) * 10;         /* ±5 px  */
        const ty  = (r() - 0.5) * 8;          /* ±4 px  */
        const skx = (r() - 0.5) * 3;          /* ±1.5 deg skew */

        const span = document.createElement('span');
        span.className = 'erratic-word';
        span.textContent = part;
        span.style.transform =
          `rotate(${rot}deg) translate(${tx}px,${ty}px) skewX(${skx}deg)`;

        frag.appendChild(span);
      });

      node.parentNode.replaceChild(frag, node);
    });
  }

  function run() {
    let counter = 0;
    TARGETS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        wrapWords(el, counter++);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
