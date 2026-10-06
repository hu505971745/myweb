import {
  capabilities,
  experience,
  mediaCollections,
  metrics,
  profileMedia,
  projects,
  site,
} from "./content.js?v=20261006-profile-folder";
import { initClickSpark } from "./click-spark.js?v=20261005-spark";
import { initDepthCarousels } from "./depth-carousel.js?v=20261005-brand-refined";
import { initGrowthText } from "./growth-text.js?v=20261006-growth";
import { initScrollReveal } from "./scroll-reveal.js?v=20261006-entrance-overlap";
import { renderPerformanceCase } from "./performance-case.js?v=20261006-kettle-three-column";
import { renderDouyinCase } from "./douyin-case.js?v=20261006-comments";
import { renderCampaignCase } from "./campaign-case.js?v=20261006-campaign-folder";
import { renderThreeDCase } from "./three-d-case.js?v=20261006-comments";
import { renderBrandUpgradeCase, initBrandCountUp } from "./brand-upgrade-case.js?v=20261006-comments";

import { initCaseCountUp } from "./case-ui.js?v=20261006-comments";
import { initCaseTextFit } from "./case-text-fit.js?v=20261006-single-line";
import { updatePageMeta } from "./page-meta.js?v=20261006-launch";

const app = document.querySelector("#app");
initClickSpark();
let mediaFiles = [];
let masonryCleanup = [];
let lanyardCleanup = [];
let carouselCleanup = [];
let growthTextCleanup = () => {};
let heroEntranceCleanup = () => {};
let scrollRevealCleanup = () => {};
let brandCountCleanup = () => {};
let caseCountCleanup = () => {};
let lightboxCleanup = () => {};
let caseTextCleanup = () => {};

const routes = {
  home: "#/",
  portfolio: "#/portfolio",
  about: "#/about",
  stack: "#/tech-stack",
  contact: "#/contact",
};

const navItems = [
  { id: "home", label: site.name, shortLabel: "首页", href: routes.home, icon: "⌂" },
  { id: "about", label: "关于", shortLabel: "关于", href: routes.about, icon: "○" },
  { id: "portfolio", label: "作品", shortLabel: "作品", href: routes.portfolio, icon: "▣" },
  { id: "stack", label: "能力", shortLabel: "能力", href: routes.stack, icon: "◇" },
  { id: "contact", label: "联系", shortLabel: "联系", href: routes.contact, icon: "↗" },
];

function placeholder(label, className = "") {
  return `
    <div class="media-placeholder ${className}" role="img" aria-label="${label}占位区域">
      <span class="placeholder-index">MEDIA / PLACEHOLDER</span>
      <strong>${label}</strong>
      <span>下一阶段替换为真实视觉素材</span>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function mediaUrl(file) {
  return `./media/${file.split("/").map(encodeURIComponent).join("/")}`;
}

function mediaTitle(file) {
  file = file.split("/").pop();
  const descriptiveNames = {
    "750x1000  2.jpg": "年货节 · 吸奶器购机赠礼海报",
    "800x800 2.jpg": "吸奶器购机赠礼主图 · 粉色版",
    "主图第二张.jpg": "吸奶器购机赠礼主图 · 蓝色版",
  };
  if (descriptiveNames[file]) return descriptiveNames[file];

  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[_\s]*看图王/g, "")
    .replace(/[_\s]+/g, " ")
    .trim();
}

function mediaImage(file, alt, className = "", options = {}) {
  const safeAlt = escapeHtml(alt);
  const caption = options.caption === true
    ? `<figcaption>${escapeHtml(mediaTitle(file))}</figcaption>`
    : "";
  const lightboxAttributes = options.lightbox === false
    ? ""
    : `data-lightbox tabindex="0" role="button" aria-label="全屏查看：${safeAlt}"`;

  return `
    <figure class="media-figure ${className}">
      <img src="${mediaUrl(file)}${options.version ? `?v=${encodeURIComponent(options.version)}` : ""}" alt="${safeAlt}" loading="lazy" decoding="async" ${lightboxAttributes} />
      ${caption}
    </figure>
  `;
}

function collectionForProject(projectId) {
  return mediaCollections.find((collection) => collection.projectId === projectId);
}

function filesIn(folder) {
  return mediaFiles.filter((file) => file.startsWith(folder));
}

function namedFiles(folder, names) {
  return names.map((name) => `${folder}${name}`).filter((file) => mediaFiles.includes(file));
}

const visualBriefs = {
  "品牌视觉升级主KV": ["建立品牌的第一视觉印象，让不同产品以统一的气质出现在同一个画面中。", "以蓝白基调、柔和光影与有序的产品关系，平衡科技感和母婴亲和感。", "品牌主KV / 产品阵列 / 统一色彩与光影"],
  "微信商城主图优化": ["把品牌识别延续到商品浏览场景，让用户快速理解产品与核心信息。", "统一产品比例、背景色和信息层级，保持不同商品之间清晰、稳定的浏览节奏。", "商城商品主图 / 产品卖点表达 / 系列化版式"],
  "品牌视觉延展": ["将主视觉规则应用到新的画面组合，展示品牌语言在不同内容中的适配方式。", "延续主KV的色彩与产品质感，通过构图变化保持新鲜感与识别一致性。", "延展KV / 组合构图 / 品牌视觉应用"],
  "延保卡与母乳顾问服务卡": ["把产品购买后的服务内容转化为容易阅读、便于保留的品牌触点。", "以清晰的信息分区组织服务说明，在功能阅读与品牌亲和感之间建立平衡。", "延保服务卡 / 母乳顾问服务卡 / 正反面与内外页"],
  "私域活动海报": ["围绕追奶营与样机合作场景，让活动内容、参与规则和行动入口清晰可见。", "按活动主题建立主次层级，兼顾情绪引导与规则说明，让不同阶段的物料保持统一。", "追奶营海报 / 邀请与奖励物料 / 样机须知"],
  "用户口碑海报": ["将用户反馈整理为可阅读的口碑内容，补充产品之外的使用体验表达。", "突出反馈主体与关键信息，沿用品牌色彩与版式规则，避免多内容画面显得杂乱。", "口碑内容海报 / 反馈信息整理 / 私域传播物料"],
  "羊脂膏投放素材": ["围绕羊脂膏的护理需求组织素材，让使用场景与产品价值在首屏被理解。", "通过产品特写、场景线索和卖点层级形成不同创意表达，便于对照后续投放表现。", "羊脂膏投放创意 / 场景表达 / 卖点版式"],
  "恒温壶 / 调奶杯投放素材": ["将温度管理与冲调场景转化为直观的产品表达，降低功能理解成本。", "结合场景画面与产品主体，突出功能信息，同时保持视觉重心明确。", "恒温产品投放图 / 冲调场景 / 功能信息表达"],
  "恒温壶投放数据": ["把创意展示与原始投放记录连接起来，为素材复盘保留依据。", "保留数据截图中的指标与上下文，结合前面的素材进行阅读，不扩展未记录的结论。", "原始投放记录 / 指标对照 / 素材复盘依据"],
  "吸奶器投放素材": ["在投放画面中清楚呈现吸奶器产品与核心卖点，建立明确的关注焦点。", "调整产品占比与信息顺序，让产品识别、卖点阅读和场景感受形成连续路径。", "吸奶器投放图 / 产品卖点 / 视觉层级优化"],
  "吸奶器投放数据": ["用原始记录补充吸奶器创意的效果呈现，形成从素材到数据的完整阅读链路。", "数据图按原比例展示，可全屏查看细节；指标解读以截图中的实际信息为准。", "原始数据截图 / 创意效果对照 / 复盘记录"],
  "PLUS 投放素材": ["为PLUS产品补充独立的投放表达，保持系列识别并突出单品差异。", "以产品主体和核心信息为中心，延续统一的品牌质感与阅读层级。", "PLUS投放图 / 单品表达 / 系列视觉适配"],
  "直播间视觉体系与手卡": ["将直播间背景、贴片与手卡串联起来，形成面向实时讲解的视觉支持体系。", "按观看与讲解场景组织信息，统一色彩、产品识别和重点卖点，减少触点之间的视觉跳跃。", "直播视觉物料 / 讲解手卡 / 场景化信息呈现"],
  "直播间场景与弹窗": ["以直播场景承接品牌与产品信息，在持续观看和即时活动提示之间形成明确层级。", "将场景背景与全屏弹窗分别组织，保持产品主体、关键卖点和品牌色彩的一致。", "直播间场景图 / 全屏弹窗 / 产品信息表达"],
  "产品讲解手卡": ["为主播的产品讲解提供可快速调用的视觉辅助，让信息表达更有顺序。", "按主题拆分讲解内容，用系列化版式统一产品与卖点呈现，便于连续讲解。", "系列讲解手卡 / 产品主题分组 / 直播辅助物料"],
  "羊脂膏投放数据": ["将素材与投放表现放在同一条阅读链路中，展示不同创意场景的指标对照。", "从原始截图提取点击率与点击转化率，保留完整截图用于核对，不延伸未记录的因果结论。", "六项原始指标 / 场景对照 / 完整数据截图"],
  "羊脂膏类目排名": ["将产品、榜单标识与原始排名记录结合，补充产品在类目中的表现证据。", "用产品主体建立识别焦点，排名截图保留原始上下文；榜单信息以原图所示记录为准。", "产品PNG / TOP 1标识 / 原始排名记录"],
  "消毒柜主KV": ["以完整场景呈现消毒柜的产品气质，为后续资产展示建立视觉基准。", "通过场景、材质和布光塑造空间层次，突出产品轮廓与关键细节。", "消毒柜主KV / 场景渲染 / 产品质感定调"],
  "消毒柜多场景渲染资产": ["从主KV延伸到不同角度与光照下的产品表达，展示同一资产的多场景适配。", "将明亮与深色画面分组呈现，保留原始比例，便于比较材质、结构与布光变化。", "多角度渲染 / 明暗场景 / 产品细节资产"],
  "恒温调奶杯主KV": ["建立恒温调奶杯的主视觉表达，让产品形态与品质感成为画面焦点。", "以空间构图和有控制的光影呈现杯体材质，为系列渲染统一视觉方向。", "调奶杯主KV / 产品场景 / 光影与材质表达"],
  "恒温调奶杯多场景渲染资产": ["展示调奶杯在不同构图、角度和光照中的表现，形成可供多触点使用的素材集合。", "以明暗画面的对照组织阅读节奏，放大产品细节并保持画面比例完整。", "多场景渲染 / 产品特写 / 系列素材资产"],
  "活动商品主图": ["把活动氛围带入商品浏览环节，让产品识别与促销信息同时清晰可见。", "建立系列化主图规则，统一产品占比与利益信息位置，适配多商品展示。", "活动商品主图 / 利益信息层级 / 系列化商品表达"],
  "页面长图与活动延展": ["将活动信息组织为连续的页面阅读流程，串联主题、商品与活动内容。", "通过分区与重复的视觉线索建立节奏，让长页面中的重点内容有明确的停留位置。", "会场长页面 / 活动内容分区 / 页面视觉延展"],
  "年货节主视觉与会场": ["围绕年货节的节日语境建立独立视觉表达，并延续品牌的产品质感。", "将节日氛围与商品展示结合，以清晰分区组织会场信息和浏览顺序。", "年货节主视觉 / 活动会场 / 节日视觉定调"],
  "年货节活动KV": ["通过不同活动画面拓展年货节的传播表达，保持统一的节日识别。", "延续活动色彩、场景与产品组合规则，根据传播内容调整画面重点。", "年货节KV / 场景延展 / 活动传播素材"],
  "年货节商品主图与SKU": ["让节日活动中的多商品与规格信息更易比较，支持连续浏览与选择。", "统一主图视觉规则，在产品展示与规格信息之间建立明确层级。", "商品主图 / SKU视觉 / 多商品适配"],
  "年货节手机端品专": ["把年货节活动信息适配到手机端阅读场景，保持小屏幕中的信息清晰度。", "按纵向阅读顺序组织模块，突出活动主题与关键商品，控制信息密度。", "手机端品专 / 纵向信息布局 / 移动场景适配"],
  "有价版与活动延展": ["补充含价格、优惠与商品规划的信息版本，让活动视觉覆盖实际营销触点。", "在统一的活动语言中区分价格与产品信息，保持促销重点易读。", "有价版物料 / 优惠信息 / 活动商品延展"],
  "其他活动商品主图": ["补充年货节商品展示的不同版本，呈现活动视觉的应用范围。", "以一致的品牌和活动规则组织画面，保留不同商品的展示特点。", "商品展示版本 / 活动物料 / 系列视觉应用"],
};

function visualSectionHeading(title, label, note = "") {
  const brief = visualBriefs[title];
  const isMainVisual = /主KV|主视觉|活动 KV/.test(title);
  return `<header class="asset-heading"><h2>${title}</h2><div class="asset-heading-copy"><p class="asset-summary">${brief ? brief[0] : note || "围绕项目目标组织视觉信息，展示这一环节的设计表达与具体交付。"}</p>${brief && isMainVisual ? `<dl class="asset-brief"><div><dt>设计思路</dt><dd>${brief[1]}</dd></div><div><dt>交付呈现</dt><dd>${brief[2]}</dd></div></dl>` : ""}</div></header>`;
}

function gallerySection(title, files, layout = "gallery-grid", note = "") {
  if (!files.length) return "";
  const isKeyVisual = files.length === 1 && /(?:主KV|主视觉|(?:^|\s)KV(?:$|\s))/i.test(title);
  const galleryClass = isKeyVisual
    ? layout
    : "masonry-layout masonry-standard";
  return `
    <section class="asset-section">
      ${visualSectionHeading(title, "VISUAL EXECUTION", note)}
      <div class="${galleryClass}" ${isKeyVisual ? "" : 'data-masonry data-density="standard"'}>${files.map((file) => mediaImage(file, mediaTitle(file), isKeyVisual ? "" : "masonry-item")).join("")}</div>
    </section>`;
}

function brandGallery() {
  const root = "images/品牌视觉升级/";
  const cover = `${root}品牌视觉升级主KV.webp`;
  const phone = namedFiles(root, ["微信商城主图展示.webp"]);
  const allMainImages = filesIn(root).filter((file) =>
    /(?:有赞主图|主图)/.test(file.split("/").pop()) && !/(?:好评海报|追奶营|样机须知|佣金说明|微信商城主图展示)/.test(file),
  );
  const mainImages = namedFiles(root, ["pro有赞主图新 800_看图王.webp", "plus有赞主图新 800_看图王.webp", "有赞主图新 800_看图王.webp", "超净储奶袋主图200ml_看图王.webp"]);
  const extraMainImages = allMainImages.filter(file => !mainImages.includes(file));
  const cards = namedFiles(root, ["母乳顾问服务DM卡内外页 235mmx165mm.webp"]);
  const privatePosters = namedFiles(root, ["追奶营第二期750_看图王.webp", "追奶营第三期750_看图王.webp", "追奶营第三期邀请函.webp"]);
  const extraPosters = [...namedFiles(root, ["追奶营二期奖励名单海报750.webp", "样机须知750_看图王.webp"]), ...filesIn(root).filter(file => file.includes("好评海报"))];
  const process = [
    { file: "视觉升级单品渲染窗口.webp", title: "单品渲染", text: "通过材质、灯光与镜头调试，建立产品质感与光影基准。", detail: "材质 · 灯光 · 镜头" },
    { file: "设觉升级KV修图.webp", title: "主KV精修与合成", text: "整合渲染与其他素材，协调色调、投影和空间关系，完成系列产品的统一表达。", detail: "色调 · 投影 · 空间统一" },
  ];
  const rationale = [
    { title: "蓝白色彩", text: "以蓝白基调建立清晰、洁净的品牌识别，让科技表达保持克制。", file: `${root}设计思路1.webp`, imageClass: "" },
    { title: "柔和光影", text: "以细腻材质和柔和布光突出产品品质，保留母婴护理需要的温度。", file: cover, imageClass: "brand-detail-light" },
    { title: "有序构图", text: "通过产品体量、高低与前后关系组织信息，建立系列产品的主次层级。", file: `${root}主视觉未修图.webp`, imageClass: "brand-detail-composition" },
  ];
  return `
    <section class="brand-case-section" aria-labelledby="brand-thinking-title">
      ${brandCaseHeading("brand-thinking-title", "设计", "思路", "将视觉方向转化为色彩、光影与构图的具体选择。")}
      <div class="brand-case-thinking">${rationale.map(item => `<article><h3><span class="brand-case-marker" aria-hidden="true"></span>${item.title}</h3><p>${item.text}</p>${mediaImage(item.file, `${item.title}：${item.title === "蓝白色彩" ? "场景参考" : item.title === "柔和光影" ? "地平线光影细节" : "主视觉未修图产品构图"}`, `brand-case-detail ${item.imageClass}`)}</article>`).join("")}</div>
    </section>
    <section class="brand-case-section brand-case-process-section" aria-labelledby="brand-process-title">
      ${brandCaseHeading("brand-process-title", "单品渲染与", "视觉合成", "部分产品采用3D渲染，结合少量产品与场景素材进行精修合成。")}
      <div class="brand-case-process">${process.filter(item => mediaFiles.includes(root + item.file)).map(item => `<article><div class="brand-case-process-copy"><h3>${item.title}</h3><p>${item.text}</p><span>${item.detail}</span></div><span class="brand-case-process-arrow" aria-hidden="true"></span>${mediaImage(root + item.file, `${item.title}制作窗口`)}</article>`).join("")}</div>
    </section>
    ${mediaFiles.includes(cover) ? `<section class="brand-case-section brand-case-kv" aria-labelledby="brand-kv-title">${brandCaseHeading("brand-kv-title", "主KV", "展示", "以一致的产品质感与空间语言，建立系列产品的统一表达。", true)}${mediaImage(cover, "品牌视觉升级最终主KV")}</section>` : ""}
    <section class="brand-case-section" aria-labelledby="brand-online-title">
      ${brandCaseHeading("brand-online-title", "线上平台", "视觉延展", "从品牌主视觉到商品浏览与私域活动，按触点调整信息密度，保持视觉表达的连续性。")}
      <div class="brand-case-commerce"><div class="brand-case-phone">${phone.map(file => mediaImage(file, "微信商城手机端实际展示")).join("")}</div>${brandDepthCarousel([...mainImages, ...extraMainImages])}</div>
      <div class="brand-case-subheading brand-case-private-heading"><h3>私域活动海报</h3><p>围绕招募、邀请与参与激励，在活动语境中延续品牌色彩与产品表达。</p></div>
      <div class="brand-case-posters">${privatePosters.map((file, index) => `<div>${mediaImage(file, ["追奶营第二期招募海报", "追奶营第三期招募海报", "追奶营第三期邀请函"][index])}<p class="brand-case-caption">${["追奶营第二期", "追奶营第三期", "活动邀请函"][index]}</p></div>`).join("")}</div>
      ${brandCaseMore("更多私域与口碑物料", extraPosters, "brand-case-posters")}
    </section>
    <section class="brand-case-section" aria-labelledby="brand-offline-title">
      ${brandCaseHeading("brand-offline-title", "线下物料", "视觉延展", "以服务卡承接购买后的服务信息，将统一视觉语言延伸至线下触点。")}
      <div class="brand-case-service-pair"><article><h3>设计稿 · 内外页</h3>${cards.map(file => mediaImage(file, "母乳顾问服务卡内外页设计稿")).join("")}</article><article><h3>印刷实物 · 内页</h3>${mediaImage(`${root}线下卡打印内页.webp`, "母乳顾问服务卡内页印刷实物")}</article></div>
    </section>
  `;
}

function brandDepthCarousel(files) {
  if (!files.length) return "";
  return `<div class="depth-carousel" data-depth-carousel role="region" aria-roledescription="轮播" aria-label="商城主图深度轮播" tabindex="0"><div class="depth-carousel-stage">${files.map((file, index) => `<button type="button" class="depth-carousel-card" data-depth-card="${index}" aria-label="查看${escapeHtml(mediaTitle(file))}" tabindex="${index ? -1 : 0}"><img src="${mediaUrl(file)}" alt="${escapeHtml(mediaTitle(file))}" loading="lazy" decoding="async" draggable="false" /><span class="depth-carousel-tint" aria-hidden="true"></span></button>`).join("")}</div><div class="depth-carousel-controls"><button type="button" data-depth-prev aria-label="上一张主图">←</button><span data-depth-status aria-live="off">1 / ${files.length}</span><button type="button" data-depth-next aria-label="下一张主图">→</button><button type="button" data-depth-pause aria-label="暂停主图自动轮播" aria-pressed="false">暂停</button></div><div class="depth-carousel-dots" aria-label="选择主图">${files.map((_, index) => `<button type="button" data-depth-dot="${index}" aria-label="第${index + 1}张主图" aria-current="${index === 0 ? "true" : "false"}"></button>`).join("")}</div><p class="depth-carousel-hint">拖动切换 · 点击前景主图查看原图</p></div>`;
}

function brandCaseHeading(id, title, accent, copy, featured = false) {
  return `<header class="brand-case-heading${featured ? " brand-case-heading-featured" : ""}"><h2 id="${id}">${title}<span class="title-accent">${accent}</span></h2><p>${copy}</p></header>`;
}

function brandCaseMore(label, files, layout) {
  return files.length ? `<details class="brand-case-more"><summary>${label}<span aria-hidden="true">＋</span></summary><div class="${layout}">${files.map(file => mediaImage(file, mediaTitle(file))).join("")}</div></details>` : "";
}

function performanceGallery() {
  const root = "images/核心产品投放图优化/";
  const sections = [];
  const lambAds = namedFiles(root, ["羊脂膏投放图.webp", "羊脂膏投放图1.webp"]);
  const lambData = namedFiles(root, ["羊脂膏数据.webp"]);
  const lambRanking = namedFiles(root, ["羊脂膏排名.webp"]);
  const lambProduct = namedFiles(root, ["羊脂膏.png"]);
  const top1 = namedFiles(root, ["top1标志.png"]);
  sections.push(gallerySection("羊脂膏投放素材", lambAds, "gallery-grid gallery-two"));
  if (lambData.length) sections.push(`
    <section class="asset-section performance-data-section">
      ${visualSectionHeading("羊脂膏投放数据", "CAMPAIGN / DATA")}
      <div class="data-highlight-grid">
        <article><span>创意点击率</span><strong>8.57%</strong><small>孕妇场景</small></article>
        <article><span>创意点击率</span><strong>7.75%</strong><small>亲喂场景</small></article>
        <article><span>创意点击率</span><strong>9.08%</strong><small>畅销榜 TOP1</small></article>
        <article><span>点击转化率</span><strong>19.75%</strong><small>孕妇场景</small></article>
        <article><span>点击转化率</span><strong>17.81%</strong><small>亲喂场景</small></article>
        <article><span>点击转化率</span><strong>15.29%</strong><small>畅销榜 TOP1</small></article>
      </div>
      ${mediaImage(lambData[0], "羊脂膏原始投放数据截图", "data-source-image")}
    </section>`);
  if (lambRanking.length || lambProduct.length) sections.push(`
    <section class="asset-section ranking-feature">
      ${visualSectionHeading("羊脂膏类目排名", "PRODUCT / RANKING")}
      <div class="ranking-layout">
        ${lambProduct.map((file) => mediaImage(file, "羊脂膏产品图", "ranking-product")).join("")}
        ${top1.map((file) => mediaImage(file, "TOP 1 标志", "ranking-badge")).join("")}
        ${lambRanking.map((file) => mediaImage(file, "羊脂膏排名原图", "ranking-source")).join("")}
      </div>
    </section>`);

  const kettle = filesIn(root).filter((file) => /恒温调奶杯/.test(file));
  const kettleData = namedFiles(root, ["恒温壶数据.webp"]);
  sections.push(gallerySection("恒温壶 / 调奶杯投放素材", kettle, "gallery-grid gallery-two", "按两列排版保留场景素材，点击图片可查看原始清晰度。"));
  if (kettleData.length) sections.push(gallerySection("恒温壶投放数据", kettleData, "gallery-grid gallery-one"));

  const pump = filesIn(root).filter((file) => /吸奶器车图/.test(file));
  const pumpData = namedFiles(root, ["吸奶器数据.webp"]);
  sections.push(gallerySection("吸奶器投放素材", pump, "gallery-grid gallery-two"));
  if (pumpData.length) sections.push(gallerySection("吸奶器投放数据", pumpData, "gallery-grid gallery-one"));
  const plus = filesIn(root).filter((file) => /plus投放图/.test(file));
  if (plus.length) sections.push(gallerySection("PLUS 投放素材", plus, "gallery-grid gallery-two"));
  return sections.join("");
}

function douyinGallery() {
  const files = filesIn("images/抖音视觉体系0-1/").sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  return gallerySection("直播间场景与弹窗", files.filter((file) => !/手卡/.test(file)), "gallery-grid gallery-two")
    + gallerySection("产品讲解手卡", files.filter((file) => /手卡/.test(file)), "gallery-grid gallery-four");
}

function assetMasonry(files) {
  return `<div class="masonry-layout masonry-render" data-masonry data-density="render">${files.map((file) => mediaImage(file, mediaTitle(file), `masonry-item ${/夜晚|辉光/.test(file) ? "asset-tone-dark" : "asset-tone-light"}`)).join("")}</div>`;
}

function threeDGallery() {
  const root = "images/战略新品3D高精度资产库/";
  const disinfection = filesIn(root).filter((file) => /消毒柜/.test(file));
  const kettle = filesIn(root).filter((file) => /恒温调奶杯/.test(file));
  const disinfectionKv = disinfection.filter((file) => /KV\.(?:jpg|webp)$/i.test(file));
  const kettleKv = kettle.filter((file) => /kv\.(?:jpg|webp)$/i.test(file));
  return `
    ${gallerySection("消毒柜主KV", disinfectionKv, "gallery-grid gallery-one")}
    <section class="asset-section">${visualSectionHeading("消毒柜多场景渲染资产", "RENDER / ASSET SYSTEM")}${assetMasonry(disinfection.filter((file) => !disinfectionKv.includes(file)))}</section>
    ${gallerySection("恒温调奶杯主KV", kettleKv, "gallery-grid gallery-one")}
    <section class="asset-section">${visualSectionHeading("恒温调奶杯多场景渲染资产", "RENDER / ASSET SYSTEM")}${assetMasonry(kettle.filter((file) => !kettleKv.includes(file)))}</section>
  `;
}

function campaignGallery() {
  const newYear = filesIn("images/S级大促营销活动/");
  const atRoot = (file) => file.split("/").length === 2;
  const yearHero = newYear.filter((file) => /年货节页面|年货节|无标题/.test(file.split("/").pop()));
  const yearKv = newYear.filter((file) => /\/KV\//.test(file) && !/无标题[34]/.test(file.split("/").pop()));
  const yearProducts = newYear.filter((file) => /\/主图\/|\/sku\//.test(file));
  const yearPhone = newYear.filter((file) => /手机端品专/.test(file));
  const yearPaid = newYear.filter((file) => /有价版|羊脂膏特别规划|优惠券/.test(file));
  const yearRootRemainder = newYear.filter((file) => atRoot(file) && !yearHero.includes(file) && !yearPhone.includes(file));
  return `
    <section class="campaign-event">
      <header class="asset-heading campaign-heading"><h2>年货节视觉</h2><p>将品牌产品表达融入年货节语境，并延展到会场、商品与移动端页面。通过不同版本的物料呈现节日营销中多触点协同的设计过程。</p></header>
      ${gallerySection("年货节主视觉与会场", yearHero, "gallery-grid gallery-two")}
      ${gallerySection("年货节活动KV", yearKv, "gallery-grid gallery-three")}
      ${gallerySection("年货节商品主图与SKU", yearProducts, "gallery-grid gallery-four")}
      ${gallerySection("年货节手机端品专", yearPhone, "gallery-grid gallery-three")}
      ${gallerySection("有价版与活动延展", yearPaid, "gallery-grid gallery-four")}
      ${gallerySection("其他活动商品主图", yearRootRemainder, "gallery-grid gallery-four")}
    </section>
  `;
}

function projectAssetGallery(projectId) {
  if (projectId === "brand-visual-upgrade") return brandGallery();
  if (projectId === "performance-creative") return performanceGallery();
  if (projectId === "douyin-system") return douyinGallery();
  if (projectId === "3d-asset-library") return threeDGallery();
  if (projectId === "category-upgrade") return campaignGallery();
  return "";
}

function header() {
  return `
    <header class="desktop-header" aria-label="主导航">
      <nav class="nav-pill">
        ${navItems
          .map(
            (item) => `
              <a href="${item.href}" data-nav="${item.id}">
                <span aria-hidden="true">${item.icon}</span>
                ${item.label}
              </a>
            `,
          )
          .join("")}
      </nav>
    </header>
  `;
}

function mobileDock() {
  return `
    <nav class="mobile-dock" aria-label="移动端导航">
      ${navItems
        .map(
          (item) => `
            <a href="${item.href}" data-nav="${item.id}">
              <span class="dock-icon" aria-hidden="true">${item.icon}</span>
              <span>${item.shortLabel}</span>
            </a>
          `,
        )
        .join("")}
    </nav>
  `;
}

function footer() {
  return `
    <footer class="site-footer grid-shell">
      <div class="footer-brand">
        <span class="brand-mark">${site.initials}</span>
        <div>
          <strong>${site.name}</strong>
          <p>${site.role}</p>
        </div>
      </div>
      <div class="footer-column">
        <span class="section-label">NAVIGATE</span>
        ${navItems.map((item) => `<a href="${item.href}">${item.shortLabel}</a>`).join("")}
      </div>
      <div class="footer-column">
        <span class="section-label">CONTACT</span>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="tel:${site.phone}">${site.phone}</a>
        <p>${site.location}</p>
      </div>
      <div class="footer-meta">
        <span>© 2026 ${site.name}</span>
        <span>Selected work · Original visual assets</span>
      </div>
    </footer>
  `;
}

function metricsRow(items = metrics, className = "", showNotes = true) {
  const isProjectMetrics = className.includes("project-metrics");
  return `
    <section class="metrics-row ${className}" aria-label="关键数据">
      ${items
        .map(
          (item) => {
            const hasCountUp = Number.isFinite(item.countTo);
            const countUpAttributes = hasCountUp
              ? `class="count-up" data-count-to="${item.countTo}" data-decimals="${item.decimals ?? 0}" data-prefix="${item.prefix ?? ""}" data-suffix="${item.suffix ?? ""}" data-grouping="${item.useGrouping ? "true" : "false"}"`
              : "";

            const weight = isProjectMetrics
              ? Math.min(1.35, Math.max(0.9, String(item.value).replace(/\s/g, "").length / 6.5))
              : 1;

            return `
            <article class="metric-item" style="--metric-weight:${weight.toFixed(2)}">
              <strong ${countUpAttributes}>${item.value}</strong>
              <span>${item.label}</span>
              ${showNotes && item.note ? `<small>${item.note}</small>` : ""}
            </article>
          `;
          },
        )
        .join("")}
    </section>
  `;
}

function projectCard(project, index) {
  const collection = collectionForProject(project.id);
  return `
    <a class="project-card project-${project.variant}" id="project-${project.id}" data-project-id="${project.id}" href="#/portfolio/${project.id}">
      <div class="project-copy">
        <span class="section-label accent">${String(index + 1).padStart(2, "0")} / ${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <ul class="inline-metrics">
          ${project.metrics.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <span class="text-link">查看案例 <span aria-hidden="true">↗</span></span>
      </div>
      ${collection && mediaFiles.includes(collection.cover)
        ? mediaImage(collection.cover, `${project.title}项目主视觉`, "project-media", { caption: false, lightbox: false, version: "20261005-cover-16x9" })
        : placeholder(`${project.title} · 封面`, "project-media")}
    </a>
  `;
}

function homeProjectCard(project, index) {
  const collection = collectionForProject(project.id);
  const featured = index === 0;
  const summaries = {
    "brand-visual-upgrade": "统一产品质感与品牌表达，从主KV延展至线上线下触点。",
    "performance-creative": "重组产品卖点与场景表达，用投放数据验证创意。",
    "douyin-system": "从直播间到运营物料，建立统一的视觉体系。",
    "3d-asset-library": "从建模到渲染，沉淀可复用的产品视觉资产。",
    "category-upgrade": "围绕年货节，串联主KV、商品与会场页面。",
  };
  const outcomes = {
    "brand-visual-upgrade": "视觉定调 / 渲染合成 / 多端延展",
    "performance-creative": "点击率提升 24.21%",
    "douyin-system": "直播 / 电商 / 运营触点",
    "3d-asset-library": "8K 输出 / 多场景复用",
    "category-upgrade": "主KV / 会场 / 多端延展",
  };

  return `
    <a class="project-card home-project-card${featured ? " home-project-featured" : ""}" id="project-${project.id}" data-project-id="${project.id}" href="#/portfolio/${project.id}">
      ${collection && mediaFiles.includes(collection.cover)
        ? mediaImage(collection.cover, `${project.title}项目主视觉`, "project-media", { caption: false, lightbox: false })
        : placeholder(`${project.title} · 封面`, "project-media")}
      <div class="project-copy">
        <div class="home-project-body">
          <p class="home-project-label">${String(index + 1).padStart(2, "0")} / ${featured ? "BRAND STRATEGY" : escapeHtml(project.tag)}</p>
          <div class="home-project-title"><h3>${escapeHtml(project.title)}</h3>${featured ? "" : "<span class=\"home-project-arrow\" aria-hidden=\"true\">↗</span>"}</div>
          <p class="home-project-description">${summaries[project.id] || escapeHtml(project.summary)}</p>
          <p class="home-project-outcome">${outcomes[project.id] || ""}</p>
          ${featured ? "<span class=\"home-project-link\">查看完整案例 <span aria-hidden=\"true\">↗</span></span>" : ""}
        </div>
      </div>
    </a>
  `;
}

function lanyardProfile(file, className = "") {
  if (!file || !mediaFiles.includes(file)) {
    return placeholder("个人工作场景 / 形象", `lanyard-placeholder ${className}`);
  }

  return `
    <div class="lanyard-scene ${className}" data-lanyard aria-label="胡飞个人工牌，可拖动查看摆动效果">
      <div class="lanyard-pin" aria-hidden="true"></div>
      <div class="lanyard-straps" aria-hidden="true">
        <span></span><span></span>
      </div>
      <div class="lanyard-badge" data-lanyard-card tabindex="0">
        <span class="lanyard-hole" aria-hidden="true"></span>
        <span class="lanyard-clip" aria-hidden="true"></span>
        <div class="lanyard-photo">
          <img src="${mediaUrl(file)}" alt="胡飞个人工作场景与形象照" loading="lazy" decoding="async" draggable="false" />
        </div>
        <div class="lanyard-identity">
          <div><span>VISUAL / 3D DESIGNER</span><strong>${site.name}</strong></div>
          <b>${site.initials}</b>
        </div>
      </div>
      <p class="lanyard-hint">拖动工牌 · 松开回弹</p>
    </div>
  `;
}

function homePage() {
  return `
    <main id="main-content">
      <section class="hero grid-shell hero-intro">
        <div class="hero-copy">
          <span class="eyebrow">◎ ${site.hero.eyebrow}</span>
          <h1 class="hero-growth-title" aria-label="${site.hero.titleLine1} ${site.hero.titleLine2}">
            <span class="hero-title-line--first">${site.hero.titleLine1}</span>
            <span class="growth-text" data-growth-text><span class="growth-text-base">${site.hero.titleLine2}</span><span class="growth-text-fill" aria-hidden="true">${site.hero.titleLine2}</span></span>
          </h1>
          <p>${site.hero.description}</p>
          <div class="button-row">
            <a class="button button-primary" href="${routes.portfolio}">查看代表作品</a>
            <a class="button button-secondary" href="${routes.contact}">联系方式</a>
          </div>
        </div>
        <div class="hero-portrait" aria-label="胡飞个人形象">
          <img src="./media/网站素材/profile-portrait.webp" alt="胡飞个人形象照" />
        </div>
        <div class="hero-stamp" aria-label="胡飞个人标识">
          <span>PROFILE</span>
          <strong>${site.initials}</strong>
        </div>
      </section>

      ${metricsRow(metrics, "", false)}

      <section class="section-block grid-shell home-projects" aria-labelledby="home-projects-title">
        <header class="section-heading home-section-heading">
          <h2 id="home-projects-title">用结果建立信任<br /><span class="title-accent">用过程呈现思考</span></h2>
        </header>
        <div class="project-grid">
          ${projects.slice(0, 5).map(homeProjectCard).join("")}
        </div>
        <a class="section-more" href="${routes.portfolio}">查看全部项目 <span>↗</span></a>
      </section>

      <section class="about-preview grid-shell">
        <div class="about-copy">
          <span class="section-label accent">ABOUT / APPROACH</span>
          <h2>技术不是装饰<br /><span class="title-accent">视觉不止好看</span></h2>
          <p>${site.strengths[0]}</p>
          <ul class="numbered-list">
            ${site.strengths
              .map(
                (item, index) => `
                  <li><span>0${index + 1}</span><p>${item}</p></li>
                `,
              )
              .join("")}
          </ul>
          <a class="text-link" href="${routes.about}">了解工作经历 ↗</a>
        </div>
        ${lanyardProfile(profileMedia[0], "about-preview-lanyard")}
      </section>

      <section class="capability-preview section-block grid-shell">
        <header class="section-heading compact home-section-heading">
          <h2>从策略到交付<br /><span class="title-accent">建立完整视觉链路</span></h2>
        </header>
        <div class="capability-list">
          ${capabilities
            .map(
              (item) => `
                <article>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                  <small>${item.tools}</small>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      ${contactCta()}
    </main>
  `;
}

function pageIntro(eyebrow, title, description, options = {}) {
  const titleParts = title.split("<br />");
  const formattedTitle = options.accentAfter
    ? titleParts
        .map(
          (line) =>
            `<span class="page-title-line"><span>${line.slice(0, options.accentAfter)}</span><span class="title-accent">${line.slice(options.accentAfter)}</span></span>`,
        )
        .join("")
    : titleParts.length > 1
      ? `${titleParts[0]}<br /><span class="title-accent">${titleParts.slice(1).join("<br />")}</span>`
      : title;

  return `
    <section class="page-intro grid-shell ${options.className || ""}">
      <span class="section-label accent">${eyebrow}</span>
      <h1>${formattedTitle}</h1>
      <p>${description}</p>
    </section>
  `;
}

function portfolioPage() {
  return `
    <main id="main-content">
      ${pageIntro(
        "PORTFOLIO",
        "视觉不只被看见<br />更要推动结果发生",
        "围绕品牌、电商、3D 与 AI 创意工作流，展示从策略拆解、视觉构建到结果复盘的完整过程。",
      )}
      <section class="filter-bar grid-shell" aria-label="项目分类">
        <button class="filter-active" type="button" data-scroll-project="portfolio-list">全部</button>
        <button type="button" data-scroll-project="project-brand-visual-upgrade">品牌视觉</button>
        <button type="button" data-scroll-project="project-performance-creative">电商视觉</button>
        <button type="button" data-scroll-project="project-3d-asset-library">3D / AIGC</button>
        <button type="button" data-scroll-project="project-category-upgrade">S级大促</button>
      </section>
      <section class="portfolio-list grid-shell" id="portfolio-list">
        ${projects.map(projectCard).join("")}
      </section>
      ${contactCta()}
    </main>
  `;
}

function brandStrategyModules() {
  const goals = [
    { title: "建立统一识别", text: "统一色彩、产品质感与版式层级，让电商、社媒和直播触点形成连续的品牌印象。", icon: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 12h8M12 8v8"/>' },
    { title: "传递专业信任", text: "以清晰的产品结构、克制的科技表达和服务信息，降低用户理解与选择的成本。", icon: '<path d="M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="M8 12l3 3 5-6"/>' },
    { title: "沉淀可复用体系", text: "建立适配主图、KV与活动页面的视觉规则，支持后续新品与营销场景持续扩展。", icon: '<path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>' },
  ];
  return `
    <section class="brand-planning brand-project-goals" aria-labelledby="brand-goals-title">
      <header class="brand-planning-heading"><h2 id="brand-goals-title">项目<span class="title-accent">目标</span></h2><p>让专业被看见，让信任被记住，让视觉资产持续发挥价值。</p></header>
      <div class="brand-objective-columns">${goals.map((goal, index) => `<article><h3><span class="brand-objective-marker" aria-hidden="true"></span>${["统一识别", "专业信任", "持续复用"][index]}</h3><p>${goal.text}</p></article>`).join("")}</div>
    </section>
    <section class="brand-planning brand-visual-strategy" aria-labelledby="brand-strategy-title">
      <header class="brand-planning-heading"><h2 id="brand-strategy-title">视觉<span class="title-accent">策略</span></h2><p>以专业科技建立信任，以柔和表达传递温度，为重视科学喂养的母婴家庭建立清晰的品牌印象。</p></header>
      <div class="brand-style-setting">
        <div class="brand-style-ratio" aria-label="80%科技感加20%母婴亲和感"><div><strong>80<span>%</span></strong><h4>科技感</h4><p>精密秩序 · 清透材质 · 专业可信</p></div><span class="brand-ratio-plus" aria-hidden="true">＋</span><div><strong>20<span>%</span></strong><h4>母婴亲和感</h4><p>柔和光影 · 圆润曲线 · 安心陪伴</p></div></div>
        <div class="brand-ratio-bar" aria-hidden="true"><span></span><span></span></div>
      </div>
      <div class="brand-keyword-section"><header class="brand-keyword-heading"><h3>视觉<span class="title-accent">关键词</span></h3><p>将风格方向转化为可感知的材质、光影与构图。</p></header>
        <ul class="brand-keyword-orbs" aria-label="品牌视觉关键词">
          <li class="keyword-orb"><span>精密秩序<br />有序构图</span></li>
          <li class="keyword-orb"><span>蓝白基调<br />洁净明亮</span></li>
          <li class="keyword-orb"><span>清透材质<br />细腻质感</span></li>
          <li class="keyword-orb"><span>柔和光影<br />克制高光</span></li>
          <li class="keyword-orb"><span>圆润曲线<br />亲和温度</span></li>
          <li class="keyword-orb"><span>专业可信<br />信息清晰</span></li>
          <li class="keyword-orb"><span>简约空间<br />安心陪伴</span></li>
        </ul>
      </div>
      <div class="brand-strategy-application"><h3>从关键词到<span class="title-accent">视觉应用</span></h3><dl><div><dt>主视觉</dt><dd>规则构图与蓝白空间确定专业基调，柔和光影缓和科技表达。</dd></div><div><dt>商城与服务物料</dt><dd>延续同一套色彩、材质和信息层级，保持不同触点的识别一致。</dd></div><div><dt>品牌心智</dt><dd>持续重复清晰、洁净、亲和的视觉线索，让专业可信与安心陪伴形成品牌联想。</dd></div></dl></div>
    </section>`;
}

function brandResultsModule() {
  const items = [
    { title: "统一品牌识别", text: "形成兼顾科技感与母婴亲和感的蓝白视觉语言，让产品、版式与光影保持一致。", review: "复盘重点：后续物料持续沿用同一套视觉基准。", icon: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>' },
    { title: "完成多触点延展", text: "将品牌表达落地到商城主图、服务卡、私域活动与口碑海报，形成连续的渠道体验。", review: "复盘重点：按触点调整信息密度，保持识别一致。", icon: '<rect x="8" y="8" width="8" height="8" rx="2"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/><circle cx="12" cy="2" r="1"/><circle cx="12" cy="22" r="1"/><circle cx="2" cy="12" r="1"/><circle cx="22" cy="12" r="1"/>' },
    { title: "沉淀复用规则", text: "从主KV到商品与服务物料，整理色彩、产品构图与信息层级，支持后续内容延续。", review: "复盘重点：用明确的版式规则兼顾一致性与适配性。", icon: '<path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>' },
  ];
  return `<section class="asset-section brand-results-section"><header class="asset-heading"><h2>结果与<span class="title-accent">复盘</span></h2><p class="asset-summary">从统一视觉到多触点应用，让本次交付成为可以持续延展的品牌基础。</p></header><div class="brand-results-grid">${items.map(item => `<article><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item.icon}</svg><h3>${item.title}</h3><p>${item.text}</p><p class="brand-result-review">${item.review}</p></article>`).join("")}</div></section>`;
}

function projectPage(project) {
  if (project.id === "brand-visual-upgrade") return renderBrandUpgradeCase({ project, mediaImage, namedFiles, filesIn, routes });
  if (project.id === "performance-creative") return renderPerformanceCase({ project, mediaImage, namedFiles, filesIn, routes });
  if (project.id === "douyin-system") return renderDouyinCase({ project, mediaImage, namedFiles, filesIn, routes });
  if (project.id === "category-upgrade") return renderCampaignCase({ project, mediaImage, namedFiles, routes });
  if (project.id === "3d-asset-library") return renderThreeDCase({ project, mediaImage, namedFiles, filesIn, routes });
  const projectMetrics = project.metrics.map((item) => {
    const splitIndex = item.indexOf(" ");
    return {
      value: splitIndex > -1 ? item.slice(splitIndex + 1) : item,
      label: splitIndex > -1 ? item.slice(0, splitIndex) : "项目结果",
    };
  });

  return `
    <main id="main-content">
      <section class="project-hero grid-shell">
        <div>
          <h1>${project.title}</h1>
          <p>${project.summary}</p>
          <a class="button button-secondary" href="${routes.contact}">查看联系方式</a>
        </div>
        <dl class="project-meta">
          <div><dt>项目职责</dt><dd>${project.role}</dd></div>
          <div><dt>项目阶段</dt><dd>${project.period}</dd></div>
          <div><dt>项目状态</dt><dd>项目视觉已收录</dd></div>
        </dl>
      </section>
      ${metricsRow(projectMetrics, "accent-metrics project-metrics")}
      <section class="project-body grid-shell">
        ${project.id === "brand-visual-upgrade" ? brandStrategyModules() : `<article class="case-copy project-objectives"><h2>项目<span class="title-accent">目标</span></h2><p>${({"performance-creative":"提炼核心产品卖点，优化投放素材的信息层级与场景表达，并结合原始数据复盘创意表现。","douyin-system":"从零建立统一的直播视觉体系，让场景、弹窗与讲解手卡协同传递品牌和产品信息。","3d-asset-library":"建立高精度产品3D资产与多场景渲染素材，为主图、KV、详情页与包装提供一致的视觉基础。","category-upgrade":"围绕年货节建立活动主视觉，统一会场、商品与移动端触点，形成完整的营销物料体系。"})[project.id] || project.summary}</p></article>`}
        <div class="project-curated-grid" aria-label="${project.title}图片展示">
          ${projectAssetGallery(project.id)}
        </div>
        ${project.id === "brand-visual-upgrade" ? brandResultsModule() : `<article class="case-copy results-copy">
          <h2>结果与复盘</h2>
          <p>${project.result || `${project.metrics.join("；")}。下一阶段可补充数据来源、对比口径和业务影响。`}</p>
        </article>`}
      </section>
      <section class="next-project grid-shell">
        <a href="${routes.portfolio}">返回全部作品 <span>↗</span></a>
      </section>
    </main>
  `;
}

function brandCasePage(project) {
  const goals = [
    ["统一质感", "协调产品材质、色调与光影，让不同产品呈现一致的品质感。", '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.25l8 4.5"/>'],
    ["建立调性", "以科技感传递专业可信，以柔和表达保留母婴护理的亲和温度。", '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/>'],
    ["延续识别", "将主KV的视觉语言应用至商城与服务物料，保持多触点表达连续。", '<rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v5M4.5 17v-4h15v4"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/><path d="M12 13v4"/>'],
  ];
  return `<main id="main-content" class="brand-case">
    <section class="brand-case-intro grid-shell">
      <div class="brand-case-opening"><div><h1>品牌<span class="title-accent">视觉升级</span></h1><p>统一产品质感，建立专业而有温度的品牌表达。</p><a class="button brand-case-contact" href="${routes.contact}">查看联系方式</a></div><aside class="brand-case-background"><h3>项目背景</h3><p>产品视觉在材质、光影和画面表达上存在差异，整体品质感不足，难以形成统一的品牌印象。</p></aside></div>
    </section>
    <div class="brand-case-body grid-shell">
      <section class="brand-case-section brand-case-overview" aria-labelledby="brand-goals-title"><header class="brand-case-heading"><h2 id="brand-goals-title">项目<span class="title-accent">目标</span></h2></header><div class="brand-case-goals">${goals.map(([title, text, icon]) => `<article><h3><span class="brand-goal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></span>${title}</h3><p>${text}</p></article>`).join("")}</div></section>
      <section class="brand-case-section brand-case-overview" aria-labelledby="brand-strategy-title"><header class="brand-case-heading"><h2 id="brand-strategy-title">视觉<span class="title-accent">策略</span></h2></header>
        <div class="brand-case-strategy"><div class="brand-case-ratio-panel"><div class="brand-case-ratios"><div><strong>80<span>%</span></strong><h3>科技感</h3><p>精密秩序 · 清透材质</p></div><div><strong>20<span>%</span></strong><h3>母婴亲和感</h3><p>柔和光影 · 圆润曲线</p></div></div><div class="brand-case-ratio-bar" aria-hidden="true"><span></span><span></span></div></div><div class="brand-case-keywords"><h3>视觉关键词</h3><ul><li>蓝白基调</li><li>清透材质</li><li>柔和光影</li><li>圆润曲线</li><li>有序构图</li></ul></div></div>
      </section>
      ${brandGallery()}
      <section class="brand-case-section brand-case-delivery" aria-labelledby="brand-delivery-title">${brandCaseHeading("brand-delivery-title", "交付", "总结", "从视觉策略、产品素材制作到主KV与多触点延展，建立连接系列产品和线上线下物料的统一表达。", true)}</section>
    </div>
    <section class="next-project grid-shell"><a href="${routes.portfolio}">返回全部作品 <span>↗</span></a></section>
  </main>`;
}

function aboutPage() {
  return `
    <main id="main-content">
      ${pageIntro(
        "ABOUT ME",
        `我是${site.name}<br />一名连接技术与商业的视觉设计师`,
        site.hero.description,
        { className: "compact-page-intro" },
      )}
      <section class="about-layout grid-shell">
        <div class="about-portrait-gallery">
          ${lanyardProfile(profileMedia[0], "about-page-lanyard")}
        </div>
        <div class="about-bio">
          <span class="section-label accent">PROFILE</span>
          <h2>8年设计经验<br /><span class="title-accent">持续把新技术转化为稳定产出</span></h2>
          ${site.strengths.map((item) => `<p>${item}</p>`).join("")}
        </div>
      </section>
      <section class="experience-section grid-shell">
        <header class="section-heading compact">
          <span class="section-label">EXPERIENCE</span>
          <h2>工作经历</h2>
        </header>
        <div class="timeline">
          ${experience
            .map(
              (item, index) => `
                <article>
                  <span class="timeline-index">0${index + 1}</span>
                  <div>
                    <h3>${item.company}</h3>
                    <p>${item.role}</p>
                  </div>
                  <p class="timeline-summary">${item.summary}</p>
                  <time>${item.period}</time>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
      ${contactCta()}
    </main>
  `;
}

function capabilityIcons(index) {
  const conceptIcons = {
    strategy: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    brand: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    commerce: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13h8M8 16h5"/>',
    channels: '<rect x="2" y="5" width="13" height="10" rx="1"/><rect x="17" y="9" width="5" height="11" rx="1"/><path d="M5 19h7M9 15v4"/>',
    ctr: '<path d="m5 3 3 16 4-5 6-2Z"/><path d="m13 15 4 5M17 4h4M19 2v4"/>',
    cvr: '<path d="M3 4h18l-7 8v5l-4 3v-8Z"/><path d="m8 7 3 3 5-5"/>',
    roi: '<path d="M4 20h16M5 16V9M10 16v-5M15 16V6M20 16V3"/><path d="m3 8 6-4 5 1 6-4"/>',
    iteration: '<path d="M5 7a8 8 0 0 1 14-1l2 2M21 3v5h-5M19 17A8 8 0 0 1 5 18l-2-2M3 21v-5h5"/>',
  };
  const groups = {
    "01": [{label: "视觉策略", icon: "strategy"}, {label: "品牌规范", icon: "brand"}, {label: "电商设计", icon: "commerce"}, {label: "多端延展", icon: "channels"}],
    "02": [{label: "Cinema 4D", file: "cinema4d.svg"}, {label: "Blender", file: "blender.svg"}, {label: "Octane", file: "octane.svg"}, {label: "Cycles", file: "cycles-proposal.svg"}],
    "03": [{label: "ChatGPT", file: "chatgpt.svg"}, {label: "Gemini", file: "gemini.svg"}, {label: "Midjourney", file: "midjourney.svg"}, {label: "Runway", file: "runway.webp"}],
    "04": [{label: "点击率 CTR", icon: "ctr"}, {label: "转化率 CVR", icon: "cvr"}, {label: "投入回报 ROI", icon: "roi"}, {label: "A/B 迭代", icon: "iteration"}],
  };
  return `<div class="capability-icons" aria-label="${index === "02" || index === "03" ? "常用软件" : "核心能力"}">${(groups[index] || []).map(item => `<figure class="capability-icon${item.dark ? " capability-icon-dark" : ""}">${item.file ? `<img src="./media/网站素材/tool-icons/${item.file}" alt="" loading="lazy" decoding="async" />` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conceptIcons[item.icon]}</svg>`}<figcaption>${item.label}</figcaption></figure>`).join("")}</div>`;
}

function stackPage() {
  return `
    <main id="main-content">
      ${pageIntro(
        "CAPABILITIES",
        "让工具服务策略<br />让系统放大效率",
        "围绕品牌识别、产品卖点与购买决策，交付品牌视觉规范、电商与直播物料、3D 产品资产，并结合 AI 工作流提高创意探索与制作效率。",
        { accentAfter: 3, className: "compact-page-intro" },
      )}
      <section class="capability-page grid-shell">
        ${capabilities
          .map(
            (item) => `
              <article class="capability-card">
                <span class="capability-index">${item.index}</span>
                <div class="capability-copy">
                  <h2>${item.title}</h2>
                  <p>${item.description}</p>
                </div>
                <strong>${item.tools}</strong>
                ${capabilityIcons(item.index)}
              </article>
            `,
          )
          .join("")}
      </section>
      ${contactCta()}
    </main>
  `;
}

function contactCta() {
  return `
    <section class="contact-cta grid-shell">
      <span class="section-label accent">PROFILE / CONTACT</span>
      <h2>进一步了解我的<span class="title-accent">经历与作品</span></h2>
      <a class="button button-primary" href="${routes.contact}">查看联系方式 ↗</a>
    </section>
  `;
}

function contactPage() {
  return `
    <main id="main-content">
      <section class="contact-page grid-shell">
        <div class="contact-intro">
          <span class="section-label accent">CONTACT</span>
          <h1>联系方式</h1>
          <aside class="contact-form contact-card" aria-label="个人联系信息">
          <span class="section-label accent">PROFILE CARD</span>
          <div class="contact-card-list">
            <p>${site.role}</p>
            <p>品牌视觉 / 3D 视觉 / AI 创意工作流</p>
            <p>${site.location}</p>
            <div class="contact-copy-row">
              <a href="mailto:${site.email}">${site.email}</a>
              <button class="copy-button" type="button" aria-label="复制邮箱" data-copy="${site.email}" data-copy-label="邮箱">复制</button>
            </div>
            <div class="contact-copy-row">
              <a href="tel:${site.phone}">${site.phone}</a>
              <button class="copy-button" type="button" aria-label="复制电话" data-copy="${site.phone}" data-copy-label="电话">复制</button>
            </div>
          </div>
          <p class="copy-status" id="copy-status" aria-live="polite"></p>
          </aside>
        </div>
        ${lanyardProfile(profileMedia[0], "contact-page-lanyard")}
      </section>
    </main>
  `;
}

function notFoundPage() {
  return `
    <main id="main-content" class="not-found grid-shell">
      <span class="section-label accent">404</span>
      <h1>这个页面还没有进入作品集</h1>
      <a class="button button-primary" href="${routes.home}">返回首页</a>
    </main>
  `;
}

function getRoute() {
  const hash = window.location.hash || routes.home;
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  if (parts.length === 0) return { id: "home", view: homePage() };
  if (parts[0] === "portfolio" && parts[1]) {
    const project = projects.find((item) => item.id === parts[1]);
    return project
      ? { id: "portfolio", view: projectPage(project) }
      : { id: "portfolio", view: notFoundPage() };
  }
  if (parts[0] === "portfolio") return { id: "portfolio", view: portfolioPage() };
  if (parts[0] === "about") return { id: "about", view: aboutPage() };
  if (parts[0] === "tech-stack") return { id: "stack", view: stackPage() };
  if (parts[0] === "contact") return { id: "contact", view: contactPage() };
  return { id: "home", view: notFoundPage() };
}

function setupMasonry() {
  const cleanups = [];

  document.querySelectorAll("[data-masonry]").forEach((container) => {
    const items = [...container.querySelectorAll(".masonry-item")];
    const density = container.dataset.density || "standard";
    let frame = 0;
    let lastWidth = 0;

    const getColumns = (width) => {
      if (density === "render") {
        if (width >= 1040) return 3;
        if (width >= 620) return 2;
        return 1;
      }
      if (width >= 1320) return 5;
      if (width >= 850) return 4;
      if (width >= 620) return 3;
      if (width >= 420) return 2;
      return 1;
    };

    const layout = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const width = container.clientWidth;
        if (!width) return;
        lastWidth = width;
        const gap = density === "render" ? 6 : 10;
        const columns = getColumns(width);
        const itemWidth = (width - gap * (columns - 1)) / columns;
        const columnHeights = new Array(columns).fill(0);

        items.forEach((item, index) => {
          const image = item.querySelector("img");
          const ratio = image?.naturalWidth && image?.naturalHeight
            ? image.naturalHeight / image.naturalWidth
            : 0.78;
          const column = columnHeights.indexOf(Math.min(...columnHeights));
          const x = column * (itemWidth + gap);
          const y = columnHeights[column];
          const height = itemWidth * ratio;

          item.style.width = `${itemWidth}px`;
          item.style.height = `${height}px`;
          item.style.setProperty("--masonry-x", `${x}px`);
          item.style.setProperty("--masonry-y", `${y}px`);
          item.style.setProperty("--masonry-delay", `${Math.min(index, 12) * 45}ms`);
          columnHeights[column] += height + gap;
        });

        container.style.height = `${Math.max(0, ...columnHeights) - gap}px`;
        container.classList.add("is-masonry-laid-out");
      });
    };

    const imageListeners = items.map((item) => {
      const image = item.querySelector("img");
      if (!image || image.complete) return null;
      image.addEventListener("load", layout);
      image.addEventListener("error", layout);
      return image;
    }).filter(Boolean);

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = Math.round(entry.contentRect.width);
      if (Math.abs(nextWidth - lastWidth) > 1) layout();
    });
    resizeObserver.observe(container);

    const revealObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      container.classList.add("is-masonry-visible");
      revealObserver.disconnect();
    }, { threshold: 0.08 });
    revealObserver.observe(container);
    layout();

    cleanups.push(() => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      revealObserver.disconnect();
      imageListeners.forEach((image) => {
        image.removeEventListener("load", layout);
        image.removeEventListener("error", layout);
      });
    });
  });

  return cleanups;
}

function setupLanyards(reduceMotion) {
  const cleanups = [];

  document.querySelectorAll("[data-lanyard]").forEach((scene) => {
    const card = scene.querySelector("[data-lanyard-card]");
    const straps = scene.querySelector(".lanyard-straps");
    const hole = scene.querySelector(".lanyard-hole");
    if (!card) return;

    let frame = 0;
    let dragging = false;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetX = 0;
    let targetY = 0;
    const syncProportions = () => {
      const height = scene.clientHeight;
      const width = scene.clientWidth;
      const cardWidth = Math.max(260, Math.min(420, width * 0.78, height * 0.44));
      const cardTop = Math.max(110, Math.min(190, height * 0.16));
      const strapWidth = Math.max(22, Math.min(30, height * 0.033));
      scene.style.setProperty("--lanyard-card-width", `${cardWidth}px`);
      scene.style.setProperty("--lanyard-card-top", `${cardTop}px`);
      scene.style.setProperty("--lanyard-strap-width", `${strapWidth}px`);
    };
    const proportionObserver = new ResizeObserver(syncProportions);
    proportionObserver.observe(scene);
    syncProportions();

    let dragOrigin = null;

    const clampToViewport = (nextX, nextY) => {
      const rect = card.getBoundingClientRect();
      const baseLeft = rect.left - currentX;
      const baseRight = rect.right - currentX;
      const baseTop = rect.top - currentY;
      const baseBottom = rect.bottom - currentY;
      const gutter = 18;
      return {
        x: Math.max(gutter - baseLeft, Math.min(window.innerWidth - gutter - baseRight, nextX)),
        y: Math.max(gutter - baseTop, Math.min(window.innerHeight - gutter - baseBottom, nextY)),
      };
    };

    const setTarget = (event) => {
      if (!dragOrigin) return;
      const next = clampToViewport(
        dragOrigin.cardX + (event.clientX - dragOrigin.pointerX),
        dragOrigin.cardY + (event.clientY - dragOrigin.pointerY),
      );
      targetX = next.x;
      targetY = next.y;
    };

    const renderFrame = () => {
      const stiffness = dragging ? 0.24 : 0.075;
      const damping = dragging ? 0.72 : 0.84;
      velocityX = (velocityX + (targetX - currentX) * stiffness) * damping;
      velocityY = (velocityY + (targetY - currentY) * stiffness) * damping;
      currentX += velocityX;
      currentY += velocityY;
      const rotateY = currentX * 0.09;
      const rotateX = -currentY * 0.06;
      const rotateZ = currentX * 0.035;
      card.style.transform = `translate3d(calc(-50% + ${currentX}px), ${currentY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      if (straps) {
        const connectorY = card.offsetTop + (hole?.offsetTop || 8) + ((hole?.offsetHeight || 15) / 2) + currentY;
        const strapLength = Math.sqrt(currentX * currentX + connectorY * connectorY);
        const strapAngle = -Math.atan2(currentX, connectorY) * (180 / Math.PI);
        straps.style.height = `${Math.max(92, strapLength)}px`;
        straps.style.transform = `translateX(-50%) rotate(${strapAngle}deg)`;
      }
      frame = window.requestAnimationFrame(renderFrame);
    };

    const onPointerDown = (event) => {
      event.preventDefault();
      dragging = true;
      card.classList.add("is-dragging");
      scene.classList.add("is-lanyard-active");
      dragOrigin = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        cardX: currentX,
        cardY: currentY,
      };
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      event.preventDefault();
      setTarget(event);
    };
    const release = () => {
      dragging = false;
      dragOrigin = null;
      card.classList.remove("is-dragging");
      scene.classList.remove("is-lanyard-active");
      targetX = 0;
      targetY = 0;
    };

    card.addEventListener("pointerdown", onPointerDown);
    straps?.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove, { passive: false });
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    if (!reduceMotion) frame = window.requestAnimationFrame(renderFrame);

    cleanups.push(() => {
      window.cancelAnimationFrame(frame);
      proportionObserver.disconnect();
      card.removeEventListener("pointerdown", onPointerDown);
      straps?.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
    });
  });

  return cleanups;
}

function render() {
  const route = getRoute();
  updatePageMeta({ route: route.id, site, projects });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  masonryCleanup.forEach((cleanup) => cleanup());
  lanyardCleanup.forEach((cleanup) => cleanup());
  carouselCleanup.forEach((cleanup) => cleanup());
  growthTextCleanup();
  heroEntranceCleanup();
  scrollRevealCleanup();
  brandCountCleanup();
  caseCountCleanup();
  lightboxCleanup();
  caseTextCleanup();
  masonryCleanup = [];
  lanyardCleanup = [];
  app.innerHTML = `${header()}${route.view}${footer()}${mobileDock()}${lightboxMarkup()}`;
  document.querySelector("#main-content")?.setAttribute("tabindex", "-1");
  lightboxCleanup = setupLightbox();
  caseTextCleanup = initCaseTextFit(document.querySelector("#main-content"));
  masonryCleanup = setupMasonry();
  lanyardCleanup = setupLanyards(reduceMotion);
  carouselCleanup = initDepthCarousels();
  brandCountCleanup = initBrandCountUp(document.querySelector(".brand-upgrade-case"));
  caseCountCleanup = initCaseCountUp(document.querySelector("#main-content"));
  document.querySelectorAll(`[data-nav="${route.id}"]`).forEach((item) => {
    item.classList.add("is-active");
    item.setAttribute("aria-current", "page");
  });

  if (route.id === "home") {
    const hero = document.querySelector(".hero-intro");
    const revealHero = () => {
      if (!hero?.isConnected) return;
      if (!reduceMotion) {
        window.requestAnimationFrame(() => {
          if (hero.isConnected) hero.classList.add("is-ready");
        });
      } else {
        hero.classList.add("is-ready");
      }
      growthTextCleanup = initGrowthText(hero.querySelector("[data-growth-text]"));
    };
    if (document.documentElement.dataset.entrance === "loading") {
      document.addEventListener("portfolio:entrance-reveal", revealHero, { once: true });
      heroEntranceCleanup = () => document.removeEventListener("portfolio:entrance-reveal", revealHero);
    } else {
      revealHero();
      heroEntranceCleanup = () => {};
    }
  }

  scrollRevealCleanup = initScrollReveal(app);
  document.dispatchEvent(new Event("portfolio:page-ready"));

  const form = document.querySelector("#prototype-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector("#form-note").textContent =
        "这是骨架原型：表单结构已完成，下一阶段再连接提交服务。";
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      const label = button.dataset.copyLabel;
      const status = document.querySelector("#copy-status");

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "已复制";
        button.classList.add("is-copied");
        if (status) status.textContent = `${label}已复制`;

        window.setTimeout(() => {
          button.textContent = "复制";
          button.classList.remove("is-copied");
          if (status) status.textContent = "";
        }, 1800);
      } catch {
        if (status) status.textContent = `复制失败，请手动复制${label}`;
      }
    });
  });

  const countUpItems = [...document.querySelectorAll(".count-up")];
  const countUpRows = [...document.querySelectorAll(".metrics-row")].filter((row) =>
    row.querySelector(".count-up"),
  );
  const countUpFrames = new WeakMap();

  const formatCountValue = (value, element) => {
    const decimals = Number(element.dataset.decimals || 0);
    const useGrouping = element.dataset.grouping === "true";
    const formatted = useGrouping
      ? value.toLocaleString("zh-CN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : value.toFixed(decimals);

    return `${element.dataset.prefix || ""}${formatted}${element.dataset.suffix || ""}`;
  };

  const finishCountUp = (element) => {
    element.textContent = formatCountValue(Number(element.dataset.countTo), element);
    element.dataset.counted = "true";
    countUpFrames.delete(element);
  };

  const animateCountUp = (element) => {
    const activeFrame = countUpFrames.get(element);
    if (activeFrame) window.cancelAnimationFrame(activeFrame);

    const target = Number(element.dataset.countTo);
    const duration = 1100;
    const start = performance.now();
    element.dataset.counted = "false";
    element.textContent = formatCountValue(0, element);

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatCountValue(target * eased, element);

      if (progress < 1) {
        countUpFrames.set(element, window.requestAnimationFrame(frame));
      } else {
        finishCountUp(element);
      }
    };

    countUpFrames.set(element, window.requestAnimationFrame(frame));
  };

  const resetCountUp = (element) => {
    const activeFrame = countUpFrames.get(element);
    if (activeFrame) window.cancelAnimationFrame(activeFrame);
    countUpFrames.delete(element);
    element.dataset.counted = "false";
    element.textContent = formatCountValue(0, element);
  };

  if (countUpItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      countUpItems.forEach(finishCountUp);
    } else {
      countUpItems.forEach((item) => {
        item.textContent = formatCountValue(0, item);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const rowItems = [...entry.target.querySelectorAll(".count-up")];

            if (entry.isIntersecting) {
              rowItems.forEach(animateCountUp);
            } else {
              rowItems.forEach(resetCountUp);
            }
          });
        },
        { threshold: 0.18 },
      );

      countUpRows.forEach((row) => observer.observe(row));
    }
  }

  document.querySelectorAll("[data-campaign-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.campaignScroll);
      target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-scroll-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.scrollProject);
      if (!target) return;

      document.querySelectorAll("[data-scroll-project]").forEach((item) => {
        item.classList.toggle("filter-active", item === button);
      });
      document.querySelectorAll(".project-card.is-scroll-target").forEach((card) => {
        card.classList.remove("is-scroll-target");
      });
      if (target.classList.contains("project-card")) {
        target.classList.add("is-scroll-target");
        window.setTimeout(() => target.classList.remove("is-scroll-target"), 900);
      }
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  window.scrollTo({ top: 0, behavior: "instant" });
}

function lightboxMarkup() {
  return `
    <div class="image-lightbox" role="dialog" aria-modal="true" aria-label="全屏图片细节查看" tabindex="-1" hidden>
      <div class="lightbox-toolbar">
        <p class="lightbox-caption">图片细节</p>
        <div class="lightbox-actions">
          <button type="button" data-zoom="out" aria-label="缩小">−</button>
          <button type="button" data-zoom="reset" aria-label="重置缩放">100%</button>
          <button type="button" data-zoom="in" aria-label="放大">+</button>
          <button type="button" data-lightbox-close aria-label="关闭图片查看">关闭</button>
        </div>
      </div>
      <div class="lightbox-stage" aria-label="滚轮缩放，拖动查看细节">
        <img class="lightbox-image" alt="" draggable="false" />
      </div>
      <p class="lightbox-hint">滚轮放大 / 缩小 · 全屏拖动查看 · 按 Esc 关闭</p>
    </div>`;
}

function setupLightbox() {
  const viewer = document.querySelector(".image-lightbox");
  if (!viewer) return () => {};
  const image = viewer.querySelector(".lightbox-image");
  const stage = viewer.querySelector(".lightbox-stage");
  let returnFocus = null;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let drag = null;
  const backgroundState = new Map();

  const update = () => {
    image.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    viewer.querySelector('[data-zoom="reset"]').textContent = `${Math.round(scale * 100)}%`;
  };
  const zoom = (nextScale) => {
    scale = Math.min(6, Math.max(0.25, nextScale));
    if (scale === 1) offsetX = offsetY = 0;
    update();
  };

  const close = (restoreFocus = true) => {
    if (viewer.hidden) return;
    viewer.hidden = true;
    document.body.classList.remove("lightbox-open");
    backgroundState.forEach((inert, node) => { node.inert = inert; });
    backgroundState.clear();
    if (restoreFocus && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  };
  viewer.querySelector("[data-lightbox-close]").addEventListener("click", close);
  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoom(scale * (event.deltaY < 0 ? 1.12 : 1 / 1.12));
  }, { passive: false });
  stage.addEventListener("pointerdown", (event) => {
    drag = { x: event.clientX - offsetX, y: event.clientY - offsetY };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag) return;
    offsetX = event.clientX - drag.x;
    offsetY = event.clientY - drag.y;
    update();
  });
  const stopDragging = () => {
    drag = null;
    stage.classList.remove("is-dragging");
  };
  stage.addEventListener("pointerup", stopDragging);
  stage.addEventListener("pointercancel", stopDragging);
  const open = (source, alt) => {
    returnFocus = document.activeElement;
    image.src = source;
    image.alt = alt;
    const caption = viewer.querySelector(".lightbox-caption");
    caption.textContent = alt;
    zoom(1);
    viewer.hidden = false;
    const background = [...app.children].filter(node => node !== viewer).concat(document.querySelector(".skip-link") || []);
    background.forEach(node => {
      if (!backgroundState.has(node)) backgroundState.set(node, node.inert);
      node.inert = true;
    });
    document.body.classList.add("lightbox-open");
    viewer.querySelector("[data-lightbox-close]").focus();
  };

  viewer._openImage = open;
  viewer._closeImage = close;
  viewer._zoomImage = (action) => {
    if (action === "in") zoom(scale * 1.25);
    if (action === "out") zoom(scale / 1.25);
    if (action === "reset") zoom(1);
  };
  viewer.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const controls = [...viewer.querySelectorAll('button:not([disabled]), [href], [tabindex="0"]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) { event.preventDefault(); viewer.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === viewer)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === viewer)) {
      event.preventDefault(); first.focus();
    }
  });
  return () => close(false);
}

window.addEventListener("hashchange", render);
document.addEventListener("click", (event) => {
  if (event.target.closest(".skip-link")) {
    event.preventDefault();
    const main = document.querySelector("#main-content");
    main?.focus({ preventScroll: true });
    main?.scrollIntoView({ block: "start", behavior: "instant" });
    return;
  }
  const viewer = document.querySelector(".image-lightbox");
  const zoomControl = event.target.closest("[data-zoom]");
  if (zoomControl) {
    event.preventDefault();
    event.stopPropagation();
    viewer?._zoomImage(zoomControl.dataset.zoom);
    return;
  }
  if (event.target.closest("[data-lightbox-close]")) {
    event.preventDefault();
    viewer?._closeImage?.();
    return;
  }
  const image = event.target.closest("img[data-lightbox]");
  if (image) {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector(".image-lightbox")?._openImage(image.currentSrc || image.src, image.alt);
    return;
  }
  const homeLink = event.target.closest('[data-nav="home"]');
  if (!homeLink || getRoute().id !== "home") return;
  event.preventDefault();
  render();
});
document.addEventListener("keydown", (event) => {
  const image = event.target.closest?.("img[data-lightbox]");
  if (image && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    document.querySelector(".image-lightbox")?._openImage(image.currentSrc || image.src, image.alt);
  }
  const viewer = document.querySelector(".image-lightbox:not([hidden])");
  if (!viewer) return;
  if (event.key === "Escape") viewer._closeImage?.();
  if (event.key === "+" || event.key === "=") viewer._zoomImage?.("in");
  if (event.key === "-") viewer._zoomImage?.("out");
  if (event.key === "0") viewer._zoomImage?.("reset");
});
fetch("./media-index.json")
  .then((response) => (response.ok ? response.json() : []))
  .then((files) => {
    mediaFiles = Array.isArray(files) ? files : [];
    render();
  })
  .catch(() => render());

