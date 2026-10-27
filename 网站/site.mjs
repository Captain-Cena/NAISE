import { fileURLToPath } from 'node:url';

export const siteDirectory = fileURLToPath(new URL('.', import.meta.url));
export const assets = {
  'logo.svg': new URL('../美术/交付/奶蛙科学与工程院LOGO_黑字.svg', import.meta.url),
  'crest.svg': new URL('../美术/交付/院徽.svg', import.meta.url),
  'hero.png': new URL('../美术/交付/网站主页/主视觉.png', import.meta.url),
  'members.png': new URL('../美术/交付/网站主页/成员介绍图标.png', import.meta.url),
  'research.png': new URL('../美术/交付/网站主页/科研成果图标.png', import.meta.url),
  'news.png': new URL('../美术/交付/网站主页/新闻速递图标.png', import.meta.url),
  'placeholder.png': new URL('../美术/交付/网站主页/捧腹大笑占位图.png', import.meta.url),
};

const sections = [
  { route: '/members', label: '成员介绍', title: 'NAISE 成员介绍', description: '认识我们的团队', image: 'members.png', theme: 'mint' },
  { route: '/research', label: '科研成果', title: '科研成果展示', description: '探索研究与思考', image: 'research.png', theme: 'cream' },
  { route: '/news', label: '新闻速递', title: '新闻速递', description: '关注团队动态', image: 'news.png', theme: 'gray' },
];

export const routes = ['/', ...sections.map(({ route }) => route)];

function navigation(currentPath) {
  return `<header class="site-header">
    <div class="header-inner container">
      <a class="brand" href="/" aria-label="NAISE 首页">
        <img src="/assets/logo.svg" alt="奶蛙科学与工程院 NAISE" width="3180" height="700">
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="打开导航菜单" hidden>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-navigation" aria-label="主导航">
        ${sections.map(({ route, label }) => `<a href="${route}"${route === currentPath ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>`;
}

function homepage() {
  return `<main id="main-content">
    <section class="hero" aria-labelledby="academy-title">
      <div class="hero-inner container">
        <div class="hero-copy">
          <p class="eyebrow">NAIWA ACADEMY</p>
          <h1>奶蛙科学与工程院</h1>
          <p class="academy-abbreviation" id="academy-title">NAISE</p>
          <div class="introduction">
            <p>五人跨学科研究团队</p>
            <p>在这里，分享思考与研究。</p>
          </div>
          <p class="motto">IN ABSTRACTION WE TRUST</p>
          <a class="primary-link" href="/members">认识 NAISE <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-art">
          <img src="/assets/hero.png" alt="五只奶蛙组成的 NAISE 团队：中央奶蛙捧腹大笑，其余奶蛙分别拿着芯片、盾牌、电脑和图表。" width="1536" height="1024" fetchpriority="high">
        </div>
      </div>
    </section>
    <section class="entry-grid container" aria-label="探索 NAISE">
      ${sections.map(({ route, title, description, image, theme }) => `<a class="entry-card ${theme}" href="${route}">
        <img class="entry-image" src="/assets/${image}" alt="" width="1254" height="1254" loading="lazy">
        <div class="entry-copy"><h2>${title}</h2><p>${description}</p></div>
        <span class="entry-arrow" aria-hidden="true">↗</span>
      </a>`).join('\n      ')}
    </section>
  </main>
  <footer class="site-footer container">
    <span class="footer-line" aria-hidden="true"></span>
    <img src="/assets/crest.svg" alt="NAISE 院徽" width="1254" height="1254">
    <p>NAISE · IN ABSTRACTION WE TRUST</p>
    <span class="footer-line" aria-hidden="true"></span>
  </footer>`;
}

function placeholder() {
  return `<main class="placeholder" id="main-content">
    <div class="placeholder-content">
      <img src="/assets/placeholder.png" alt="一只捧腹大笑的奶蛙" width="1254" height="1254" fetchpriority="high">
      <p>还没做好</p>
    </div>
  </main>`;
}

export function renderPage(pathname) {
  const route = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  if (!routes.includes(route)) return null;
  const section = sections.find((entry) => entry.route === route);
  const title = section ? `${section.label} · NAISE` : 'NAISE · 奶蛙科学与工程院';
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffe600">
  <meta name="description" content="NAISE 奶蛙科学与工程院，五人跨学科研究团队。在这里，分享思考与研究。">
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="/assets/crest.svg">
  <link rel="stylesheet" href="/styles.css">
  <script src="/menu.js" defer></script>
</head>
<body>
  ${navigation(route)}
  ${section ? placeholder() : homepage()}
</body>
</html>\n`;
}
