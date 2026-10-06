import { caseHeading, caseIcon, countValue } from "./case-ui.js?v=20261006-comments";
export function renderThreeDCase({ project, mediaImage, namedFiles, filesIn, routes }) {
  const root = "images/战略新品3D高精度资产库/";
  const selected = new Set();
  const picture = (name, alt, className = "", eager = false) => {
    const [file] = namedFiles(root, [name]);
    if (!file) return "";
    selected.add(file);
    const markup = mediaImage(file, alt, className);
    return eager ? markup.replace('loading="lazy"', 'loading="eager" fetchpriority="high"') : markup;
  };
  const heading = (id, number, label, title, accent, copy) => caseHeading("three-d-heading", id, number, title, accent, copy);
  const card = (name, caption, className = "") => `<article>${picture(name, caption, `${className}${name === "恒温调奶杯芯片渲染.webp" ? " three-d-chip-image" : ""}`)}<p class="three-d-caption">${caption}</p></article>`;
  const group = (title, copy, images, columns = 2) => `<section class="three-d-group"><div class="three-d-group-heading"><h3>${title}</h3><p>${copy}</p></div><div class="three-d-grid three-d-grid-${columns}">${images.map(([name, caption]) => card(name, caption, "three-d-study")).join("")}</div></section>`;
  const count = filesIn(root).filter(file => /\/(消毒柜|恒温调奶杯)/.test(file)).length;
  const principles = [
    ["形态与材质", "通过整机外观、表面质感和局部细节，呈现清晰、可信的产品形象。"],
    ["结构与功能", "以结构分解和功能可视化，让内部组件与关键卖点更容易理解。"],
    ["场景与应用", "围绕不同表达目的调整镜头、光影与空间，支持产品内容的连续延展。"],
  ];
  const categories = [
    ["消毒柜微开门.webp", "整机外观", "形态、材质与产品识别", "商品主图 / 产品概览"],
    ["消毒柜爆炸图.webp", "内部结构", "组件关系与空间说明", "详情内容 / 结构讲解"],
    ["恒温调奶杯防漏卖点渲染图.webp", "功能表达", "关键功能的直观呈现", "卖点模块 / 创意素材"],
    ["消毒柜抱小孩场景王.webp", "使用场景", "环境与使用语境", "品牌KV / 场景内容"],
  ];
  const primary = `
    <section class="three-d-hero" aria-labelledby="three-d-title">
      <div class="three-d-hero-copy">
        <h1 id="three-d-title">战略新品<br><span class="title-accent">3D高精度资产库</span></h1>
        <p class="three-d-lead"><span>以产品形态、材质和光影为基础，</span><span>组织主视觉、内部结构与功能渲染，</span><span>让新品资产适配不同产品触点。</span></p>
        <dl class="three-d-meta"><div><dt>项目时间</dt><dd>${project.period}</dd></div><div><dt>项目职责</dt><dd>${project.role}</dd></div></dl>
      </div>
      <div class="three-d-hero-art" aria-label="两款产品的完整主视觉">${picture("消毒柜新KV.webp", "消毒柜首屏完整主KV", "three-d-hero-kv", true)}${picture("恒温调奶杯kv.webp", "恒温调奶杯首屏完整主KV", "three-d-hero-kv", true)}</div>
    </section>
    <section class="three-d-metrics" aria-label="产品资产概览"><article><h2>代表产品</h2><strong>${countValue("2款")}</strong><p>消毒柜 / 恒温调奶杯</p></article><article><h2>当前收录素材</h2><strong>${countValue(`${count}张`)}</strong><p>整机 / 结构 / 功能 / 场景</p></article><article><h2>代表素材尺寸</h2><strong>${countValue("8K")}</strong><p>${countValue("7680")} × ${countValue("4320")} 像素</p></article></section>
    <section class="three-d-section" aria-labelledby="three-d-approach">
      ${heading("three-d-approach", "01", "ASSET APPROACH", "从产品形态到", "视觉资产", "")}
      <div class="three-d-principles">${principles.map(([title, copy], index) => `<article class="case-icon-card">${caseIcon(["cube", "layers", "tree"][index])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
    </section>
    <section class="three-d-section" aria-labelledby="three-d-cabinet">
      ${heading("three-d-cabinet", "02", "FEATURED PRODUCT", "消毒柜：", "从外观到内部", "")}
      ${card("消毒柜新KV.webp", "主视觉 / 产品轮廓、空间与光影定调", "three-d-full-kv")}
      ${group("外观与材质细节", "用正面与开门状态展示产品形态、表面质感，以及不同角度下的体量关系。", [["消毒柜正面.webp", "正面资产 / 轮廓与表面质感"], ["消毒柜微开门.webp", "开门状态 / 体量与内部关系"]])}
      ${group("内部结构与组件关系", "通过结构拆解与多层陈列，解释产品内部的组件关系与空间组织。", [["消毒柜爆炸图.webp", "结构分解 / 组件关系"], ["消毒柜三层展示.webp", "内部空间 / 多层陈列"]])}
      ${group("功能可视化与光影表达", "分别呈现灯珠布局与工作氛围，让空间结构和功能状态更直观。", [["消毒柜灯盘最新版辉光.webp", "灯珠布局 / 内部空间"], ["消毒柜夜晚消杀.webp", "夜间场景 / 工作氛围"]])}
      <section class="three-d-scene">${picture("消毒柜抱小孩场景王.webp", "消毒柜家庭使用场景", "three-d-scene-image")}<div><h3>让产品进入使用场景</h3><p>从独立产品转向家庭空间，以人物、环境与产品关系补充使用语境，让同一款产品形成不同的传播表达。</p><span class="three-d-label">应用方向</span><p class="three-d-application">品牌场景 / 产品详情 / 内容传播</p></div></section>
    </section>
    <section class="three-d-section" aria-labelledby="three-d-kettle">
      ${heading("three-d-kettle", "03", "SECOND PRODUCT", "恒温调奶杯：", "整机与核心组件", "")}
      ${card("恒温调奶杯kv.webp", "主视觉 / 材质、轮廓与产品识别", "three-d-full-kv")}
      ${group("整机与操作细节", "以整机角度延展呈现产品形态，配合按键场景说明操作细节。", [["恒温调奶杯角度延展渲染.webp", "整机角度延展 / 产品形态"], ["恒温调奶杯水杯按键渲染图.webp", "按键场景 / 操作细节"]])}
      ${group("核心组件与功能卖点", "分别呈现内部组件、芯片与电池保护结构，让每张资产承担明确的信息任务。", [["恒温调奶杯保险渲染图.webp", "组件分解 / 内部关系"], ["恒温调奶杯芯片渲染.webp", "芯片细节 / 核心组件"], ["恒温调奶杯电池保护层渲染图.webp", "电池保护 / 结构说明"]], 3)}
    </section>
    <section class="three-d-section" aria-labelledby="three-d-organization">
      ${heading("three-d-organization", "04", "ASSET ORGANIZATION", "资产分类与", "应用方向", "")}
      <div class="three-d-categories">${categories.map(([name, title, copy, application]) => `<article>${picture(name, `${title}代表资产`, "three-d-category-image")}<h3>${title}</h3><p>${copy}</p><p class="three-d-category-use">${application}</p></article>`).join("")}</div>
      <div class="three-d-reuse"><h3>保持产品基准，调整表达方式</h3><p>围绕产品形态与材质保持识别一致，按触点调整镜头、场景、信息留白和输出比例，减少重复制作。</p></div>
    </section>`;
  const extras = (product, title) => {
    const files = filesIn(root).filter(file => file.startsWith(root + product) && !selected.has(file));
    return files.length ? `<details class="three-d-more"><summary>${title}<span aria-hidden="true">＋</span></summary><div class="three-d-extra-grid">${files.map(file => `<article>${mediaImage(file, file.split("/").pop().replace(/\.[^.]+$/, ""), "three-d-study")}<p class="three-d-caption">${file.split("/").pop().replace(/\.[^.]+$/, "")}</p></article>`).join("")}</div></details>` : "";
  };
  return `<main id="main-content" class="three-d-case"><div class="three-d-shell">${primary}
    <section class="three-d-section" aria-labelledby="three-d-delivery">
      ${heading("three-d-delivery", "05", "DELIVERY & REVIEW", "交付范围与", "复用原则", "")}
      <div class="three-d-review"><article><h3>交付范围</h3><p>覆盖两款产品的主KV、整机外观、内部结构、组件细节与场景渲染。重点资产精选展示，完整素材可按产品和用途继续浏览。</p></article><article><h3>复用原则</h3><p>优先延续产品形态、材质与关键识别，再根据表达目标调整镜头和场景，兼顾视觉一致性与不同内容的适配。</p></article></div>
      ${extras("消毒柜", "更多消毒柜资产")}${extras("恒温调奶杯", "更多恒温调奶杯资产")}
    </section>
    <section class="three-d-closing" aria-label="联系与作品导航"><div><h2>让新品资产持续服务产品表达</h2><p>品牌视觉 / 3D资产 / 电商应用</p></div><a class="button button-secondary" href="${routes.contact}">查看联系方式 ↗</a></section>
    <a class="three-d-back" href="${routes.portfolio}">返回全部作品 <span aria-hidden="true">↗</span></a>
  </div></main>`;
}
