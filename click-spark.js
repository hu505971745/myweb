// React Bits ClickSpark's radial line effect, adapted to the native site.
export function initClickSpark({ sparkSize = 10, sparkRadius = 15, sparkCount = 8, duration = 400 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'click-spark-canvas';
  canvas.setAttribute('aria-hidden','true');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return () => {}; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  let bursts = [], frame = 0, width = 0, height = 0;
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1,2);
    canvas.width = Math.round(width*ratio); canvas.height = Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
  }
  function clear() {
    cancelAnimationFrame(frame); frame=0; bursts=[];
    ctx.clearRect(0,0,width,height);
  }
  function draw(now) {
    frame=0;
    ctx.clearRect(0,0,width,height);
    bursts = bursts.filter(s => now-s.start < duration);
    ctx.lineWidth=2; ctx.lineCap='round';
    for (const spark of bursts) {
      const t = Math.min(1,Math.max(0,(now-spark.start)/duration));
      const eased=t*(2-t), distance=eased*sparkRadius, length=sparkSize*(1-eased);
      ctx.strokeStyle=spark.color;
      for (let i=0;i<sparkCount;i++) {
        const angle=2*Math.PI*i/sparkCount, c=Math.cos(angle), s=Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(spark.x+distance*c,spark.y+distance*s);
        ctx.lineTo(spark.x+(distance+length)*c,spark.y+(distance+length)*s);
        ctx.stroke();
      }
    }
    if (bursts.length) frame=requestAnimationFrame(draw);
  }
  function click(e) {
    // Keyboard activations keep their native focus feedback; no corner spark.
    if (reduced.matches || e.detail===0 || e.button!==0) return;
    const color=getComputedStyle(canvas).getPropertyValue('--accent').trim() || '#4b8dff';
    bursts.push({x:e.clientX,y:e.clientY,start:performance.now(),color});
    bursts=bursts.slice(-32);
    if (!frame) frame=requestAnimationFrame(draw);
  }
  window.addEventListener('click',click,{capture:true,passive:true,signal:events.signal});
  window.addEventListener('resize',resize,{passive:true,signal:events.signal});
  document.addEventListener('visibilitychange',() => {if(document.hidden)clear();},{signal:events.signal});
  reduced.addEventListener('change',clear,{signal:events.signal});
  resize();
  return () => { clear(); events.abort(); canvas.remove(); };
}
