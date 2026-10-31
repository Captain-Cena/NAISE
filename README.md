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
- Auster Dovah 详情：`/members/member-4`
- 科研成果：`/research`
- 新闻速递：`/news`

成员目录展示五个成员位置，第四位为 Auster Dovah，部门为奶蛙金融与投资处，头像使用本人提供的原图。其他成员和未提供的个人字段保留空状态；科研成果、新闻速递继续展示捧腹大笑奶蛙和“还没做好”。全部页面共用顶部导航。

姓名、部门、照片引用和个人字段集中在 `网站/members.json`，顺序决定目录位置。简介、邮箱、工作履历、研究领域和学术成果暂存为 `null`，页面显示 `-`，后续有确认内容后再补充。详情版式位于 `网站/member-profile.html`。修改资料后需重启本地服务或重新构建。开发分支使用 `dev_temp`，通过 PR 审阅后再安排合并和部署；构建通过不代表已经上线。

检查及生成独立静态文件：

```sh
npm run check
npm run build
npm run preview
```

构建结果在 `网站/dist/`，包含九个页面、三个 CSS/JS 文件和八个素材，共 20 个文件。预览地址为 <http://127.0.0.1:4173>，页面支持直接访问和刷新。

如端口被占用，可使用 `PORT=5174 npm run dev`。如需用同一局域网内的手机查看，执行 `HOST=0.0.0.0 npm run dev`，再在手机浏览器中打开电脑的局域网 IP 加 `:5173`。

## 网站文件

- `网站/site.mjs`：页面内容、共用导航、路由和素材对应关系。
- `网站/members.json`：成员顺序、姓名、部门、照片与个人字段。
- `网站/member-profile.html`：个人详情页模板。
- `网站/members-scroll.js`：成员目录滚动显隐，支持减少动画偏好。
- `网站/styles.css`：桌面与移动端布局。
- `网站/menu.js`：移动端菜单交互。
- `网站/server.mjs`：本地服务和构建预览。
- `网站/build.mjs`：生成独立静态站点。
- `网站/site.test.mjs`：页面路由、素材请求和构建集成检查。

页面直接使用 `美术/交付/` 内既有 SVG 和 PNG；开发时读取原件，构建时复制到输出目录，原始素材保持不变。
