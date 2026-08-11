# 接入 QQ / 微信 / Discord / Telegram 机器人

> 让 sip 成为一个「会说话的助手」：通过本地 AI Agent（**OpenClaw**，或用 **Cherry Studio**），把 sip 挂到 QQ、微信、Discord、Telegram 上——你在群里 @ 它，它用 `sip` 的检索/摘要能力，只从你信任的源回答问题。
>
> **英文版**：[English](/en/usage/bot-integration.html) · 官方文档：[OpenClaw](https://docs.openclaw.ai) · [Cherry Studio](https://cherry-ai.com)

---

## 原理总览

```
用户(QQ/微信/Discord/Telegram)
        │ 发消息
        ▼
   本地 Agent 框架（OpenClaw Gateway / Cherry Studio）
        │ 理解意图 → 调用工具
        ▼
   sip 命令行（sip.exe，本地单文件）+ sip-rss skill
        │
        ▼
   你订阅的可信 RSS 源（SQLite + 文件缓存）
```

**核心**：喂给 Agent 三样东西——**系统提示词**、**独立的 `sip.exe`**、以及 **`sip-rss` skill**。Agent 从此只通过 `sip` 检索信息，引用永远来自白名单。

---

## 准备：把 sip 喂给 AI

### 1. 独立的 `sip.exe`

从 [Releases](https://github.com/hahahotsoup/sipintui/releases) 下载当前平台单文件 `sip.exe`（无需解压/装一堆 dll），放到固定路径，例如：

```text
C:\tools\sip\sip.exe        # Windows
~/tools/sip/sip            # macOS / Linux
```

首次运行 `sip.exe --help` 生成数据目录 `readwithhotsoup/`，并先配好订阅源与（可选）AI 配置。

### 2. `sip-rss` skill

仓库里自带一份 AI 技能文件，直接喂给 Agent 即可：

- 源码：`.opencode/skills/sip-rss/SKILL.md`
- 或从 [Releases](https://github.com/hahahotsoup/sipintui/releases) 下载 `sip-skill.zip`

把它放进 Agent 的技能目录（OpenClaw 的 `~/.openclaw/skills/`、Cherry Studio 的「技能/Agent」配置），Agent 就知道怎么调用 sip。

### 3. 系统提示词（可直接复制）

> 一份**开箱即用的完整人格提示词**已随仓库提供——**苏暖泉（Sumenia）**，一个安静温柔、服务 sip 阅读的软萌 AI 助手，含人格设定、sip 命令速查、检索策略与使用原则：
>
> - 中文：[`prompts/sumenia.md`](https://github.com/hahahotsoup/sipintui/blob/main/prompts/sumenia.md)
> - English: [`prompts/sumenia.en.md`](https://github.com/hahahotsoup/sipintui/blob/main/prompts/sumenia.en.md)
>
> 直接把文件内容粘贴为 Agent 的 system prompt 即可。下面是一个可直接复制的通用精简提示词：

```text
你是基于 sip 的可信信息助手。

可用能力：
- 可调用本机命令行工具 sip（路径：C:\tools\sip\sip.exe），并使用 sip-rss 技能
- 你只使用 sip 返回的信息，绝不凭空编造来源

规则：
1. 查资料先跑 sip --search "关键词" --json，只引用返回的可信源
2. 汇总时注明每条信息来源与链接
3. 遇到不确定的内容，明说"未查到"，不要编造
4. 优先 --json 输出，避免解析失败
5. 网络/AI 报错时如实转述错误码（2=网络错误，3=资源未就绪）

常用命令：
  sip -l                     # 列出订阅源
  sip --search "话题" --json  # 语义检索（需先 sip --init 配 AI）
  sip --grep "词"            # 全文检索（不依赖 AI）
  sip --show <id> --json     # 读取文章原文
  sip --summary <id>         # 生成摘要
  sip --today                # 今日哈汤
```

> 把 `<路径>` 换成你的实际 `sip.exe` 路径。

---

## 方式 A：OpenClaw（推荐，原生多平台 bot）

OpenClaw 是本地运行的个人 AI 助手，通过一个 Gateway 连接模型、工具、消息渠道与你的设备。**Telegram、Discord 原生支持**；QQ、微信可通过第三方桥接接入（见下文「QQ/微信」）。

### 安装

```bash
# Windows（PowerShell）
iwr -useb https://openclaw.ai/install.ps1 | iex

# macOS / Linux / WSL2
curl -fsSL https://openclaw.ai/install.sh | bash
```

已有 Node.js（22.22.3+ / 24.15+ / 25.9+）也可：`npm install -g openclaw@latest`

### 初始化

```bash
openclaw onboard --install-daemon   # 校验模型、创建工作区、配置 Gateway
openclaw gateway status             # 查看 Gateway 状态
openclaw dashboard                  # 打开控制台，发条消息验证
```

### 接入渠道（Channel）

| 渠道 | 支持 | 说明 |
|------|------|------|
| **Telegram** | ✅ 原生 | 在 [BotFather](https://t.me/BotFather) 建 bot 拿 token，配进 Gateway |
| **Discord** | ✅ 原生 | 在 Developer Portal 建 bot，拿 token，配进 Gateway |
| **QQ** | ⚠️ 桥接 | 用 OneBot / go-cqhttp / NapCat 等把 QQ 转成可用网关 |
| **微信** | ⚠️ 桥接 | 用 Wechaty / 微信机器人桥接方案接入 |

配置见 OpenClaw 官方 [Channels](https://docs.openclaw.ai/channels) 文档。

### 把 sip 接进 OpenClaw

1. 把 `sip.exe` 放进 PATH，或记录绝对路径；
2. 把 `sip-rss` skill 放入 `~/.openclaw/skills/`；
3. 把上面的**系统提示词**写入 OpenClaw 的助手设定 / 主 session 的 system prompt。

> **安全提示**：OpenClaw 默认把不认识的私聊发送者配对后才能通信；工具在宿主机执行。接入多人前务必读一遍 [安全指南](https://docs.openclaw.ai/gateway/security)。`sip` 全本地、只读你订阅的源，把私密配置（AI Key 在系统凭据库）与多人 bot 分开，别暴露 Gateway 公网。

---

## 方式 B：Cherry Studio（桌面助手）

Cherry Studio 是本地桌面 LLM 客户端，支持多模型、MCP 与自定义 Agent/技能。它本身不是 bot 框架，但很适合「本地对话即查即答」。

1. 安装 Cherry Studio，配置你的模型提供商；
2. 新建一个 **Agent/技能**，粘贴上面的**系统提示词**；
3. 让 Agent 能调用 `sip.exe`（配置为命令行工具 / MCP，或直接用 `sip --json` 的 shell 命令）；
4. 在对话里直接问，它会调用 sip 检索。

---

## 验证示例

接入后，在你的群里发：

```
@bot 最近两天有哪些值得读的 RSS 更新？
```

Agent 会执行 `sip --today --json` / `sip --search` 返回可信摘要并附来源链接。

```
@bot 帮我查一下 "LLM Agent" 相关的文章
```

Agent 执行 `sip --search "LLM Agent" --json`，只引用你订阅的源。

---

## 常见问题

- **`sip --search` 报「AI 未配置」**：先 `sip --init` 配置模型；没向量索引就跑 `sip --index`。
- **机器人不理我**：确认 Gateway 运行、渠道 token 有效、消息触发了 Agent。
- **引用到了我不想看的源**：删除订阅源，白名单即你维护的源列表。
- **想只读全文**：`sip --show <id> --json` 输出未渲染原文给 Agent。
