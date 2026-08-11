# 🕊️ Telemetry & Privacy

sip ships with a **local reading telemetry** (event layer) — her name is **Sumenia (苏暖泉)**, a soft little girl who quietly gets to know how you read. Her data is used to improve content filtering and recommendations in the future. Her boundaries are hard:

| Principle | Description |
|------|------|
| **Off by default** | `unset` (no choice) = nothing recorded; the TUI asks once on first launch, defaulting to "I don't need it for now" |
| **Stored locally only** | Data lives in `readwithhotsoup/telemetry.db` (independent database, fully isolated from `rss.db`) |
| **Never auto-uploaded** | There is no upload logic at all; it can only be shared if you actively `telemetry export` |
| **Viewable** | `sip telemetry show` shows raw events (time/type/article/data) |
| **Can be disabled** | `sip telemetry disable` (stops recording, keeps history) |
| **Can be deleted** | `sip telemetry clear` (clears events, doesn't affect your choice or other data) |
| **Can be exported** | `sip telemetry export [file]` produces JSON, and it's your decision whether to share it with the developer |
| **Records facts, builds no profile** | Only records facts like "which article was opened/finished/skipped, AI call status", no user-preference inference |

**What it records** (low-frequency events; scrolling/keystrokes are never recorded):

- `article_open` / `article_progress` (25/50/75/100% milestones) / `article_complete` / `article_skip` (actively left with progress <10%)
- `ai_call` (operation/provider/model/success/duration; **no prompt/response/fulltext/tokens recorded**)
- `article_like` (`--like` marking, distinguishing `actor: user` / `actor: ai`)

**Security design**: telemetry.db uses WAL mode, performs integrity checks on startup (with busy_timeout and retries, so concurrent startups aren't misjudged as corrupt); if truly corrupt it renames the file to preserve the scene (`.corrupt-timestamp`) and auto-rebuilds, **never affecting rss.db or reading**; events are batch-written from an in-memory buffer (50 records or 5 seconds), auto-degrading to disabled on consecutive write failures. **Non-interactive/agent scenarios (non-TTY, `--ignoresafeannouncement`) never ask and stay off.**

**Article marking** (`article_signals.json`, separate from telemetry): `sip --like <id>` user like (♥), `sip --like <id> --ai [reason]` AI judgment (🤖), `sip --likes` to view; visible in sidebar/`-l N`/JSON output.

## CLI Commands

```bash
sip telemetry status                 # view toggle status and event stats (Sumenia: off(unset) / event count…)
sip telemetry show [--limit N]       # view recent events (time/type/article/data, default 20, max 1000)
sip telemetry enable                 # enable (local recording only, never uploaded)
sip telemetry disable                # disable (history kept, no new events)
sip telemetry clear                  # clear events (keeps your toggle choice)
sip telemetry export [file]          # export as JSON (default telemetry.json, user-level backup)
```

> **AI/non-interactive scenarios never ask**: the TUI asks once on first launch (default "I don't need it for now"); non-TTY and `--ignoresafeannouncement` scenarios never ask and stay off, nothing to handle.

## Event Types

| Event | Meaning |
|------|------|
| `article_open` | Opened an article |
| `article_progress` | Reading progress milestone (25/50/75/100%) |
| `article_complete` | Finished reading |
| `article_skip` | Actively left with progress <10% |
| `ai_call` | AI call (operation/provider/model/success/duration; **no prompt/response/fulltext/tokens recorded**) |
| `article_like` | `--like` marking (`actor: user` / `actor: ai`) |

> Active Reading Time: ERT relative gap threshold (clamp ERT×25%, 10–120s), records active/estimated/time_ratio.
