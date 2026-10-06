export const site = {
  name: "胡飞",
  initials: "HF",
  role: "资深视觉设计师 / 3D设计师",
  location: "广州 / 深圳",
  experienceYears: "8年",
  email: "505971745@qq.com",
  phone: "18720273853",
  hero: {
    eyebrow: "广州 / 深圳 · 资深视觉设计师",
    titleLine1: "让视觉",
    titleLine2: "驱动增长",
    description:
      "融合 3D 渲染、AI 与品牌视觉系统，把营销策略转化为可执行、可复用、可衡量的视觉方案。",
  },
  strengths: [
    "以 3D 渲染（C4D + Blender）与 AI 为核心工具，解决视觉效率、引流成本与转化链路问题。",
    "擅长从 0 到 1 搭建品牌视觉体系，并持续迭代品牌视觉与电商场景表达。",
    "深度协同运营、营销与产品团队，将策略拆解为能够落地的视觉方案。",
  ],
};

export const metrics = [
  {
    value: "24.21%",
    countTo: 24.21,
    decimals: 2,
    suffix: "%",
    label: "点击率提升",
    note: "多场景投放素材优化",
  },
  {
    value: "70.41%",
    countTo: 70.41,
    decimals: 2,
    suffix: "%",
    label: "转化率提升",
    note: "卖点与视觉层级重构",
  },
  {
    value: "102.23%",
    countTo: 102.23,
    decimals: 2,
    suffix: "%",
    label: "ROI提升",
    note: "核心产品投放优化",
  },
  {
    value: "1,954万",
    countTo: 1954,
    decimals: 0,
    suffix: "万",
    useGrouping: true,
    label: "单月直播GMV",
    note: "抖音渠道视觉体系搭建",
  },
];

export const projects = [
  {
    id: "brand-visual-upgrade",
    tag: "BRAND STRATEGY / 3D / E-COMMERCE",
    title: "品牌视觉升级",
    summary:
      "统一产品质感，建立专业而有温度的品牌表达，并延展至微信商城、私域活动与线下服务物料。",
    period: "2025年8月 · 排期1周",
    role: "个人独立执行 / 视觉策略 / 渲染与合成 / 线上线下延展",
    metrics: ["视觉策略 统一品牌定调", "体验平衡 科技感 × 母婴感", "渠道延展 电商 / 社媒 / 线下"],
    challenge:
      "产品质感与光影表达不一致，整体品质感不足，需要建立统一的视觉基准。",
    process:
      "独立完成视觉策略、场景参考、单品渲染与修图、主KV场景合成，以及线上线下视觉延展输出。",
    result:
      "形成兼顾科技感与母婴亲和感的蓝白视觉表达，完成主KV、商城主图、私域活动及线下服务卡的视觉延展。",
    variant: "feature",
  },
  {
    id: "performance-creative",
    tag: "PERFORMANCE CREATIVE",
    title: "核心产品投放图优化",
    summary:
      "提炼产品卖点并重组视觉层级，为不同投放场景输出高适配素材，降低前端获客成本。",
    period: "2025 - 2026",
    role: "视觉设计 / 数据迭代",
    metrics: ["点击率 +24.21%", "转化率 +70.41%", "ROI +102.23%"],
    variant: "wide",
  },
  {
    id: "douyin-system",
    tag: "VISUAL SYSTEM",
    title: "抖音视觉体系 0 → 1",
    summary:
      "覆盖 KT 板、贴片、背景、PPT、手卡、封面、弹窗与循环视频，打通主图、活动弹窗和直播间。",
    period: "2025 - 2026",
    role: "视觉体系搭建",
    metrics: ["直播间单月 GMV 1954万元", "多触点视觉统一"],
    variant: "wide",
  },
  {
    id: "3d-asset-library",
    tag: "3D ASSET SYSTEM",
    title: "战略新品 3D 高精度资产库",
    summary:
      "完成建模、场景搭建、材质调试、布光渲染与 8K 输出，服务主图、KV、详情页和包装展示。",
    period: "2025 - 2026",
    role: "3D视觉设计",
    metrics: ["8K 级素材输出", "覆盖多个产品触点"],
    variant: "wide",
  },
  {
    id: "category-upgrade",
    tag: "BRAND / E-COMMERCE",
    title: "S级大促营销活动",
    summary:
      "围绕年货节建立统一的活动视觉，呈现主KV、商品主图、会场页面与跨端延展素材。",
    challenge:
      "将年货节的活动策略转化为兼具节日氛围和品牌识别的电商视觉，覆盖会场页面、活动KV、商品主图与手机端品专。",
    process:
      "依年货节活动节奏组织主视觉、商品组合、会场长图和移动端延展，保持各触点的视觉语言与信息层级一致。",
    result:
      "形成覆盖年货节主视觉、会场、商品与移动端的完整物料体系，便于按渠道与商品类型浏览。",
    period: "年货节",
    role: "活动视觉 / 电商视觉 / 页面设计",
    metrics: ["年货节活动视觉", "主KV / 会场 / 商品主图", "多端视觉延展"],
    variant: "wide",
  },
];

export const mediaCollections = [
  {
    id: "brand",
    projectId: "brand-visual-upgrade",
    folder: "images/品牌视觉升级/",
    cover: "images/品牌视觉升级/品牌视觉升级主KV.webp",
  },
  {
    id: "performance",
    projectId: "performance-creative",
    folder: "images/核心产品投放图优化/",
    cover: "images/核心产品投放图优化/羊脂膏项目缩略图.webp",
  },
  {
    id: "douyin",
    projectId: "douyin-system",
    folder: "images/抖音视觉体系0-1/",
    cover: "images/抖音视觉体系0-1/抖音视觉0-1缩略图.webp",
  },
  {
    id: "3d",
    projectId: "3d-asset-library",
    folder: "images/战略新品3D高精度资产库/",
    cover: "images/战略新品3D高精度资产库/消毒柜新KV.webp",
  },
  {
    id: "campaigns",
    projectId: "category-upgrade",
    folder: "images/S级大促营销活动/",
    cover: "images/S级大促营销活动/年货节项目展示缩略图.webp",
  },
];

export const profileMedia = ["网站素材/个人工作场景、形象照.webp"];

export const experience = [
  {
    company: "苏州布布健康科技有限公司",
    role: "视觉设计师",
    period: "2025.07 - 2026.06",
    summary:
      "以数据驱动视觉迭代，统筹多平台设计、3D视觉资产、AI投放素材与抖音渠道视觉体系。",
  },
  {
    company: "上海璞康数据科技（集团）有限公司",
    role: "高级视觉设计",
    period: "2023.06 - 2025.04",
    summary:
      "搭建品牌电商视觉体系，推动品牌视觉升级，以 3D 与 AI 提高营销素材质量与生产效率。",
  },
  {
    company: "广州鑫莹荣精细化工有限公司",
    role: "视觉设计师",
    period: "2022.12 - 2023.03",
    summary:
      "负责天猫等平台视觉更新、产品主图与详情页优化，并使用 C4D 提升大促页面表现。",
  },
  {
    company: "广州迈兴旅行用品有限公司",
    role: "视觉设计师",
    period: "2020.05 - 2022.09",
    summary:
      "负责京东、唯品会、阿里等平台视觉更新、产品拍摄沟通与线下展会宣传设计。",
  },
  {
    company: "广州品玉文化传媒服务有限公司",
    role: "平面设计",
    period: "2018.04 - 2020.04",
    summary: "负责活动视觉、宣传海报、画册、消费券及线下物料设计。",
  },
];

export const capabilities = [
  {
    index: "01",
    title: "品牌与电商视觉",
    description: "品牌视觉体系、电商主图、详情页、活动页面、KV 与多平台视觉规范。",
    tools: "视觉策略 / Art Direction / E-commerce",
  },
  {
    index: "02",
    title: "3D 视觉生产",
    description: "产品建模、场景搭建、材质、灯光、渲染与高精度视觉资产沉淀。",
    tools: "Cinema 4D / Blender / Octane / Cycles",
  },
  {
    index: "03",
    title: "AI 创意工作流",
    description: "将 AI 生图、视频与提示词模板纳入品牌视觉生产，提高效率与一致性。",
    tools: "ChatGPT / Gemini / Midjourney / Runway",
  },
  {
    index: "04",
    title: "增长型视觉迭代",
    description: "结合投放与运营数据分析视觉表现，用点击率、转化率和 ROI 驱动迭代。",
    tools: "CTR / CVR / ROI / A/B Iteration",
  },
];

export const education = {
  school: "江西职业技术大学",
  degree: "大专 · 工业设计",
  period: "2013 - 2016",
};
