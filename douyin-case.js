import { caseHeading, caseIcon, numberedTitle } from "./case-ui.js?v=20261006-comments";
// Curated case: explain the roles of live scenes, cards, promotions and motion.
export function renderDouyinCase({ project, mediaImage, namedFiles, filesIn, routes }) {
  const root = "images/抖音视觉体系0-1/";
  const picture = (name, alt, className = "", eager = false) => {
    const [file] = namedFiles(root, [name]);
    if (!file) return "";
    const markup = mediaImage(file, alt, className);
    return eager ? markup.replace('loading="lazy"', 'loading="eager"') : markup;
  };
  const heading = (id, number, title, accent, copy) => caseHeading("douyin-heading", id, number, title, accent, copy);
  const showcase = [
    ["3月日常抖音直播间_看图王.webp", "日常直播 · 吸奶器", "产品、主播与权益信息的组合"],
    ["3月日常羊脂膏抖音直播间_看图王.webp", "日常直播 · 羊脂膏", "同一场景语言中的产品适配"],
    ["38羊脂膏直播间全屏弹窗_看图王.webp", "活动弹窗 · 羊脂膏", "集中呈现价格与组合优惠"],
  ];
  const framework = [
    ["01", "场景承接", "背景与常驻信息", "建立品牌识别和直播氛围"],
    ["02", "产品讲解", "系列手卡与功能说明", "配合主播展开产品信息"],
    ["03", "活动转化", "活动KV与全屏弹窗", "赋能表达优惠与购买权益"],
  ];
  const hierarchy = [
    ["01", "品牌与主题", "顶部建立品牌与产品主题，帮助用户快速识别直播内容。"],
    ["02", "主播与产品", "中部组织主播、产品和卖点，形成观看与讲解的视觉重点。"],
    ["03", "权益与服务", "价格、组合与服务集中分区，减少重点信息之间的竞争。"],
  ];
  const cards = [
    ["抖音手卡1.webp", "01 需求识别", "从使用需求进入讲解"],
    ["抖音手卡2.webp", "02 原理说明", "将提纯流程可视化"],
    ["抖音手卡8.webp", "03 产品特点", "突出产品特性与差异"],
    ["抖音手卡12.webp", "04 购买承接", "集中表达组合与价格"],
  ];
  const selectedCards = new Set(cards.map(([name]) => root + name));
  const extraCards = filesIn(root).filter(file => /抖音手卡\d+\.(?:jpg|webp)$/.test(file) && !selectedCards.has(file))
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  const results = [
    ["覆盖关键触点", "将直播场景、活动弹窗、讲解手卡和动态素材纳入同一项目展示。"],
    ["明确阅读任务", "区分品牌识别、产品讲解与权益信息，让各类物料承担清楚的作用。"],
    ["支持主题适配", "展示日常、春季与活动主题的不同表达，保留产品识别与信息组织。"],
  ];

  return `<main id="main-content" class="douyin-case">
    <div class="douyin-shell">
      <section class="douyin-intro" aria-labelledby="douyin-title">
        <h1 id="douyin-title">抖音视觉体系 <span class="title-accent">0 → 1</span></h1>
        <p class="douyin-lead">从直播场景到产品讲解与活动转化，<br>让分散物料形成清晰、连续的视觉表达。</p>
        <dl class="douyin-meta"><div><dt>项目职责</dt><dd>${project.role}</dd></div><div><dt>项目周期</dt><dd>${project.period}</dd></div><div><dt>交付范围</dt><dd>场景 / 弹窗 / 手卡 / 动态素材</dd></div></dl>
        <div class="douyin-showcase" aria-label="代表成果总览">${showcase.map(([file, title, copy]) => `<article>${picture(file, title, "douyin-scene-image", true)}<h3>${title}</h3></article>`).join("")}</div>
      </section>
      <section class="douyin-section" aria-labelledby="douyin-framework-title">
        ${heading("douyin-framework-title", "01", "按直播任务", "组织触点", "")}
        <div class="douyin-framework">${framework.map(([num, title, line1, line2]) => `<article class="case-icon-card">${caseIcon({"01":"layers", "02":"cube", "03":"target"}[num])}<h3>${title}</h3><p>${line1}<br>${line2}</p></article>`).join("")}</div>
      </section>
      <section class="douyin-section" aria-labelledby="douyin-scenes-title">
        ${heading("douyin-scenes-title", "02", "直播场景与", "信息层级", "分开展示持续观看的场景信息，与活动时刻的集中提示。")}
        <div class="douyin-scene-layout"><div class="douyin-scene-pair"><article>${picture("羊脂膏直播间 1920x1080.webp", "羊脂膏直播场景", "douyin-scene-image")}<h3>直播场景</h3></article><article>${picture("羊脂膏直播间全屏弹窗.webp", "羊脂膏全屏活动弹窗", "douyin-scene-image")}<h3>全屏活动弹窗</h3></article></div><div class="douyin-hierarchy">${hierarchy.map(([num, title, copy]) => `<article class="case-icon-card">${caseIcon({"01":"compass", "02":"cube", "03":"target"}[num])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></div>
      </section>
      <section class="douyin-section" aria-labelledby="douyin-cards-title">
        ${heading("douyin-cards-title", "03", "产品讲解", "手卡序列", "以需求、原理、产品特点和购买权益组织代表手卡。")}
        <div class="douyin-card-grid">${cards.map(([file, title, copy]) => `<article><h3 class="case-step-title">${numberedTitle(title.slice(0, 2), title.slice(3))}</h3>${picture(file, title)}<p>${copy}</p></article>`).join("")}</div>
        ${extraCards.length ? `<details class="douyin-more"><summary>更多工艺、检测与服务手卡<span aria-hidden="true">＋</span></summary><div class="douyin-extra-grid">${extraCards.map(file => mediaImage(file, `补充讲解手卡 ${file.match(/手卡(\d+)/)[1]}`)).join("")}</div></details>` : ""}
      </section>
      <section class="douyin-section" aria-labelledby="douyin-adaptation-title">
        ${heading("douyin-adaptation-title", "04", "活动与", "视觉适配", "根据传播场景调整氛围，保持产品识别与权益阅读清楚。")}
        <div class="douyin-adaptation"><article class="douyin-panel douyin-daily"><h3>活动讲解</h3>${picture("抖音年货节弹窗手卡.webp", "抖音年货节弹窗手卡")}<p>产品组合 / 活动权益 / 赠品说明</p></article><article class="douyin-panel douyin-promotions"><h3>活动传播</h3><div class="douyin-promotion-pair"><div>${picture("抖音KVpro.webp", "Pro 活动KV")}<h4>Pro 活动KV</h4></div><div>${picture("抖音KVplus.webp", "Plus 活动KV")}<h4>Plus 活动KV</h4></div></div><p>品牌与产品识别延续，活动色彩与促销氛围适配</p></article></div>
      </section>
      <section class="douyin-section" aria-labelledby="douyin-application-title">
        ${heading("douyin-application-title", "05", "手机端与", "动态延展", "连接静态设计稿、手机端呈现与动态传播素材。")}
        <div class="douyin-application"><article class="douyin-panel douyin-phones"><h3>手机端版式呈现</h3><div class="douyin-phone-pair"><div>${picture("直播手卡迭代_看图王(1).webp", "蓝白版式手机端呈现")}<h4>蓝白版式</h4></div><div>${picture("直播手卡迭代_看图王.webp", "春季版式手机端呈现")}<h4>春季版式</h4></div></div><p>不同主题中的信息组织与屏幕适配</p></article><article class="douyin-panel douyin-motion"><h3>动态传播素材</h3><div class="douyin-motion-stack">${picture("img_v3_02165_3031fe54-72a9-45a2-ba52-26f018898cbg.gif", "抖音商城榜单动态传播素材 · 紫色版")}${picture("img_v3_02165_9fd7aa6a-f857-4fa5-abfb-8f15cad5e4eg.gif", "抖音商城榜单动态传播素材 · 浅色版")}</div><p>榜单主题的动态画面延展</p></article></div>
      </section>
      <section class="douyin-section douyin-delivery" aria-labelledby="douyin-delivery-title">
        ${heading("douyin-delivery-title", "06", "交付与", "设计总结", "从单张物料到多种直播任务，呈现场景、讲解与活动的协同。")}
        <div class="douyin-results">${results.map(([title, copy], index) => `<article class="case-icon-card">${caseIcon(["tree", "compass", "layers"][index])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
      </section>
      <nav class="douyin-actions" aria-label="案例后续导航"><a class="button button-secondary" href="${routes.portfolio}">返回全部作品 <span aria-hidden="true">↗</span></a><a class="button" href="${routes.contact}">查看联系方式 <span aria-hidden="true">↗</span></a></nav>
    </div>
  </main>`;
}
