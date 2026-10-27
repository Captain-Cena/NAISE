import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assets, renderPage, routes, siteDirectory } from './site.mjs';

const types = { '.svg': 'image/svg+xml', '.png': 'image/png', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

export function createSiteServer({ productionRoot } = {}) {
  return createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end();
        return;
      }
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const route = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
      const headers = { 'X-Content-Type-Options': 'nosniff' };
      let content;
      let type;
      if (routes.includes(route)) {
        content = productionRoot
          ? await readFile(path.join(productionRoot, route.slice(1), 'index.html'))
          : renderPage(route);
        type = 'text/html; charset=utf-8';
      } else {
        let source;
        if (pathname === '/styles.css' || pathname === '/menu.js') {
          source = path.join(productionRoot || siteDirectory, pathname.slice(1));
        } else if (pathname.startsWith('/assets/') && Object.hasOwn(assets, pathname.slice(8))) {
          source = productionRoot ? path.join(productionRoot, pathname.slice(1)) : assets[pathname.slice(8)];
        }
        if (!source) {
          response.writeHead(404, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
          response.end(request.method === 'HEAD' ? undefined : '页面不存在');
          return;
        }
        content = await readFile(source);
        type = types[path.extname(pathname)];
      }
      response.writeHead(200, { ...headers, 'Content-Type': type });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
      const status = error instanceof URIError ? 400 : error.code === 'ENOENT' ? 404 : 500;
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : status === 400 ? '无效地址' : status === 404 ? '文件不存在' : '页面加载失败');
      if (status === 500) console.error(error);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const preview = process.argv.includes('--preview');
  const port = Number(process.env.PORT || (preview ? 4173 : 5173));
  const host = process.env.HOST || '127.0.0.1';
  const server = createSiteServer({ productionRoot: preview ? path.join(siteDirectory, 'dist') : undefined });
  server.on('error', (error) => {
    console.error(error.code === 'EADDRINUSE' ? `端口 ${port} 已被占用，可使用 PORT=5174 npm run ${preview ? 'preview' : 'dev'}。` : error.message);
    process.exitCode = 1;
  });
  server.listen(port, host, () => console.log(`NAISE ${preview ? '构建预览' : '本地开发'}：http://${host}:${port}`));
}
