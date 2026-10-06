// Shared detail-page typography, symbols and numeric presentation.
export const caseNumber = number => `<span class="case-number" aria-hidden="true">${number}</span>`;

export const numberedTitle = (number, title) => `${caseNumber(number)}<span>${title}</span>`;

export function caseHeading(className, id, number, title, accent, copy) {
  return `<header class="${className} case-heading${copy ? '' : ' case-heading-title-only'}"><h2 id="${id}">${numberedTitle(number, `${title}<span class="title-accent">${accent}</span>`)}</h2>${copy ? `<p>${copy}</p>` : ''}</header>`;
}

const symbols = {
  cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.25l8 4.5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/>',
  tree: '<rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v5M4.5 17v-4h15v4"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/><path d="M12 13v4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 3v18h18M7 16l5-5 4 2 5-7"/><path d="M17 6h4v4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
};
export function caseIcon(name) {
  return `<span class="case-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${symbols[name] || symbols.cube}</svg></span>`;
}

export function countValue(value) {
  const text = String(value);
  const match = text.match(/^(\+?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return text;
  return `<span class="case-count" aria-label="${text}">${match[1]}<span data-case-count="${match[2]}" aria-hidden="true">${match[2]}</span>${match[3]}</span>`;
}

// Observe each value so long sections and horizontally scrolled tables animate on sight.
export function initCaseCountUp(root) {
  const counters = [...(root?.querySelectorAll('[data-case-count]') || [])];
  if (!counters.length) return () => {};
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const frames = new Map();
  let observer;
  let disposed = false;
  const finish = counter => {
    window.cancelAnimationFrame(frames.get(counter));
    frames.delete(counter);
    counter.textContent = counter.dataset.caseCount;
    counter.dataset.countState = 'complete';
  };
  if (motion.matches || !('IntersectionObserver' in window)) {
    counters.forEach(finish);
    return () => {};
  }
  const start = counter => {
    if (counter.dataset.countState !== 'pending') return;
    observer.unobserve(counter);
    counter.dataset.countState = 'running';
    const target = Number(counter.dataset.caseCount);
    const decimals = (counter.dataset.caseCount.split('.')[1] || '').length;
    const began = performance.now();
    const tick = now => {
      if (disposed) return;
      const progress = Math.min((now - began) / 1200, 1);
      counter.textContent = (target * (1 - (1 - progress) ** 3)).toFixed(decimals);
      if (progress < 1) frames.set(counter, window.requestAnimationFrame(tick));
      else finish(counter);
    };
    frames.set(counter, window.requestAnimationFrame(tick));
  };
  observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => start(entry.target));
  }, { threshold: .5 });
  counters.forEach(counter => {
    counter.textContent = (0).toFixed((counter.dataset.caseCount.split('.')[1] || '').length);
    counter.dataset.countState = 'pending';
    observer.observe(counter);
  });
  const onMotionChange = () => {
    if (!motion.matches) return;
    observer.disconnect();
    counters.forEach(finish);
  };
  motion.addEventListener('change', onMotionChange);
  return () => {
    disposed = true;
    observer.disconnect();
    frames.forEach(frame => window.cancelAnimationFrame(frame));
    frames.clear();
    motion.removeEventListener('change', onMotionChange);
  };
}
