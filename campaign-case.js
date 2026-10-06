import { caseHeading, caseIcon, numberedTitle } from "./case-ui.js?v=20261006-comments";
// Curated New Year case, following the approved campaign layout.
export function renderCampaignCase({ project, mediaImage, namedFiles, routes }) {
  const root = "images/S级大促营销活动/";
  const picture = (name, alt, className = "", eager = false) => {
    const [file] = namedFiles(root, [name]);
    if (!file) return "";
    const markup = mediaImage(file, alt, className);
    return eager ? markup.replace('loading="lazy"', 'loading="eager" fetchpriority="high"') : markup;
  };
  const heading = (id, number, label, title, accent, copy) => caseHeading("campaign-section-heading", id, number, title, accent, copy);
  const selection = (items, className = "campaign-triptych") => `<div class="${className}">${items.map(([file, caption]) => `<div>${picture(file, caption)}<p class="campaign-caption">${caption}</p></div>`).join("")}</div>`;
  const pageBlocks = [
    ["01", "主题引入", "theme", "活动标识与主产品建立第一印象。"],
    ["02", "会员权益", "benefits", "优惠、服务和赠礼形成利益承接。"],
    ["03", "核心产品", "product", "按产品组织卖点、价格与赠品。"],
    ["04", "配件补充", "accessories", "用系列陈列承接补充购买需求。"],
  ];
  const workflow = [
    ["主视觉定调", "统一活动色彩、场景舞台与产品质感。"],
    ["会场信息组织", "按主题、权益、商品与配件串联阅读。"],
    ["商品与SKU规则", "用稳定分区承接卖点、价格和组合。"],
    ["跨端视觉输出", "按比例与触点调整构图和信息密度。"],
  ];
  return `<main id="main-content" class="campaign-case"><div class="campaign-shell">
    <section class="campaign-hero" aria-labelledby="campaign-title">
      <div><h1 id="campaign-title">S级大促<br><span class="title-accent">营销活动</span></h1><p class="campaign-lead">围绕年货节建立活动视觉，从主视觉、会场信息到商品与跨平台物料，保持主题连续、权益清晰。</p><dl class="campaign-meta"><div><dt>活动阶段</dt><dd>${project.period}</dd></div><div><dt>项目职责</dt><dd>活动视觉 / 电商视觉 / 页面设计</dd></div></dl></div>
      <div>${mediaImage("images/S级大促营销活动/年货节项目展示缩略图.webp", "年货节产品与活动主视觉", "campaign-cover").replace('loading="lazy"', 'loading="eager" fetchpriority="high"')}<p class="campaign-caption">年货节 / 产品与活动主视觉</p></div>
    </section>
    <section class="campaign-goals" aria-label="活动视觉的三个设计目标">${[["活动识别", "统一主题", "节日语境 × 产品质感"], ["信息层级", "权益易读", "主题 / 优惠 / 商品 / 赠品"], ["触点适配", "连续表达", "会场 / 主图 / SKU / 品专"]].map(([label, title, copy], index) => `<article><p>${label}</p><h2 class="case-icon-title">${caseIcon(["compass", "layers", "tree"][index])}<span>${title}</span></h2><p>${copy}</p></article>`).join("")}</section>

    <section class="campaign-section" aria-labelledby="campaign-visual">
      ${heading("campaign-visual", "01", "KEY VISUAL", "活动主视觉与", "场景语言", "以暖粉渐变、红色舞台与清透产品建立年货节表达，将活动气氛和品牌质感统一起来。")}
      <div class="campaign-visual-grid"><div>${picture("KV/双12pro.webp", "年货节PRO产品主视觉", "campaign-keyvisual")}<p class="campaign-caption">代表主视觉 / 产品主体与核心卖点</p></div><div>${picture("KV/无标题3.webp", "年货节产品场景：暖粉背景与红色舞台", "campaign-scene")}<p class="campaign-caption">场景基准 / 产品、舞台与光影</p><div class="campaign-language">${[["pink", "暖粉渐变", "建立柔和、亲近的活动气氛。"], ["red", "红色舞台", "集中产品重心，强化节日识别。"], ["clear", "清透产品", "延续材质与轮廓，保持品质感。"]].map(([color, title, copy]) => `<article><span class="campaign-swatch campaign-swatch-${color}" aria-hidden="true"></span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join("")}</div></div></div>
    </section>

    <section class="campaign-section" aria-labelledby="campaign-narrative">
      ${heading("campaign-narrative", "02", "PAGE NARRATIVE", "会场页面的", "阅读顺序", "")}
      <div class="campaign-page-layout"><div class="campaign-page-overview"><h3>完整会场</h3><div class="campaign-longpage">${picture("年货节页面.webp", "年货节完整会场页面，点击放大查看")}<button type="button" data-campaign-scroll="campaign-block-theme" class="campaign-marker" style="--position:0.68%" aria-label="查看区块01主题引入">01</button><button type="button" data-campaign-scroll="campaign-block-benefits" class="campaign-marker" style="--position:12.72%" aria-label="查看区块02会员权益">02</button><button type="button" data-campaign-scroll="campaign-block-product" class="campaign-marker" style="--position:34.45%" aria-label="查看区块03核心产品">03</button><button type="button" data-campaign-scroll="campaign-block-accessories" class="campaign-marker" style="--position:83.14%" aria-label="查看区块04配件补充">04</button></div></div>
        <div><div class="campaign-page-blocks">${pageBlocks.map(([number, title, slug, copy]) => `<article id="campaign-block-${slug}"><h3 class="case-step-title">${numberedTitle(number, title)}</h3><div class="campaign-block-art"><img src="./media/网站素材/campaign/${slug}.webp" alt="年货节会场区块${number}：${title}" loading="lazy" decoding="async" data-lightbox tabindex="0" role="button" aria-label="全屏查看：${title}" /></div><p class="campaign-caption">${copy}</p></article>`).join("")}</div><div class="campaign-flow"><h3>主题吸引 → 权益承接 → 商品选择 → 配件补充</h3><p>让长页面中的信息逐层展开，用重复的产品舞台、标题和利益分区保持阅读连续。</p></div></div>
      </div>
    </section>

    <section class="campaign-section" aria-labelledby="campaign-products">
      ${heading("campaign-products", "03", "PRODUCT RULES", "商品主图与", "SKU规则", "")}
      <h3 class="campaign-subheading">商品主图 / 保持清楚的产品与利益层级</h3>
      ${selection([["有价版/双12主图无价版1-15.webp", "PRO / 产品与价格利益"], ["有价版/双12主图plus无价版1-15.webp", "PLUS / 产品与价格利益"], ["有价版/双12主图羊脂膏1-15.webp", "羊脂膏 / 单品与护理卖点"]])}
      <div class="campaign-rules">${[["顶部：品牌与卖点", "先识别品牌、产品系列与核心卖点。"], ["中部：产品与场景", "统一产品重心和活动舞台的关系。"], ["底部：价格与权益", "集中价格、赠品和服务信息。"]].map(([title, copy], index) => `<article class="case-icon-card">${caseIcon(["compass", "cube", "target"][index])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
      <div class="campaign-subheading-row"><h3>SKU组合 / 区分套装与配件</h3><p>在共同的活动语言中，用产品组合与名称区分规格，降低不同套装的比较成本。</p></div>
      ${selection([["sku/800x800 PRO组合1.webp", "PRO组合 / 产品与配件"], ["sku/800x800 PLUS组合1.webp", "PLUS组合 / 产品与配件"], ["sku/800x800 羊脂膏组合1.webp", "羊脂膏组合 / 产品与配件"]])}
    </section>

    <section class="campaign-section" aria-labelledby="campaign-adaptation">
      ${heading("campaign-adaptation", "04", "ADAPTATION", "信息版本与", "跨端适配", "")}
      ${selection([["双12主图无价版1-13.webp", "1:1 / 无价格信息"], ["有价版/双12主图无价版1-15.webp", "1:1 / 含价格信息"], ["有价版/双12主图pro750无价版1-15.webp", "3:4 / 含价格信息"]], "campaign-triptych campaign-variants")}
      <div class="campaign-subheading-row campaign-platform-heading"><h3>手机端品专横幅</h3><p>以横向空间承接产品卖点与行动入口，延续年货节场景和产品质感。</p></div>
      ${selection([["手机端品专轮播/pro.webp", "PRO / 横向卖点与购买入口"], ["手机端品专轮播/恒温壶.webp", "恒温壶 / 横向卖点与购买入口"]], "campaign-pair")}
    </section>

    <section class="campaign-section" aria-labelledby="campaign-review">
      ${heading("campaign-review", "05", "DELIVERY & REVIEW", "交付体系与", "设计复盘", "让主视觉、会场、商品和移动触点形成连续表达，沉淀活动中可持续延展的视觉规则。")}
      <div class="campaign-workflow">${workflow.map(([title, copy], index) => `<article><h3 class="case-step-title">${numberedTitle(`0${index + 1}`, title)}</h3><p>${copy}</p></article>`).join("")}</div>
      <div class="campaign-review"><article><h3>形成连续的活动识别</h3><p>用共同的色彩、产品舞台与视觉质感连接不同物料，同时按会场、商品和移动端的阅读任务调整信息层级。</p></article><article><h3>保留可复用的适配原则</h3><p>明确主产品、权益区与规格信息的关系，在新增商品和版本时延续共同规则，保持活动表达一致。</p></article></div>
    </section>
    <section class="campaign-closing" aria-label="联系与作品导航"><div><h2>从一张主视觉，到完整活动表达</h2><p>活动视觉 / 电商页面 / 多端适配</p></div><a class="button button-secondary" href="${routes.contact}">查看联系方式 ↗</a></section><a class="campaign-back" href="${routes.portfolio}">返回全部作品 ↗</a>
  </div></main>`;
}
