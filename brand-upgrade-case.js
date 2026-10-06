export function renderBrandUpgradeCase({ project, mediaImage, namedFiles, filesIn, routes }) {
  const root = "images/品牌视觉升级/";
  const picture = (name, alt, className = "", eager = false) => {
    const [file] = namedFiles(root, [name]);
    if (!file) return "";
    const markup = mediaImage(file, alt, className);
    return eager ? markup.replace('loading="lazy"', 'loading="eager" fetchpriority="high"') : markup;
  };
  const heading = (id, number, title, accent, copy) => `<header class="bu-heading"><h2 id="${id}"><span class="bu-section-number" aria-hidden="true">${number}</span><span>${title}<span class="title-accent">${accent}</span></span></h2><p>${copy}</p></header>`;
  const card = (name, caption, className = "") => `<article>${picture(name, caption, className)}<p class="bu-caption">${caption}</p></article>`;
  const more = (label, files, layout = "bu-extra-grid") => files.length ? `<details class="bu-more"><summary>${label}<span aria-hidden="true">＋</span></summary><div class="${layout}">${files.map(file => `<article>${mediaImage(file, file.split("/").pop().replace(/\.[^.]+$/, ""), "bu-extra-image")}<p class="bu-caption">${file.split("/").pop().replace(/\.[^.]+$/, "")}</p></article>`).join("")}</div></details>` : "";
  const goals = [
    ["统一质感", "协调产品材质、色调与光影，让不同产品呈现一致的品质感。"],
    ["建立调性", "以科技感传递专业可信，以柔和表达保留母婴护理的亲和温度。"],
    ["延续识别", "将主KV的视觉语言延伸至商城、私域与服务物料，保持多触点表达连续。"],
  ];
  const goalIcons = [
    '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.25l8 4.5"/>',
    '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/>',
    '<rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v5M4.5 17v-4h15v4"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/><path d="M12 13v4"/>',
  ];
  const rules = [
    ["设计思路1.webp", "蓝白色彩", "以蓝白基调建立清晰、洁净的品牌识别。", "色彩参考"],
    ["设计思路2.webp", "柔和光影", "以柔和光影与圆润曲线保留母婴护理的亲和温度。", "光影参考"],
    ["主视觉未修图.webp", "有序构图", "通过产品体量、高低与前后关系建立系列产品层级。", "构图过程素材"],
  ];
  const process = [
    ["视觉升级单品渲染窗口.webp", "01 / 单品渲染", "材质、灯光与镜头调试，建立产品的质感与光影基准。"],
    ["设觉升级KV修图.webp", "02 / 精修与合成", "统一色调、投影和空间关系，完成系列产品的画面表达。"],
  ];
  const mainImages = [
    ["pro有赞主图新 800_看图王.webp", "Pro / 产品与核心卖点"],
    ["plus有赞主图新 800_看图王.webp", "Plus / 产品与核心卖点"],
    ["有赞主图新 800_看图王.webp", "赠品礼包 / 商品信息"],
    ["超净储奶袋主图200ml_看图王.webp", "储奶袋 / 单品延展"],
  ];
  const mainExtras = filesIn(root).filter(file => /(?:有赞主图|储奶袋主图)/.test(file) && !mainImages.some(([name]) => file === root + name));
  const privateImages = [
    ["追奶营第二期750_看图王.webp", "第二期 / 招募与参与引导"],
    ["追奶营第三期750_看图王.webp", "第三期 / 招募信息"],
    ["追奶营第三期邀请函.webp", "邀请函 / 定向沟通"],
  ];
  const privateExtras = filesIn(root).filter(file => /(?:奖励名单|样机须知|好评海报|佣金说明)/.test(file));

  return `<main id="main-content" class="brand-upgrade-case"><div class="bu-shell">
    <section class="bu-hero" aria-labelledby="bu-title">
      <div class="bu-hero-copy"><h1 id="bu-title">品牌<br><span class="title-accent">视觉升级</span></h1><p class="bu-lead"><span>统一产品质感，</span><span>建立专业而有温度的品牌表达。</span></p><dl class="bu-meta"><div><dt>项目时间</dt><dd>${project.period}</dd></div><div><dt>项目职责</dt><dd>独立执行 / 视觉策略 / 渲染与合成 / 延展</dd></div></dl></div>
      <div class="bu-hero-art">${picture("品牌视觉升级主KV2.webp", "品牌视觉升级首屏系列主视觉", "bu-hero-image", true)}<p class="bu-caption">系列主视觉 / 科技感与母婴亲和感的统一表达</p></div>
    </section>
    <section class="bu-overview" aria-label="项目交付概览"><article><h2>项目排期</h2><strong>1周</strong><p>2025年8月 · 核心物料执行</p></article><article><h2>执行方式</h2><strong>独立完成</strong><p>策略 / 渲染 / 合成 / 延展</p></article><article><h2>延展范围</h2><strong>多触点</strong><p>微信商城 / 私域 / 线下服务</p></article></section>

    <section class="bu-section" aria-labelledby="bu-strategy">
      ${heading("bu-strategy", "01", "统一产品质感，", "建立品牌识别", "产品材质、光影和画面表达存在差异，需要建立一致的品牌视觉基准。")}
      <div class="bu-goals">${goals.map(([title, copy], index) => `<article><span class="bu-goal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${goalIcons[index]}</svg></span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
      <div class="bu-strategy"><div><p class="bu-label">视觉方向 / 表达权重</p><div class="bu-ratios"><article><strong aria-label="80%"><span data-bu-count="80" aria-hidden="true">80</span><span aria-hidden="true">%</span></strong><h3>科技感</h3><p>精密秩序 · 清透材质</p></article><article><strong aria-label="20%"><span data-bu-count="20" aria-hidden="true">20</span><span aria-hidden="true">%</span></strong><h3>母婴亲和感</h3><p>柔和光影 · 圆润曲线</p></article></div><div class="bu-ratio-bar" aria-hidden="true"><span></span></div><p class="bu-note">视觉表达权重，不作为业务效果指标。</p></div><div class="bu-keywords"><h3>视觉关键词</h3><ul>${["蓝白基调", "清透材质", "柔和光影", "圆润曲线", "有序构图"].map(word => `<li>${word}</li>`).join("")}</ul></div></div>
    </section>

    <section class="bu-section" aria-labelledby="bu-rules">
      ${heading("bu-rules", "02", "将视觉策略转化为", "设计规则", "用色彩、光影与构图说明具体选择，让视觉方向有清晰的画面依据。")}
      <div class="bu-rules">${rules.map(([name, title, copy, caption]) => `<article>${picture(name, `${title}：${caption}`, "bu-rule-image")}<h3>${title}</h3><p>${copy}</p><p class="bu-reference">${caption}</p></article>`).join("")}</div>
    </section>

    <section class="bu-section" aria-labelledby="bu-execution">
      ${heading("bu-execution", "03", "从单品渲染到", "系列主视觉", "部分产品采用3D渲染，结合产品与场景素材完成精修合成，统一产品质感。")}
      <div class="bu-process">${process.map(([name, title, copy]) => `<article>${picture(name, `${title}制作窗口`, "bu-process-image")}<h3><span class="bu-section-number" aria-hidden="true">${title.split(" / ")[0]}</span><span>${title.split(" / ")[1]}</span></h3><p>${copy}</p></article>`).join("")}</div>
      <div class="bu-subheading"><h3>最终主KV</h3><p>用完整系列画面检验材质、色调、光影与产品构图的一致性。</p></div>
      ${card("品牌视觉升级主KV.webp", "系列产品主KV / 统一视觉基准", "bu-final-kv")}
    </section>

    <section class="bu-section" aria-labelledby="bu-commerce">
      ${heading("bu-commerce", "04", "从品牌主视觉到", "商品浏览", "用商城实际展示与代表商品主图并列，呈现同一视觉语言在商品信息中的延展。")}
      <div class="bu-commerce"><div class="bu-phone">${picture("微信商城主图展示.webp", "微信商城手机端实际展示", "bu-phone-image")}<p class="bu-caption">微信商城 / 手机端展示</p></div><div class="bu-main-grid">${mainImages.map(([name, caption]) => card(name, caption, "bu-main-image")).join("")}</div></div>
      <dl class="bu-adaptation"><div><dt>一致性保留</dt><dd>蓝白基调 / 产品质感 / 品牌识别</dd></div><div><dt>触点适配</dt><dd>卖点优先级 / 价格与利益信息 / 手机端阅读</dd></div></dl>
      ${more("更多商品主图", mainExtras)}
    </section>

    <section class="bu-section" aria-labelledby="bu-private">
      ${heading("bu-private", "05", "从商品展示到", "活动沟通", "按招募、邀请和参与激励组织私域物料，保留蓝白识别，并按任务调整信息层级。")}
      <div class="bu-posters">${privateImages.map(([name, caption]) => card(name, caption, "bu-poster-image")).join("")}</div>
      ${more("更多私域与口碑物料", privateExtras, "bu-extra-grid bu-extra-posters")}
    </section>

    <section class="bu-section" aria-labelledby="bu-service">
      ${heading("bu-service", "06", "从屏幕延展到", "线下服务", "用设计稿与印刷实物并列，说明视觉系统如何承接购买后的服务信息。")}
      <div class="bu-service"><article><h3>设计稿 / 内外页</h3>${picture("母乳顾问服务DM卡内外页 235mmx165mm.webp", "母乳顾问服务卡内外页设计稿", "bu-service-image")}<p class="bu-caption">服务卡设计 / 产品、服务与行动信息</p></article><article><h3>印刷实物 / 内页</h3>${picture("线下卡打印内页.webp", "母乳顾问服务卡内页印刷实物", "bu-service-image")}<p class="bu-caption">印刷实物 / 阅读与执行效果</p></article></div>
      ${more("补充服务物料：延保DM卡", namedFiles(root, ["延保DM卡正反面 148mmx148mm_看图王.webp"]), "bu-service-extra")}
    </section>

    <section class="bu-section" aria-labelledby="bu-review">
      ${heading("bu-review", "07", "交付成果与", "延展原则", "从统一的品牌视觉基准出发，连接系列产品、商品信息和线上线下服务触点。")}
      <div class="bu-review"><article><h3>形成的视觉成果</h3><p>建立兼顾科技感与母婴亲和感的蓝白表达，完成系列主KV、商品主图、私域活动与线下服务卡。</p></article><article><h3>后续延展原则</h3><p>延续产品质感、色彩与品牌识别；按触点调整内容密度、卖点顺序和行动信息，保持表达连续。</p></article></div>
    </section>
    <section class="bu-closing" aria-label="联系与作品导航"><div><h2>让视觉表达应用到每一个触点</h2><p>品牌视觉/3D产品渲染</p></div><a class="button button-secondary" href="${routes.contact}">查看联系方式 ↗</a></section>
    <a class="bu-back" href="${routes.portfolio}">返回全部作品 <span aria-hidden="true">↗</span></a>
  </div></main>`;
}

export function initBrandCountUp(root) {
  const group = root?.querySelector(".bu-ratios");
  if (!group) return () => {};
  const counters = Array.from(group.querySelectorAll("[data-bu-count]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let observer;
  let started = false;
  const finish = () => {
    window.cancelAnimationFrame(frame);
    counters.forEach(counter => { counter.textContent = counter.dataset.buCount; });
    group.dataset.countState = "complete";
  };
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    finish();
    return () => {};
  }
  counters.forEach(counter => { counter.textContent = "0"; });
  group.dataset.countState = "pending";
  const start = () => {
    if (started) return;
    started = true;
    observer.disconnect();
    group.dataset.countState = "running";
    const began = performance.now();
    const tick = now => {
      const progress = Math.min((now - began) / 1200, 1);
      const eased = 1 - (1 - progress) ** 3;
      counters.forEach(counter => { counter.textContent = String(Math.round(Number(counter.dataset.buCount) * eased)); });
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else finish();
    };
    frame = window.requestAnimationFrame(tick);
  };
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
  }, { threshold: .45 });
  observer.observe(group);
  const onMotionChange = () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    finish();
  };
  reducedMotion.addEventListener("change", onMotionChange);
  return () => {
    observer.disconnect();
    window.cancelAnimationFrame(frame);
    reducedMotion.removeEventListener("change", onMotionChange);
  };
}
