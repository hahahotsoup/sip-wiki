# Connect QQ / WeChat / Discord / Telegram bots

> Turn sip into a "chatty assistant": via a local AI agent (**OpenClaw**, or **Cherry Studio**), attach sip to QQ, WeChat, Discord, and Telegram — mention it in a group, and it uses sip's search/summary abilities to answer only from sources you trust.
>
> **中文版**：[简体中文](/使用/Bot.html) · Official docs: [OpenClaw](https://docs.openclaw.ai) · [Cherry Studio](https://cherry-ai.com)

---

## How it fits together

```
User (QQ / WeChat / Discord / Telegram)
        │ send message
        ▼
  Local agent framework (OpenClaw Gateway / Cherry Studio)
        │ understand intent → call tool
        ▼
  sip CLI (sip.exe, local single-file) + sip-rss skill
        │
        ▼
  Your subscribed trusted RSS sources (SQLite + file cache)
```

**Core**: feed the agent three things — a **system prompt**, the **standalone `sip.exe`**, and the **`sip-rss` skill**. The agent then only retrieves via `sip`, and every citation comes from the whitelist.

---

## Prep: hand sip to the AI

### 1. Standalone `sip.exe`

Download the single-file `sip.exe` for your platform from [Releases](https://github.com/hahahotsoup/sipintui/releases) (no unzip / pile of DLLs), and place it at a fixed path, e.g.:

```text
C:\tools\sip\sip.exe        # Windows
~/tools/sip/sip            # macOS / Linux
```

Run `sip.exe --help` once to create the `readwithhotsoup/` data dir, then add your sources and (optionally) configure AI.

### 2. The `sip-rss` skill

The repo ships an AI skill file you can feed directly to an agent:

- Source: `.opencode/skills/sip-rss/SKILL.md`
- Or download `sip-skill.zip` from [Releases](https://github.com/hahahotsoup/sipintui/releases)

Put it into your agent's skill directory (OpenClaw's `~/.openclaw/skills/`, Cherry Studio's "Skills/Agent" config), and the agent will know how to call sip.

### 3. System prompt (copy as-is)

> A **ready-to-use full persona prompt** ships with the repo — **Sumenia (苏暖泉)**, a quiet, gentle AI assistant that serves sip reading, including personality, sip command cheat sheet, search strategy, and usage principles:
>
> - 中文: [`prompts/sumenia.md`](https://github.com/hahahotsoup/sipintui/blob/main/prompts/sumenia.md)
> - English: [`prompts/sumenia.en.md`](https://github.com/hahahotsoup/sipintui/blob/main/prompts/sumenia.en.md)
>
> Just paste the file contents as the agent's system prompt. Below is a concise generic prompt you can copy:

```text
You are a trusted information assistant based on sip.

Capabilities:
- You can invoke the local CLI tool sip (path: C:\tools\sip\sip.exe) and use the sip-rss skill
- You only use information returned by sip; never invent sources

Rules:
1. To research, first run sip --search "keyword" --json, and cite only the returned trusted sources
2. When summarizing, note the source and link of each item
3. If unsure, say "not found" plainly; do not fabricate
4. Prefer --json output to avoid parse failures
5. On network/AI errors, relay the error code honestly (2 = network error, 3 = resource not ready)

Common commands:
  sip -l                     # list sources
  sip --search "topic" --json # semantic search (run sip --init to configure AI first)
  sip --grep "word"          # full-text search (no AI needed)
  sip --show <id> --json     # read an article's raw body
  sip --summary <id>         # generate a summary
  sip --today                # today's hot soup
```

> Replace `<path>` with your actual `sip.exe` location.

---

## Option A: OpenClaw (recommended, native multi-platform bots)

OpenClaw is a local personal AI assistant that connects models, tools, messaging channels, and your devices through one Gateway. **Telegram and Discord are natively supported**; QQ and WeChat can be bridged through third-party adapters (see "QQ / WeChat" below).

### Install

```bash
# Windows (PowerShell)
iwr -useb https://openclaw.ai/install.ps1 | iex

# macOS / Linux / WSL2
curl -fsSL https://openclaw.ai/install.sh | bash
```

Already on Node.js (22.22.3+ / 24.15+ / 25.9+)? Install the package instead: `npm install -g openclaw@latest`

### Initialize

```bash
openclaw onboard --install-daemon   # verify models, create workspace, configure Gateway
openclaw gateway status             # check Gateway status
openclaw dashboard                  # open the control UI, send a message to verify
```

### Connect channels

| Channel | Support | Notes |
|---------|---------|-------|
| **Telegram** | ✅ Native | Create a bot via [BotFather](https://t.me/BotFather), grab the token, configure into the Gateway |
| **Discord** | ✅ Native | Create a bot in the Developer Portal, grab the token, configure into the Gateway |
| **QQ** | ⚠️ Bridged | Use OneBot / go-cqhttp / NapCat to expose QQ through a usable gateway |
| **WeChat** | ⚠️ Bridged | Use Wechaty or a WeChat bot bridge |

See the official [Channels](https://docs.openclaw.ai/channels) docs for setup.

### Wire sip into OpenClaw

1. Add `sip.exe` to PATH, or record its absolute path;
2. Put the `sip-rss` skill into `~/.openclaw/skills/`;
3. Put the **system prompt** above into OpenClaw's assistant settings / main session system prompt.

> **Security**: OpenClaw pairs unknown DM senders by default before responding; tools run on the host. Read the [security guide](https://docs.openclaw.ai/gateway/security) before adding many users. sip is fully local and only reads your subscribed sources — keep private config (AI key in the OS credential store) separate from multi-user bots, and don't expose the Gateway to the public internet.

---

## Option B: Cherry Studio (desktop assistant)

Cherry Studio is a local desktop LLM client supporting multiple models, MCP, and custom Agents/Skills. It is not a bot framework, but it's great for "chat and get answers" locally.

1. Install Cherry Studio and configure your model provider;
2. Create a new **Agent/Skill**, paste the **system prompt** above;
3. Let the agent call `sip.exe` (configure it as a command-line tool / MCP, or use a `sip --json` shell command);
4. Ask directly in chat; it will call sip to retrieve.

---

## Verification example

After wiring it up, post in your group:

```
@bot Which RSS updates are worth reading from the last two days?
```

The agent runs `sip --today --json` / `sip --search` and returns trusted summaries with source links.

```
@bot Find me articles about "LLM Agent"
```

The agent runs `sip --search "LLM Agent" --json`, citing only your subscribed sources.

---

## FAQ

- **`sip --search` says "AI not configured"**: run `sip --init` to configure a model; if there's no vector index, run `sip --index`.
- **Bot doesn't reply**: confirm the Gateway is running, the channel token is valid, and the message reaches the agent.
- **It cites sources you don't want**: remove the source; the whitelist is simply the source list you maintain.
- **Read only the full text**: `sip --show <id> --json` outputs the unrendered original for the agent.
