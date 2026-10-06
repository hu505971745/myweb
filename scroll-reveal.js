// Stage01 chapter focus on viewport entry; ordinary content fades up once.
export function initScrollReveal(root) {
  if (!root) return () => {};
  const selectors = [
    '.hero-copy', '.hero-portrait', '.hero-stamp',
    '.page-intro > h1', '.page-intro > p', '.section-heading', '.project-card',
    '.about-preview .about-copy', '.capability-list article', '.capability-card',
    '.case-copy', '.contact-card', '.contact-cta > *', '.metric-item',
    '.bu-hero-copy', '.perf-hero-copy', '.three-d-hero-copy', '.campaign-hero > div',
    '.douyin-intro > h1', '.douyin-intro > .douyin-lead', '.douyin-meta',
    '.bu-heading', '.case-heading', '.case-icon-card', '.bu-goals > article',
    '.bu-overview > article', '.perf-metrics > article', '.three-d-metrics > article',
    '.bu-strategy', '.bu-rules > article', '.bu-process > article', '.bu-review > article',
    '.perf-creative-copy', '.perf-table-scroll', '.perf-workflow > article',
    '.three-d-group-heading', '.three-d-grid > article', '.three-d-scene > div',
    '.three-d-categories > article', '.three-d-review > article', '.three-d-reuse',
    '.campaign-goals > article', '.campaign-page-blocks > article', '.campaign-language > article',
    '.campaign-workflow > article', '.campaign-review > article', '.campaign-subheading-row',
    '.douyin-card-grid > article', '.douyin-phone-pair > div', '.douyin-panel > h3', '.douyin-panel > p',
    '.bu-closing', '.perf-closing', '.three-d-closing', '.campaign-closing', '.douyin-actions',
    '.media-figure', 'article', 'figure',
    '.page-intro > *', '.project-hero > *', '.about-bio', '.about-portrait-gallery',
    '.contact-intro', '.contact-card-list > *', '.filter-bar', '.next-project',
    '.asset-heading', '.asset-section > h3', '.asset-section > p',
    'section > header', 'section > h2', 'section > h3', 'section > p',
    '[data-depth-carousel]', '.site-footer > *', '.lanyard-scene',
  ];
  const excluded = '.lightbox, [role="dialog"], .desktop-header, .mobile-dock, [data-depth-card]';
  const chapterTitles = [...root.querySelectorAll('h1, h2, section > h3, header > h3, .campaign-subheading-row > h3, .three-d-group-heading > h3')]
    .filter(element => !element.closest(`${excluded}, .hero-copy, article, .project-card, .capability-card, .contact-card, .metric-item`))
    .concat([...root.querySelectorAll('.project-card h3, .masonry-item h3')]
      .filter(element => !element.closest(excluded)));
  const chapterSet = new Set(chapterTitles);
  // Split title containers so the blur affects the heading, not its copy or imagery.
  const splitAroundTitles = element => {
    if (chapterSet.has(element)) return [element];
    if (chapterTitles.some(title => element.contains(title))) {
      return [...element.children].flatMap(splitAroundTitles);
    }
    return [element];
  };
  const candidates = [...new Set([...root.querySelectorAll(selectors.join(','))].flatMap(splitAroundTitles).concat(chapterTitles))];
  const selected = new Set(candidates);
  // One filter per block, so an image and its parent never multiply the blur.
  const targets = candidates.filter(element => {
    if (element.closest('.lightbox, [role="dialog"], .desktop-header, .mobile-dock')) return false;
    // These cards manage their own 3D transforms and filters.
    if (element.closest('[data-depth-card]')) return false;
    for (let parent = element.parentElement; parent && parent !== root; parent = parent.parentElement) {
      if (selected.has(parent)) return false;
    }
    return true;
  });
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observers = [];
  const revealFrames = new Map();
  let previousY = window.scrollY;
  let direction = 'down';
  let alive = true;
  let contentIndex = 0;
  targets.forEach(element => {
    element.classList.add('reveal-blur', 'scroll-motion-target');
    element.dataset.revealPreset = chapterSet.has(element) ? 'chapter'
      : element.matches('.hero-copy') ? 'hero-original' : 'content';
    if (element.dataset.revealPreset === 'content') {
      element.style.setProperty('--content-reveal-delay', `${contentIndex++ % 3 * 70}ms`);
    }
  });
  const cancelReveal = element => {
    const frame = revealFrames.get(element);
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    revealFrames.delete(element);
  };
  const clearReveals = () => {
    revealFrames.forEach(frame => window.cancelAnimationFrame(frame));
    revealFrames.clear();
  };
  const revealTitle = element => {
    cancelReveal(element);
    element.classList.remove('is-visible');
    element.dataset.revealDirection = direction;
    // Stage01 resets the heading, then waits two frames before focusing it.
    revealFrames.set(element, window.requestAnimationFrame(() => {
      revealFrames.set(element, window.requestAnimationFrame(() => {
        revealFrames.delete(element);
        if (alive && root.contains(element)) element.classList.add('is-visible');
      }));
    }));
  };
  const onScroll = () => {
    const y = window.scrollY;
    direction = y >= previousY ? 'down' : 'up';
    previousY = y;
  };
  const observe = () => {
    clearReveals();
    observers.forEach(observer => observer.disconnect());
    observers = [];
    if (motion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(element => element.classList.add('is-visible'));
      return;
    }
    if (document.documentElement.dataset.entrance === 'loading') return;
    targets.forEach(element => element.classList.remove('is-visible'));
    const settings = {
      chapter: { threshold: .22, rootMargin: '-6% 0px -6% 0px' },
      content: { threshold: .12, rootMargin: '0px 0px -7% 0px' },
      'hero-original': { threshold: 0, rootMargin: '0px 0px -18px 0px' },
    };
    Object.entries(settings).forEach(([preset, options]) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (preset === 'chapter') {
            if (entry.isIntersecting) revealTitle(entry.target);
            else {
              cancelReveal(entry.target);
              entry.target.classList.remove('is-visible');
            }
          } else {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
            if (preset === 'content' && entry.isIntersecting) observer.unobserve(entry.target);
          }
        });
      }, options);
      targets.filter(element => element.dataset.revealPreset === preset).forEach(element => observer.observe(element));
      observers.push(observer);
    });
  };
  const onFocus = event => {
    const target = event.target.closest?.('.scroll-motion-target');
    if (target && root.contains(target)) {
      cancelReveal(target);
      target.classList.add('is-visible');
    }
  };
  observe();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('portfolio:entrance-reveal', observe);
  root.addEventListener('focusin', onFocus);
  motion.addEventListener('change', observe);
  return () => {
    alive = false;
    clearReveals();
    observers.forEach(observer => observer.disconnect());
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('portfolio:entrance-reveal', observe);
    root.removeEventListener('focusin', onFocus);
    motion.removeEventListener('change', observe);
    targets.forEach(element => {
      element.classList.remove('reveal-blur', 'scroll-motion-target', 'is-visible');
      delete element.dataset.revealDirection;
      delete element.dataset.revealPreset;
      element.style.removeProperty('--content-reveal-delay');
    });
  };
}

