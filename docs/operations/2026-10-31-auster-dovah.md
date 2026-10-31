# Auster Dovah 资料接入

日期：2026-10-31（Asia/Shanghai）。目标仓库经用户确认由原链接改为 `Captain-Cena/NAISE`，基于该仓库 `main@b553a508a3c2b8c638e49221d2bfa3f799a2504e` 实施；交付分支为 `dev_temp`，通过 PR 供审阅和后续发布。

## 内容与数据

- `/members` 从栏目占位页扩展为五位成员目录；第四位显示用户确认的 `Auster Dovah`、“奶蛙金融与投资处”和用户原图。
- `/members/member-4` 显示姓名、部门、照片及基本信息、工作履历、研究领域、学术成果四栏。用户在本轮要求简介、邮箱、履历、研究领域和成果先留空，分别保存为 `null`，页面显示 `-`。
- `网站/members.json` 为成员顺序及个人字段的统一来源；`网站/member-profile.html` 为详情模板。个人字段以转义后的纯文本插入 HTML。后续编辑资料后需重启开发服务或重新构建。
- 目标仓库当前未有其他成员的正式资料，本轮保留其余四位空状态；没有将旧仓库中其他成员的资料迁入。首页正文保持目标仓库原样，科研成果、新闻保持现有占位。
- 头像 `美术/交付/成员介绍/auster-dovah.png` 为附件原图副本，1086×1448、2,064,743 字节，SHA-256 为 `eb2abc210957bfab4cdaddc17fc65464b8f074d1e3994650c828a91058ffb9a6`。CSS 适配显示范围，未修改图片字节。

## 验证

- Windows / Node v24.22.1：site、server、build、menu、members-scroll 五个语法检查通过；`node --test 网站/site.test.mjs` 11/11 通过。
- `node 网站/build.mjs` 成功；九个 HTML、三个 CSS/JS 和八个素材，共 20 个构建文件。
- 开发和构建服务的头像请求均返回 200、`image/png`，返回字节指纹与附件一致。
- Edge 156.0.4314.58，1280×900 和 390×844、减少动画模式：第四位照片加载、目录至详情跳转、详情尾斜杠访问正常，无横向溢出或页面脚本异常；其他个人字段保持空状态。首页 main 与 footer 的 HTML 与目标仓库基准逐字比较一致。
- 会话 outputs 中保留 `captain-auster-dovah-profile-desktop.png`、`captain-auster-dovah-profile-mobile.png`、两张目录卡片截图及 `captain-verification.json`；已读取实际截图检查布局。

本记录只说明源码实现和上述验证。GitHub 提交与 PR 结果以远端返回记录为准；不表示主分支已合并、生产网站已部署或完整跨浏览器验收通过。
