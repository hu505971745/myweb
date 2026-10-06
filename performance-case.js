import { caseHeading, caseIcon, numberedTitle, countValue } from "./case-ui.js?v=20261006-comments";
// The performance case uses paired creatives and data rather than a masonry gallery.
export function renderPerformanceCase({ project, mediaImage, namedFiles, filesIn, routes }) {
  const root = "images/核心产品投放图优化/";
  const picture = (name, alt, className = "", eager = false) => {
    const [file] = namedFiles(root, [name]);
    if (!file) return "";
    const markup = mediaImage(file, alt, className);
    return eager ? markup.replace('loading="lazy"', 'loading="eager" fetchpriority="high"') : markup;
  };
  const heading = (id, number, label, title, accent, copy) => caseHeading("perf-heading", id, number, title, accent, copy);
  const dataSource = (name, alt, copy) => `
    <div class="perf-minor-source"><div><h4>原始投放记录</h4><p>${copy}</p></div>${picture(name, alt, "perf-source")}</div>`;
  const creativeMetrics = (values) => `<dl class="perf-creative-metrics">${values.map((value, index) => `<div><dt>${["点击率", "点击转化率", "投入产出比"][index]}</dt><dd>${countValue(value)}</dd></div>`).join("")}</dl>`;
  const creatives = [
    {
      file: "羊脂膏投放图1.webp", alt: "孕妇场景羊脂膏投放创意", tag: "用户场景 / 需求关联",
      title: "从护理需求建立产品关联",
      copy: "以孕妇形象引入情境，搭配产品主体和分阶段护理信息，建立人群、需求与产品关联。",
      values: ["8.57%", "19.75%", "3.62"],
    },
    {
      file: "羊脂膏投放图.webp", alt: "TOP1榜单羊脂膏投放创意", tag: "榜单信任 / 产品聚焦",
      title: "用榜单识别强化关注焦点",
      copy: "以TOP1信息与产品特写组织画面，利用金黑反差强化产品识别，集中呈现信任线索。",
      values: ["9.08%", "15.29%", "2.84"],
    },
  ];
  const rows = [
    ["截图基准行", "7.31%", "11.59%", "1.79"],
    ["孕妇场景", "8.57%", "19.75%", "3.62"],
    ["亲喂场景", "7.75%", "17.81%", "3.50"],
    ["畅销榜TOP1", "9.08%", "15.29%", "2.84"],
  ];
  const principles = [
    ["让需求先被理解", "用人群与使用情境建立关联，让用户快速找到与自己有关的产品价值。"],
    ["让产品成为焦点", "协调产品占比、背景和信息层级，明确画面的主要阅读路径。"],
    ["让表达接受验证", "将素材与对应指标连接，区分吸引点击和促进购买的不同表现。"],
  ];
  const workflow = [
    ["识别核心需求", "明确产品卖点与用户场景，选择画面的主要切入点。"],
    ["组织视觉层级", "协调产品、标题和利益信息，建立清晰阅读顺序。"],
    ["对照创意表现", "分别阅读点击、转化和投入产出指标，避免只看单一数值。"],
    ["形成验证方向", "以现有表现提出下一轮表达组合与测试重点。"],
  ];
  const kettleSelection = [
    ["恒温调奶杯母乳场景.webp", "母乳场景 / 使用需求"],
    ["恒温调奶杯泡奶场景.webp", "冲调场景 / 功能关联"],
    ["恒温调奶杯防漏.webp", "防漏表达 / 卖点可视化"],
  ];
  const kettleExtras = filesIn(root).filter((file) => /恒温调奶杯/.test(file) && file !== `${root}恒温调奶杯.png` && !kettleSelection.some(([name]) => file === root + name));
  const extraKettleMarkup = kettleExtras.length ? `<details class="perf-more"><summary>更多调奶杯创意<span aria-hidden="true">＋</span></summary><div class="perf-extra-grid">${kettleExtras.map((file) => mediaImage(file, file.split("/").pop().replace(/\.[^.]+$/, ""))).join("")}</div></details>` : "";
  const rankingMarkup = namedFiles(root, ["羊脂膏排名.webp"]).length ? `<details class="perf-more"><summary>补充证据：类目榜单记录<span aria-hidden="true">＋</span></summary><p>保留原始榜单信息，补充TOP1表达的背景；榜单表现与创意投放效果分别阅读。</p>${picture("羊脂膏排名.webp", "羊脂膏类目榜单原始记录", "perf-source")}</details>` : "";

  return `<main id="main-content" class="performance-case">
    <div class="perf-shell">
      <section class="perf-hero" aria-labelledby="perf-title">
        <div class="perf-hero-copy">
          
          <h1 id="perf-title">核心产品<br><span class="title-accent">投放图优化</span></h1>
          <p class="perf-lead">从产品卖点到用户场景，重构创意的信息层级，结合投放数据复盘不同场景表现。</p>
          <dl class="perf-meta"><div><dt>项目时间</dt><dd>${project.period}</dd></div><div><dt>项目职责</dt><dd>${project.role}</dd></div><div><dt>交付范围</dt><dd>多产品投放创意</dd></div></dl>
        </div>
        <div class="perf-hero-art" aria-label="代表创意预览">
          ${picture("羊脂膏投放图1.webp", "孕妇场景羊脂膏代表创意", "perf-hero-first", true)}
          ${picture("羊脂膏投放图.webp", "TOP1榜单羊脂膏代表创意", "perf-hero-second", true)}
        </div>
      </section>
      <section class="perf-metrics" aria-label="羊脂膏代表创意的指标对照">
        <article><h2>点击率 · TOP1创意</h2><strong>${countValue("+24.21%")}</strong><p>${countValue("7.31%")} → ${countValue("9.08%")}</p></article>
        <article><h2>点击转化率 · 孕妇场景</h2><strong>${countValue("+70.41%")}</strong><p>${countValue("11.59%")} → ${countValue("19.75%")}</p></article>
        <article><h2>投入产出比 · 孕妇场景</h2><strong>${countValue("+102.23%")}</strong><p>${countValue("1.79")} → ${countValue("3.62")}</p></article>
      </section>
      <p class="perf-metric-note">指标分别对应不同创意，按原始截图基准行计算相对变化。</p>

      <section class="perf-section" aria-labelledby="perf-approach">
        ${heading("perf-approach", "01", "CREATIVE APPROACH", "优化方向与", "表达逻辑", "以产品、人群和使用场景建立清晰的创意切入点，再连接对应效果记录。")}
        <div class="perf-principles">${principles.map(([title, copy], index) => `<article class="case-icon-card">${caseIcon(["compass", "target", "chart"][index])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
      </section>

      <section class="perf-section" aria-labelledby="perf-lamb">
        ${heading("perf-lamb", "02", "FEATURED CASE", "羊脂膏：", "场景与信任", "先看两张代表创意，再对照三类场景的点击、转化与投入产出表现。")}
        <div class="perf-creatives">${creatives.map((creative) => `<article>
          ${picture(creative.file, creative.alt, "perf-square")}
          <div class="perf-creative-copy"><span class="perf-tag">${creative.tag}</span><h3>${creative.title}</h3><p>${creative.copy}</p>${creativeMetrics(creative.values)}</div>
        </article>`).join("")}</div>
        <div class="perf-data">
          <div class="perf-data-title"><h3 id="perf-comparison">不同创意的表现对照</h3><p>原始截图中的同组记录</p></div>
          <div class="perf-table-scroll" role="region" aria-labelledby="perf-comparison" tabindex="0">
            <table><thead><tr><th scope="col">创意表达</th><th scope="col">点击率</th><th scope="col">点击转化率</th><th scope="col">投入产出比</th></tr></thead><tbody>${rows.map((row, rowIndex) => `<tr>${row.map((value, columnIndex) => columnIndex === 0 ? `<th scope="row">${value}</th>` : `<td${(rowIndex === 1 && columnIndex > 1) || (rowIndex === 3 && columnIndex === 1) ? ' class="perf-best"' : ""}>${countValue(value)}</td>`).join("")}</tr>`).join("")}</tbody></table>
          </div>
          <p class="perf-source-label">数据依据 / 羊脂膏原始投放记录</p>
          ${picture("羊脂膏数据.webp", "羊脂膏完整原始投放数据，含基准行与三类创意记录", "perf-source")}
          ${rankingMarkup}
        </div>
      </section>

      <section class="perf-section" aria-labelledby="perf-products">
        ${heading("perf-products", "03", "PRODUCT APPLICATIONS", "其他产品的", "创意应用", "精选代表素材，按使用场景、功能信息和产品卖点组织展示。")}
        <section class="perf-product" aria-labelledby="perf-kettle">
          <h3 id="perf-kettle">恒温调奶杯 · 使用场景与功能表达</h3>
          <div class="perf-triptych">${kettleSelection.map(([name, caption]) => `<div>${picture(name, caption, "perf-square")}<p class="perf-caption">${caption}</p></div>`).join("")}</div>
          ${dataSource("恒温壶数据.webp", "恒温壶完整原始投放记录", "用大量不同场景，小流量快速验证，拿到真实数据")}
          ${extraKettleMarkup}
        </section>
        <section class="perf-product" aria-labelledby="perf-pump">
          <h3 id="perf-pump">吸奶器 · 产品与利益信息</h3>
          <div class="perf-triptych">${["吸奶器车图.webp", "吸奶器车图1.webp", "吸奶器车图2.webp"].map((file, index) => picture(file, `吸奶器投放创意${index + 1}`, "perf-square")).join("")}</div>
          ${dataSource("吸奶器数据.webp", "吸奶器完整原始投放记录", "配合大促强化利益点优势，AB测试，快速区分最优解")}
        </section>
        <section class="perf-product" aria-labelledby="perf-plus">
          <div class="perf-product-heading"><h3 id="perf-plus">PLUS · 单品创意补充</h3></div>
          <div class="perf-plus-pair">${["plus投放图.webp", "plus投放图2.webp"].map((file, index) => picture(file, `PLUS单品投放创意${index + 1}`, "perf-square")).join("")}</div>
        </section>
      </section>

      <section class="perf-section" aria-labelledby="perf-review">
        ${heading("perf-review", "04", "REVIEW & NEXT ITERATION", "结果与", "迭代方向", "")}
        <div class="perf-workflow">${workflow.map(([title, copy], index) => `<article><h3 class="case-step-title">${numberedTitle(`0${index + 1}`, title)}</h3><p>${copy}</p></article>`).join("")}</div>
      </section>
      <section class="perf-closing" aria-label="联系与作品导航"><div><h2>从视觉表达，到效果复盘</h2><p>品牌视觉 / 电商创意 / 3D设计</p></div><a class="button button-secondary" href="${routes.contact}">查看联系方式 ↗</a></section>
      <a class="perf-back" href="${routes.portfolio}">返回全部作品 <span aria-hidden="true">↗</span></a>
    </div>
  </main>`;
}
