# 陈小薇 · 个人学术主页

面向 GitHub Pages 的响应式静态网站，无构建依赖。桌面与手机布局、研究方向筛选、键盘导航均已实现。

主页默认英文，可通过页首 **EN / 中文** 即时切换。中文版本可直接通过 `https://wdenxw.github.io/?lang=zh` 访问，切换语言保留当前成果筛选与页面位置。英文论文题名保留原文；中文成果在英文版展示译名和中文原题，检索仍使用原题。切换同时更新网页标题、描述与无障碍标签。

## 本地预览

在本目录执行：

```powershell
python -m http.server 8000
```

浏览器访问 http://localhost:8000 。不要直接双击 HTML：成果数据使用 fetch 读取，需要 HTTP 服务。

## 发布到 GitHub Pages

1. 登录 `wdenxw`，创建公开仓库 `wdenxw.github.io`：[创建仓库](https://github.com/new?name=wdenxw.github.io&description=Xiaowei%20Chen%20academic%20homepage&visibility=public)。
2. 将本目录文件上传到仓库的 `main` 分支，包含 `.github/workflows/pages.yml`。
3. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 进入 **Actions** 运行 `Deploy personal website to GitHub Pages`，或向 `main` 推送更新触发部署。
5. 工作流完成后访问 `https://wdenxw.github.io/`。

也可部署到普通项目仓库，地址为 `https://你的用户名.github.io/仓库名/`。站内资源均使用相对路径，兼容这两种形式。

## 更新内容

- `index.html`：姓名、单位、职称、介绍和研究方向。
- `i18n.js`：中英文界面文案，与 HTML 中的 `data-i18n` 对应。
- `publications.json`：成果题名、类型、标签和说明。`topics` 支持 `sensing`、`motion`、`signal`；`type` 支持 `paper`、`patent`。
- `descriptionEn` 为英文成果说明；中文成果的 `titleEn` 为英文译名。`title` 保留原始题名用于检索。
- `styles.css`：视觉样式及移动端布局。
- 新增或删除成果后，同时更新 `index.html` 中总数徽标、全部按钮的数量和初始结果数量。
- 目前成果链接是题名检索入口，不是全文下载或已核验的论文落地页。

## 数据来源与待补充项

用户提供的信息：陈小薇、福建师范大学讲师，及成果文件清单截图。

截图提供 7 个英文论文文件名和 3 个中文成果文件名。文件修改时间不能证明发表年份，因此页面未填发表年、作者顺序、期刊、会议、DOI 或引用数。中文文件名不足以确认申请/授权状态，页面标注信息待核实。RehabFAB 文件名在截图中截断，当前明确使用省略号标记。

GitHub 用户名：`wdenxw`。联系方式：`chenxw@fjnu.edu.cn`、`wdenxw@qq.com`。个人照片已按用户提供的原图保存在 `assets/xiaowei-chen.jpg`。

待提供：学院/团队、论文完整书目信息、专利编号及状态、可公开 PDF。未提供的信息未擅自编写。研究方向概述仅根据成果题名归纳。

## 使用网页上传（不安装 Git）

创建仓库时可勾选添加 README，随后点击 **Add file → Upload files**。将本项目的 `index.html`、`styles.css`、`script.js`、`i18n.js`、`publications.json`、`favicon.svg` 和 `assets` 文件夹拖入上传区域，提交到 `main`。确认照片路径为 `assets/xiaowei-chen.jpg`。

网页拖拽可能忽略隐藏目录。点击 **Add file → Create new file**，文件名输入 `.github/workflows/pages.yml`，复制本地同名文件的内容并提交。也可创建 `.nojekyll` 空文件。再按上面的 Pages 设置选择 GitHub Actions 并运行工作流。

## 使用 Git 上传

确保远端仓库未初始化其他文件；在本目录执行：

```powershell
git init -b main
git add .
git commit -m "Create Xiaowei Chen academic homepage"
git remote add origin https://github.com/wdenxw/wdenxw.github.io.git
git push -u origin main
```

首次推送可能要求登录 GitHub。项目远端为 `git@github.com:wdenxw/wdenxw.github.io.git`；向 `main` 推送更新后自动运行发布工作流。首次上线仍需在仓库设置中启用 GitHub Pages，并选择 GitHub Actions。
