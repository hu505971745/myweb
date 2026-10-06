// React Bits DepthCarousel interaction adapted to native JS without a React runtime.
const clamp = (n, min, max) => Math.min(max, Math.max(min,n));
export function initDepthCarousels() {
  return [...document.querySelectorAll('[data-depth-carousel]')].map(initCarousel);
}
function initCarousel(root) {
  const cards = [...root.querySelectorAll('[data-depth-card]')];
  const dots = [...root.querySelectorAll('[data-depth-dot]')];
  const status = root.querySelector('[data-depth-status]');
  const pause = root.querySelector('[data-depth-pause]');
  const previous = root.querySelector('[data-depth-prev]');
  const next = root.querySelector('[data-depth-next]');
  const count = cards.length, events = new AbortController();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let position = 0, active = 0, scale = 1, raf = 0, timer = 0, drag = null, suppressClick = false;
  let hovered = false, focused = false, paused = false;
  const mod = n => (n % count + count) % count;
  function layout(pos) {
    cards.forEach((card,i) => {
      let d = mod(i - pos);
      if (d > count / 2) d -= count;
      const back = Math.max(0,d), shown = Math.abs(d) <= 4.5;
      const opacity = shown ? (d < 0 ? Math.max(0,1 + d) : 1) : 0;
      card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${72*d}px) translateZ(${-220*d}px) rotateY(${22*clamp(d,0,1)}deg)`;
      card.style.opacity = opacity;
      card.style.filter = `brightness(${Math.max(.3,1-back*.15)}) blur(${Math.min(3,back*.75)}px)`;
      card.style.zIndex = Math.round(2000 - d * 20);
      card.style.pointerEvents = opacity > .05 ? 'auto' : 'none';
      card.querySelector('.depth-carousel-tint').style.opacity = clamp(back * .18,0,.7);
    });
  }
  function update() {
    cards.forEach((card,i) => { card.tabIndex = i === active ? 0 : -1; card.setAttribute('aria-hidden',String(i !== active)); });
    dots.forEach((dot,i) => dot.setAttribute('aria-current',String(i === active)));
    status.textContent = `${active + 1} / ${count}`;
    if (document.activeElement?.matches('[data-depth-card]')) cards[active].focus({preventScroll:true});
  }
  function focus(raw, animate = true) {
    cancelAnimationFrame(raf);
    active = mod(raw);
    let delta = mod(active - position);
    if (delta > count / 2) delta -= count;
    const from = position, to = from + delta, start = performance.now();
    update();
    if (reduced.matches || !animate) { position = active; layout(position); return; }
    function tick(now) {
      const t = clamp((now-start)/700,0,1);
      position = from + (to-from) * (1-Math.pow(1-t,4));
      layout(position);
      if (t < 1) raf = requestAnimationFrame(tick);
      else { position = active; layout(position); raf = 0; }
    }
    raf = requestAnimationFrame(tick);
  }
  function restart() {
    clearInterval(timer);
    if (count > 1 && !reduced.matches && !paused) timer = setInterval(() => {
      if (!hovered && !focused && !drag && !document.hidden) focus(active+1);
    },3200);
  }
  function on(target,name,fn,options={}) { target.addEventListener(name,fn,{...options,signal:events.signal}); }
  on(previous,'click',() => focus(active-1));
  on(next,'click',() => focus(active+1));
  on(pause,'click',() => {
    paused = !paused;
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',paused ? '播放主图自动轮播' : '暂停主图自动轮播');
    pause.textContent = paused ? '播放' : '暂停';
    restart();
  });
  dots.forEach((dot,i) => on(dot,'click',() => focus(i)));
  cards.forEach((card,i) => on(card,'click',() => {
    if (suppressClick) { suppressClick = false; return; }
    if (i !== active) focus(i);
    else { const img = card.querySelector('img'); document.querySelector('.image-lightbox')?._openImage(img.src,img.alt); }
  }));
  on(root,'keydown',e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); focus(active + (e.key === 'ArrowLeft' ? -1 : 1)); }
  });
  on(root,'pointerenter',() => { hovered = true; });
  on(root,'pointerleave',() => { hovered = false; });
  on(root,'focusin',() => { focused = true; });
  on(root,'focusout',e => { focused = root.contains(e.relatedTarget); });
  on(root,'pointerdown',e => {
    if (e.button !== 0 || !e.target.closest('[data-depth-card]')) return;
    cancelAnimationFrame(raf);
    suppressClick = false;
    drag = { id:e.pointerId, x:e.clientX, y:e.clientY, start:position, moved:false };
  });
  on(root,'pointermove',e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy)>8) { drag=null; return; }
    if (!drag.moved && Math.abs(dx)>6) { drag.moved=true; root.setPointerCapture(e.pointerId); }
    if (drag.moved) { position = drag.start - dx / Math.max(280*.55*scale,40); layout(position); }
  });
  function end(e) {
    if (!drag) return;
    const moved=drag.moved; drag=null;
    if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
    if (moved) { suppressClick=true; focus(Math.round(position)); }
  }
  on(root,'pointerup',end);
  on(root,'pointercancel',end);
  on(root,'lostpointercapture',() => { if (drag) { drag=null; focus(Math.round(position)); } });
  on(reduced,'change',() => { focus(active,false); restart(); });
  const observer = new ResizeObserver(entries => { scale = clamp(entries[0].contentRect.width / 544,.4,1); layout(position); });
  observer.observe(root);
  update(); layout(0); restart();
  return () => { events.abort(); observer.disconnect(); cancelAnimationFrame(raf); clearInterval(timer); };
}
