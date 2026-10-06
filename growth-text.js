// Reveal the solid lettering horizontally, using its natural text width.
export function initGrowthText(root) {
  if (!root) return () => {};
  const fill = root.querySelector('.growth-text-fill');
  if (!fill) return () => {};
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation;
  let alive = true;

  const settle = () => {
    animation?.cancel();
    animation = undefined;
    root.classList.remove('is-growing');
  };
  const play = () => {
    if (!alive) return;
    settle();
    if (motion.matches) return;
    root.classList.add('is-growing');
    const current = fill.animate([
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)' },
    ], {
      duration: 1400,
      easing: 'cubic-bezier(.4, 0, .2, 1)',
    });
    animation = current;
    current.finished.then(() => {
      if (alive && animation === current) settle();
    }, () => {});
  };
  const enter = event => {
    if (event.pointerType !== 'touch') play();
  };
  const preferenceChanged = () => motion.matches ? settle() : play();
  root.addEventListener('pointerenter', enter);
  motion.addEventListener('change', preferenceChanged);
  play();

  return () => {
    alive = false;
    root.removeEventListener('pointerenter', enter);
    motion.removeEventListener('change', preferenceChanged);
    settle();
  };
}
