import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assets, renderPage, routes, siteDirectory } from './site.mjs';

export async function buildSite(output = path.join(siteDirectory, 'dist')) {
  await mkdir(path.join(output, 'assets'), { recursive: true });
  for (const route of routes) {
    const directory = path.join(output, route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), renderPage(route));
  }
  for (const filename of ['styles.css', 'menu.js', 'members-scroll.js']) {
    await copyFile(path.join(siteDirectory, filename), path.join(output, filename));
  }
  for (const [name, source] of Object.entries(assets)) {
    await copyFile(source, path.join(output, 'assets', name));
  }
  return output;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`构建完成：${await buildSite()}`);
}
