// Keep short case copy on its authored line in the fixed desktop mobile canvas.
export function initCaseTextFit(root) {
  if (!document.documentElement.classList.contains("desktop-scaled-mobile") ||
      !root?.matches(".brand-upgrade-case, .performance-case, .douyin-case, .campaign-case, .three-d-case")) return () => {};
  const elements = [...root.querySelectorAll([
    ".bu-lead > span", ".three-d-lead > span", ".perf-lead", ".campaign-lead", ".douyin-lead",
    ".bu-meta dt", ".bu-meta dd", ".perf-meta dt", ".perf-meta dd",
    ".campaign-meta dt", ".campaign-meta dd", ".three-d-meta dt", ".three-d-meta dd",
    ".douyin-meta dt", ".douyin-meta dd", ".bu-caption", ".perf-caption",
    ".campaign-caption", ".three-d-caption", ".douyin-showcase-caption",
    ".bu-ratios p", ".bu-overview p", ".perf-creative-metrics dt", ".bu-adaptation dd",
  ].join(","))];
  const states = new Map(elements.map(element => [element, { original: element.style.fontSize, width: 0 }]));
  let active = true;
  function fit(element, force = false) {
    if (!active || !element.isConnected || !element.clientWidth) return;
    const state = states.get(element);
    if (!force && state.width === element.clientWidth) return;
    state.width = element.clientWidth;
    element.style.fontSize = state.original;
    const fontSize = parseFloat(getComputedStyle(element).fontSize);
    const available = element.clientWidth;
    if (element.scrollWidth > available) {
      element.style.fontSize = `${fontSize * available / element.scrollWidth - .15}px`;
    }
  }
  elements.forEach(element => { element.classList.add("case-copy-single-line"); fit(element, true); });
  const observer = new ResizeObserver(entries => entries.forEach(entry => fit(entry.target)));
  elements.forEach(element => observer.observe(element));
  document.fonts?.ready.then(() => { if (active) elements.forEach(element => fit(element, true)); });
  return () => {
    active = false;
    observer.disconnect();
    for (const [element, state] of states) {
      element.style.fontSize = state.original;
      element.classList.remove("case-copy-single-line");
    }
  };
}
