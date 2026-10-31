import { readFileSync } from 'node:fs';
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
  'auster-dovah.png': new URL('../美术/交付/成员介绍/auster-dovah.png', import.meta.url),
};

const sections = [
  { route: '/members', label: '成员介绍', title: 'NAISE 成员介绍', description: '认识我们的团队', image: 'members.png', theme: 'mint' },
  { route: '/research', label: '科研成果', title: '科研成果展示', description: '探索研究与思考', image: 'research.png', theme: 'cream' },
  { route: '/news', label: '新闻速递', title: '新闻速递', description: '关注团队动态', image: 'news.png', theme: 'gray' },
];

const members = JSON.parse(readFileSync(new URL('./members.json', import.meta.url), 'utf8'));
const profileTemplate = readFileSync(new URL('./member-profile.html', import.meta.url), 'utf8');
export const routes = ['/', ...sections.map(({ route }) => route), ...members.map(({ id }) => `/members/${id}`)];

function text(value) {
  return String(value ?? '-').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function profile(member) {
  return profileTemplate.replace(/\{\{(\w+)\}\}/g, (_, field) => text(member[field]));
}

function memberDirectory() {
  const themes = ['mint', 'cream', 'blue', 'sand', 'sage'];
  return `<main id="main-content">
    <section class="members-banner" aria-labelledby="members-title">
      <div class="members-banner-inner container">
        <div class="members-banner-copy">
          <p class="members-kicker">NAISE · OUR PEOPLE</p>
          <h1 id="members-title">成员介绍</h1>
          <p>不同的专业，同一份好奇心。</p>
        </div>
        <img class="members-banner-art" src="/assets/members.png" alt="五只奶蛙组成的团队群像" width="1254" height="1254">
      </div>
    </section>
    <div class="members-breadcrumb container"><a href="/">首页</a><span aria-hidden="true">›</span>成员介绍</div>
    <section class="members-directory container" aria-labelledby="members-directory-title">
      <div class="members-intro">
        <p class="members-kicker">MEET THE TEAM</p>
        <h2 id="members-directory-title">认识 NAISE 的成员</h2>
        <p>向下浏览，逐个认识五位成员。</p>
      </div>
      <div class="members-stream">
        ${members.map((member, index) => `<a class="member-entry" href="/members/${text(member.id)}" data-reveal aria-label="查看 ${text(member.name ?? `第 ${index + 1} 位成员`)} 的成员介绍">
          <span class="member-portrait ${themes[index]}${member.id === 'member-4' ? ' auster' : ''}"><img src="/assets/${text(member.portrait ?? 'placeholder.png')}" alt="${member.name ? `${text(member.name)} 的奶蛙个人照` : '奶蛙示意头像'}" width="${text(member.portraitWidth ?? 1254)}" height="${text(member.portraitHeight ?? 1254)}" loading="lazy"></span>
          <span class="member-copy">
            <span class="member-role">${text(member.department)}</span>
            <span class="member-name">${text(member.name)}</span>
            <span class="member-rule" aria-hidden="true"></span>
            <span class="member-description">${text(member.introduction)}</span>
            <span class="member-link">查看成员介绍 ↗</span>
          </span>
        </a>`).join('\n        ')}
      </div>
    </section>
  </main>
  <footer class="site-footer container">
    <span class="footer-line" aria-hidden="true"></span>
    <img src="/assets/crest.svg" alt="NAISE 院徽" width="1254" height="1254">
    <p>NAISE · IN ABSTRACTION WE TRUST</p>
    <span class="footer-line" aria-hidden="true"></span>
  </footer>`;
}

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
  const member = members.find(({ id }) => route === `/members/${id}`);
  const section = sections.find((entry) => entry.route === (member ? '/members' : route));
  const title = member?.name ? `${member.name} · NAISE` : section ? `${section.label} · NAISE` : 'NAISE · 奶蛙科学与工程院';
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffe600">
  <meta name="description" content="NAISE 奶蛙科学与工程院，五人跨学科研究团队。在这里，分享思考与研究。">
  <title>${text(title)}</title>
  <link rel="icon" type="image/svg+xml" href="/assets/crest.svg">
  <link rel="stylesheet" href="/styles.css">
  <script src="/menu.js" defer></script>
  ${route === '/members' ? '<script src="/members-scroll.js" defer></script>' : ''}
</head>
<body>
  ${navigation(member ? '/members' : route)}
  ${route === '/members' ? memberDirectory() : member?.name ? profile(member) : section ? placeholder() : homepage()}
</body>
</html>\n`;
}
