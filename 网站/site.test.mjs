import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';

let server;
let base;
before(async () => {
  const { createSiteServer } = await import('./server.mjs');
  server = createSiteServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server?.close());

test('主页的导航、三个入口及主按钮都通向独立页面', async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<h1>奶蛙科学与工程院<\/h1>/);
  assert.equal([...html.matchAll(/href="\/members"/g)].length, 3);
  assert.equal([...html.matchAll(/href="\/research"/g)].length, 2);
  assert.equal([...html.matchAll(/href="\/news"/g)].length, 2);
});

for (const route of ['/members', '/research', '/news']) {
  test(`${route} 直接访问及尾斜杠只输出单只奶蛙和占位文字`, async () => {
    for (const url of [route, `${route}/`]) {
      const response = await fetch(base + url);
      assert.equal(response.status, 200);
      const html = await response.text();
      const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
      assert.equal([...main.matchAll(/<img /g)].length, 1);
      assert.match(main, /src="\/assets\/placeholder.png"/);
      assert.equal(main.replace(/<[^>]*>/g, '').trim(), '还没做好');
      assert.match(html, /href="\/" aria-label="NAISE 首页"/);
      assert.doesNotMatch(html, /<footer/);
    }
  });
}

test('素材及脚本返回正确类型，非法地址不会泄漏项目文件', async () => {
  for (const [url, type] of [['/assets/logo.svg', 'image/svg+xml'], ['/assets/hero.png', 'image/png'], ['/styles.css', 'text/css'], ['/menu.js', 'text/javascript']]) {
    const response = await fetch(base + url);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get('content-type').startsWith(type));
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  for (const url of ['/unknown', '/README.md', '/assets/../site.mjs', '/assets/%E0%A4%A']) {
    const response = await fetch(base + url);
    assert.ok([400, 404].includes(response.status));
  }
});

test('构建输出完整独立页面，预览不依赖开发素材目录', async () => {
  const { buildSite } = await import('./build.mjs');
  const { createSiteServer } = await import('./server.mjs');
  const output = await mkdtemp(path.join(tmpdir(), 'naise-build-'));
  let preview;
  try {
    await buildSite(output);
    for (const file of ['index.html', 'members/index.html', 'research/index.html', 'news/index.html', 'assets/logo.svg', 'assets/crest.svg', 'assets/hero.png', 'assets/members.png', 'assets/research.png', 'assets/news.png', 'assets/placeholder.png', 'styles.css', 'menu.js']) {
      assert.ok((await readFile(path.join(output, file))).length > 0);
    }
    preview = createSiteServer({ productionRoot: output });
    preview.listen(0, '127.0.0.1');
    await once(preview, 'listening');
    const previewBase = `http://127.0.0.1:${preview.address().port}`;
    for (const route of ['/', '/members', '/research/', '/news', '/assets/placeholder.png']) {
      assert.equal((await fetch(previewBase + route)).status, 200);
    }
    assert.equal((await fetch(previewBase + '/not-a-page')).status, 404);
  } finally {
    preview?.close();
    await rm(output, { recursive: true, force: true });
  }
});
