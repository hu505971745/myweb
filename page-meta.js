const descriptions = {
  home: "胡飞的视觉设计作品集，展示品牌视觉、电商营销、3D产品资产与AI创意工作流，以及从设计策略到成果交付的实践。",
  about: "了解胡飞的视觉设计经历、工作方法，以及品牌、电商、3D与AI创意领域的实践。",
  portfolio: "浏览胡飞的精选设计项目：品牌视觉升级、投放创意、抖音视觉体系、3D资产与大促营销活动。",
  stack: "品牌与电商视觉、3D视觉生产、AI创意工作流和增长型视觉迭代，为项目提供从策略到交付的设计能力。",
  contact: "联系胡飞，交流品牌视觉、电商营销、3D产品资产与AI创意设计需求。",
};
const titles = { home: "资深视觉设计师 · 品牌视觉与3D作品集", about: "关于", portfolio: "精选作品", stack: "设计能力", contact: "联系" };

export function updatePageMeta({ route, site, projects }) {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const project = parts[0] === "portfolio" && parts[1] ? projects.find(item => item.id === parts[1]) : null;
  const missing = (parts[0] === "portfolio" && parts[1] && !project) || (parts.length && !["portfolio", "about", "tech-stack", "contact"].includes(parts[0]));
  const title = missing ? `页面未找到 | ${site.name}` : project ? `${project.title} | ${site.name}` : route === "home" ? `${site.name} | ${titles.home}` : `${titles[route]} | ${site.name} · 资深视觉设计师`;
  const description = missing ? "该页面不存在，请返回胡飞的视觉设计作品集浏览项目。" : project?.summary || descriptions[route] || descriptions.home;
  document.title = title;
  const setMeta = (key, value, property = false) => {
    const attribute = property ? "property" : "name";
    let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
    if (!node) { node = document.createElement("meta"); node.setAttribute(attribute, key); document.head.append(node); }
    node.content = value;
  };
  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  const shareImage = new URL("./assets/site/share-card.png", document.baseURI).href;
  setMeta("og:image", shareImage, true);
  setMeta("twitter:image", shareImage);
  // All hash routes currently share one server document. Canonical names that
  // document; it must not pretend a hash fragment is a separate indexable page.
  const publicPage = new URL("./", document.baseURI).href;
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
  canonical.href = publicPage;
  setMeta("og:url", publicPage, true);
  setMeta("robots", missing ? "noindex, follow" : "index, follow");
}
