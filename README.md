# NAISE

NAISE,short for Naiwa Academy of Interdisciplinary Science and Engineering,is a NICE five-person Naiwa research institution.We'll share the thoughts of us and integrate other's achievements here (keep laughing…

五位成员的专业分别为：两位微电子、一位网络安全、一位商科、一位计算机科学（CS）。

格言：IN ABSTRACTION WE TRUST

## 网站本地运行

需要 Node.js 18 或更新版本，无需安装依赖。在项目根目录执行：

```sh
npm run dev
```

打开 <http://127.0.0.1:5173>。修改页面、样式或脚本后刷新浏览器即可查看。

- 主页：`/`
- 成员介绍：`/members`
- 科研成果：`/research`
- 新闻速递：`/news`

三个入口页目前只展示捧腹大笑奶蛙和“还没做好”，共用顶部导航。

检查及生成独立静态文件：

```sh
npm run check
npm run build
npm run preview
```

构建结果在 `网站/dist/`，包含四个页面和全部所需素材。预览地址为 <http://127.0.0.1:4173>，三个入口支持直接访问和刷新。本次不发布上线。

如端口被占用，可使用 `PORT=5174 npm run dev`。如需用同一局域网内的手机查看，执行 `HOST=0.0.0.0 npm run dev`，再在手机浏览器中打开电脑的局域网 IP 加 `:5173`。

## 网站文件

- `网站/site.mjs`：页面内容、共用导航、路由和素材对应关系。
- `网站/styles.css`：桌面与移动端布局。
- `网站/menu.js`：移动端菜单交互。
- `网站/server.mjs`：本地服务和构建预览。
- `网站/build.mjs`：生成独立静态站点。
- `网站/site.test.mjs`：页面路由、素材请求和构建集成检查。

页面直接使用 `美术/交付/` 内既有 SVG 和 PNG；开发时读取原件，构建时复制到输出目录，原始素材保持不变。
