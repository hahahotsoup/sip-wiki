# CLI 模式

```bash
sip -l                  # 列出所有订阅源
sip -l 1                # 列出 1 号源的文章（编号格式 [列表序号/真实ID]）
sip -d https://xxx/rss  # 下载新 RSS 源
sip -u 1                # 更新第 1 个源
sip -a 1                # 归档（加时间戳）
sip -una 1              # 去归档
sip -r 1                # 删除订阅源
sip -h                  # 帮助
sip --lang en-US -l     # 切换英文界面
```

**全屏阅读**：`sip --show <文章编号>` 打开一个无侧栏的全屏阅读界面（Markdown 渲染正文），底部提示 **「按 W 进入完整阅读器 · 按 Esc 退出」**——按 `W` 无缝切入完整 TUI（并定位到当前文章），按 `Esc`/`Q` 返回命令行。

**AI 读原文**：`sip --show <文章编号> --json` 把文章的标题/来源/链接/发布时间/作者 + **原始正文**（不做任何渲染）以 JSON 打到标准输出，供 AI 或脚本读取，例如 `sip --show 42 --json --lang en-US --ignoresafeannouncement`。若该文抓取过全文，JSON 还会带 **`fulltext`** 字段（纯文本正文，比 RSS 摘要完整，AI 优先用它回答）。

**版本追踪与 Diff**：

```bash
sip --versions 42            # 列出 42 号文章的全部历史版本（含状态与时间）
sip --show 87 --json         # 87 可能是某个历史版本的 ID，照样能读原文
sip --diff 42                # 对比最近两版的正文变化
sip --diff 42 v1 v3 --json   # 指定两个版本，结构化输出 {from, to, changes:[{type,before,after}]}
```

> `--versions` 传的是 `--show`/`--grep` 结果里的**全局文章 ID**；每个版本是独立的数据库行、各有自己的 ID。文章只有一版时输出提示（退出码 0，不算错误）。`-l <源编号>` 列表里的编号是 `[列表序号/真实ID]` 双格式，用 `--show`/`--versions`/`--summary` 等命令时取**右边**的真实 ID。

## 参数总表

| 短参数 | 长参数 | 说明 |
|--------|--------|------|
| `-l` | `--list` | 列出所有订阅源；带编号则列出该源的文章（`-l --json` / `-l 1 --json` 结构化输出，含健康状态与内容质量；`-l 1 --limit 20` 限制输出条数）。编号格式 `[列表序号/真实ID]`，`--show/--versions/--summary` 等命令用右边的真实 ID |
| `-d` | `--download` | 下载新的 RSS 源（URL 可省略 http/https 前缀，自动补全） |
| `-u` | `--update` | 更新指定订阅源（编号） |
| `-a` | `--archive` | 归档当前快照（加时间戳） |
| `-una` | `--unarchive` | 去归档（检查同名冲突） |
| `-r` | `--remove` | 删除订阅源及其全部文章与向量（加 `--yes`/`-y` 跳过确认，供脚本/AI 非交互使用） |
| `--show <编号>` | | 全屏阅读（无侧栏，`W` 进完整 TUI、`Esc` 退出）；加 `--json` 输出未渲染原文 JSON 给 AI/脚本 |
| `--versions <编号>` | | 列出文章的全部历史版本（含状态与时间，`--json` 结构化）；想看某版原文用 `--show <该版本的编号>` |
| `--diff <编号> [vA vB]` | | 对比文章两个版本的正文（默认最近两版）；`--json` 结构化输出给 AI |
| `--export <编号 \| feed:N \| all> [out.md\|目录]` | | 把文章导出为 Markdown（`--export-all` 前会确认，`--yes` 跳过） |
| `--fulltext <编号>` | | 抓取文章全文到本地缓存（首次需同意；`--yes` 跳过同意/确认，`--json` 结构化）；`--purge-fulltext [编号]` 清缓存 |
| `--feed-info <编号>` | | 来源身份与健康：名称/类型/作者/官网/更新时间/最近文章/状态（`--json` 结构化） |
| `--export-opml [文件]` | | 导出全部订阅源为 OPML（默认 `feeds.opml`） |
| `--import-opml <文件>` | | 从 OPML 批量导入订阅源（按 FeedUrl 跳过已存在） |
| `--like <编号> [--ai [理由]]` | | 标记文章：用户点赞（♥）或 AI 判断（🤖）；`--likes [--json]` 查看全部标记 |
| `--today [--json] [--refresh] [--quick N]` | | 今日阅读清单（规则式选文，上限=目标 5 篇；含预估时长与理由）。**一天固定一碗**（当日缓存，新文章当天不自动进清单）；`--refresh` 显式重新生成；要当天新内容可直接 `--grep`/`--show`；开启苏暖泉（Sumenia）后可跟踪完成进度 |
| `--sync [--feed N] [--json]` | | 只更新「到期」的订阅源（可选 `--feed 编号` 限定单个；`--json` 结构化） |
| `--update-all` | | 强制更新所有订阅源（等价 TUI 的 `F6`） |
| `--schedule <编号> <表达式>` | | 设置某源更新计划（详见 [更新调度](/使用/调度)）：`30m` / `1h` / `7d` / `daily@10:00` / `weekly@Mon 08:00` / `manual` |
| `--purge-fulltext [编号]` | | 清除全文缓存（不传编号 = 全清，详见 [全文抓取](/使用/全文)） |
| `telemetry status\|show\|enable\|disable\|clear\|export` | | 本地阅读遥测**苏暖泉（Sumenia）**的查看/开关/删除/导出（默认关闭，详见 [Telemetry 与隐私](/参考/遥测)） |
| `--init` / `--config` / `--index` / `--reindex` / `--search` / `--grep` / `--summary` | | AI 相关命令，见 [AI 命令](/使用/AI) |
| `--insights [--interval]` | | 阅读情况报告：按源呈现阅读事实（打开/读完/完成率/♥🤖点赞/订阅积压）+ 可解释原因（无黑盒评分）；`--insights-interval` 定时提醒。需遥测开启 |
| `--dedup <scan\|hide-cluster\|hide\|list\|undo>` | | 跨源去重：按段落重合度识别「可能同文」（输出**重复簇**，v1.1.4 起无配对爆炸）；`hide-cluster <代表Id>` 一键隐藏整簇、`hide <hiddenId> <canonicalId>` 单篇隐藏（数据保留）、`undo <key>` 撤销、`list` 查看 |
| `--policy <action> --feed <编号>` | | Source Policy（v1.1）：`lower_frequency` / `archive` / `tag` / `keep` / `unsubscribe`；规则经你确认（`createdBy: user`），AI 永不自动写 |
| `--onboarding` | | Onboarding（v1.1）：按领域（AI / 开发 / 科技公司）一键添加推荐源；`templates.json` 可编辑 |
| `ingest --stdin [--origin <url>] [--producer <name>] [--title <t>] [--ttl <days>] [--yes]` | | 把管道输入存为**证据**（v1.2 证据库） |
| `ingest --url <url> [--ttl <days>] [--yes]` | | 网页直存为 watch 监视（首快照，SSRF 防护） |
| `ingest --evidence <file\|--stdin>` | | 导入 `sip-evidence-v1` 证据包（schema 校验） |
| `ingest list [--stale] [--group N]` / `show <id>` / `confirm <id>` / `rm <id> [--yes]` | | 浏览 / 详情 / 核实 / 遗忘（轻存易删） |
| `ingest refresh [id \| --stale \| --all]` | | 重新抓取保鲜（默认只刷过期的 watch 目标） |
| `ingest group add <label> [--seed <query>] \| rename <N> <new> \| rm <N>` / `groups` | | 主题分组（需 AI embedding 配置；主题由你定义） |
| `ingest retrieve <query> [--top N] [--group N]` | | 证据随行检索（原文片段/来源/版本/新鲜度/核实/共识/分级/反转，供 Agent 使用） |
| `ingest ask <question>` | | 只从你的证据回答——**只摘录、不转述**（quote verbatim, never paraphrase） |
| `simon status\|level <1\|2\|3>\|export-key <file>\|import-key <file>` | | 安全守护**孟思琳（simon）**：默认开启、无法关闭、只能调节挡位；2=非交互禁破坏性写，3=非交互禁全部写 + 数据加密；**降挡只能在 TUI 命令栏**；密钥自动存系统凭据库（详见 [安全](/参考/安全)） |
| `-h` | `--help` | 显示帮助 |

> v1.1 新增：`--dedup`（跨源去重）、`--policy`（Source Policy）、`--insights` / `--insights-interval`（阅读报告）、`--onboarding`（推荐源模板）；v1.2 新增：`ingest`（证据库，详见[概念 · 证据库](/了解/概念#_7-证据库-ingest)）。详见[概念总览](/了解/概念)。
> 全局参数：`--ignoresafeannouncement`（跳过安全横幅等多余输出，供脚本/AI 使用）、`--lang <代码>`（切换语言，如 `--lang en-US`）。输出一律 UTF-8。

## 退出码（脚本 / AI 判断成败）

CLI 命令成功时退出码为 `0`，失败时按类别返回非零退出码：

| 退出码 | 含义 |
|--------|------|
| `0` | 成功（含正常取消，如 `-r` 确认时回答 n） |
| `1` | 通用错误（参数/用法错误、未知命令、数据库错误、部分更新失败） |
| `2` | 网络 / 服务不可达（`NETWORK_ERROR`、`MODEL_UNAVAILABLE`、下载超时） |
| `3` | 资源未就绪（AI 未配置、API Key 缺失/无效、`NO_INDEX`、源/文章不存在、空查询） |

> `--json` 模式下错误仍会先输出结构化 `{"success": false, "error": {...}}`，再以对应的非零退出码退出。
