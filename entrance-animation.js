(() => {
  const root = document.documentElement;
  const overlay = document.getElementById("portfolio-entrance");
  if (!overlay) return;
  if (root.dataset.entrance !== "loading") {
    overlay.remove();
    return;
  }

  const app = document.getElementById("app");
  const skip = overlay.querySelector(".entrance-skip");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const started = performance.now();
  const dwell = 1300;
  let phase = "loading";
  let revealed = false;
  let ready = Boolean(document.getElementById("main-content"));
  let waitTimer;
  let revealTimer;
  let endTimer;
  const previousInert = app?.inert || false;
  if (app) app.inert = true;

  function cleanup() {
    clearTimeout(waitTimer);
    clearTimeout(revealTimer);
    clearTimeout(endTimer);
    clearTimeout(window.__hfEntranceFallback);
    delete window.__hfEntranceFallback;
    document.removeEventListener("portfolio:page-ready", pageReady);
    document.removeEventListener("portfolio:entrance-timeout", finish);
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("hashchange", finish);
    motion.removeEventListener("change", onMotion);
    skip.removeEventListener("click", open);
  }

  function finish() {
    if (phase === "finished") return;
    phase = "finished";
    cleanup();
    const focusWasInside = overlay.contains(document.activeElement);
    overlay.remove();
    delete root.dataset.entrance;
    if (app) app.inert = previousInert;
    // Also reveal the page when bypassed by a route change or motion preference.
    revealPage();
    if (focusWasInside) app?.querySelector('[data-nav="home"]')?.focus({ preventScroll: true });
  }

  function open() {
    if (phase !== "loading") return;
    clearTimeout(waitTimer);
    phase = "opening";
    root.dataset.entrance = "opening";
    // Let the curtain lead slightly while keeping both animations overlapped.
    revealTimer = setTimeout(revealPage, 150);
    endTimer = setTimeout(finish, 700);
  }

  function revealPage() {
    if (revealed) return;
    revealed = true;
    document.dispatchEvent(new Event("portfolio:entrance-reveal"));
  }

  function scheduleOpening() {
    if (!ready || phase !== "loading") return;
    clearTimeout(waitTimer);
    waitTimer = setTimeout(open, Math.max(0, dwell - (performance.now() - started)));
  }

  function pageReady() {
    ready = true;
    scheduleOpening();
  }

  function onKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      open();
    } else if (event.key === "Tab" && phase === "loading") {
      // The skip button is the only focusable control while the page is inert.
      event.preventDefault();
      skip.focus({ preventScroll: true });
    }
  }

  function onMotion() {
    if (motion.matches) finish();
  }

  skip.addEventListener("click", open);
  document.addEventListener("keydown", onKey);
  document.addEventListener("portfolio:page-ready", pageReady);
  document.addEventListener("portfolio:entrance-timeout", finish);
  window.addEventListener("hashchange", finish);
  motion.addEventListener("change", onMotion);
  if (motion.matches) finish();
  else {
    scheduleOpening();
  }
})();
