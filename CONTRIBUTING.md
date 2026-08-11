# 贡献指南

欢迎为 **sip 文档站**（本仓库 `sip-wiki`）贡献内容或代码！任何帮助都让文档更完善 🍲

## 目录结构

```
├── docs/                  # 文档源（Markdown）
│   ├── .vitepress/        # 站点配置
│   │   ├── config.mts     # VitePress 配置（导航/侧边栏/编辑链接）
│   │   ├── teek-config.mts# Teek 主题配置
│   │   └── theme/index.ts # 主题入口
│   ├── index.md           # 首页
│   ├── guide/             # 指南
│   ├── usage/             # 使用说明
│   ├── features/          # 功能
│   ├── structure.md       # 项目结构
│   └── testing.md         # 测试报告
└── package.json
```

## 本地开发

```sh
npm install
npm run dev       # 启动本地预览 http://localhost:5173
npm run build     # 构建静态站到 docs/.vitepress/dist
npm run preview   # 预览构建产物
```

## 如何贡献

### 方式一：直接编辑（推荐，最轻量）

1. 打开任一文档页面，点击右下角 **「在 GitHub 上编辑此页」**
2. GitHub 自动 fork 仓库并打开编辑框
3. 修改后点 **Commit changes** 创建 PR
4. 等待审查与合并

### 方式二：本地 fork + PR

```sh
git clone https://github.com/hahahotsoup/sip-wiki.git
cd sip-wiki
git checkout -b fix/your-branch
# 修改内容...
npm run build   # 确认构建通过
git add .
git commit -m "fix: 描述改动"
git push origin fix/your-branch
# 在 GitHub 上发起 PR
```

## 写作约定

- 文档用中文撰写；代码/命令保持原样
- 新增页面记得在 `docs/.vitepress/config.mts` 的 `nav` / `sidebar` 登记
- 页面内相对链接以 `/guide/xxx` 形式，不要用绝对路径
- 提交前先 `npm run build`，确保无报错

## 分支与发布

- `main` 分支为发布分支，任何改动以 PR 合并
- 合并到 `main` 后，**Cloudflare Pages** 自动检测并构建部署（也可在 CF Dashboard 手动触发）

## 问题与讨论

遇到问题请到仓库 [Issues](https://github.com/hahahotsoup/sip-wiki/issues) 提问。
