# How sip compares to other readers

> **—「Taste it. Savor it.」**

The feed-reader ecosystem is crowded. sip isn't trying to compete on "aggregating subscriptions and displaying articles" — existing readers already do that well. What sip wants is what they **generally don't do and won't do**: making information trustworthy, traceable, and usable by AI.

Below we compare against the common three categories. The high-level conclusion first, then the details.

## Positioning in one line

| Category | Examples | Core experience | What sip offers differently |
|------|------|----------|------------------|
| Self-hosted web readers | FreshRSS, Tiny Tiny RSS, Miniflux | Deploy it yourself, read feeds in a browser | sip is a local single file, plus version tracking / AI whitelist / one bowl a day |
| Cloud aggregation services | Feedly, Inoreader, The Old Reader, NewsBlur | Hosted aggregation, sync across devices | sip keeps data in your hands, no account, no upload; AI retrieval reads a whitelist only |
| Desktop / mobile clients | Reeder, NetNewsWire, Follow | A beautiful local reading UI | sip is a CLI + TUI built for scripts / agents, not just a UI for humans |

## Self-hosted: FreshRSS / Tiny Tiny RSS / Miniflux

They all help you "aggregate subscriptions and read in a browser." That space is mature; sip doesn't reinvent it.

**What sip adds** (no feature-talk here — every command really runs):

| sip capability | Can they? | What it looks like |
|----------|----------|----------|
| Version tracking + diff | ❌ they only show "new article" | `sip --versions 42` / `sip --diff 42` — edits, corrections, retractions all recorded |
| AI reads a whitelist | ❌ | `sip --search "topic" --json` — semantic search / summaries only from your sources |
| One bowl a day | ❌ they give you an endless feed | `sip --today` — 5 rule-based picks daily, anti-scroll, anti-bubble |
| Agent-facing CLI | ⚠️ APIs exist but are heavy, human-oriented | Unified JSON + structured exit codes + [sip-rss skill](/en/usage/bot-integration), drop straight into a bot |
| Deployment | Server + database + web | Local single-file exe, all your data in `readwithhotsoup/` |

## Cloud: Feedly / Inoreader / The Old Reader / NewsBlur

Their strength is "hosting + multi-device sync + recommendation algorithms."

**sip's differences**:

- **Data ownership**: they store reading history and feed lists in the cloud; sip keeps everything local in `readwithhotsoup/` (SQLite + file cache), no account needed, reading history never uploaded.
- **Transparent decisions**: cloud "recommend this to you" is a black box; sip's filter rules are simply the feed list you maintain, and every pick can say "why" ([Transparent Decisions](/en/guide/introduction)).
- **AI capability**: most clouds don't have "let AI read only your whitelist" — either no AI, or the AI still cites garbage sources from the whole web.

## Clients: Reeder / NetNewsWire / Follow

They perfect the *reading* UI. sip's TUI and immersive reading pay respect to them, but the positioning differs:

- **They are UIs for humans**; sip is a **tool for humans + AI** — the same data, humans read in the TUI, agents query with `--search --json`.
- Clients generally don't solve "articles get edited" or "AI cites trustworthy sources" — which is exactly sip's core.

## The common blind spot: three things almost nobody does

Regardless of category, most readers get stuck in the same place — **"aggregate + display", not "trust + use"**:

| Blind spot | Traditional readers | sip |
|------|------------|-----|
| Author edited the article, what changed | You keep seeing the old version | `--diff` shows the evolution ([Smart Archiving](/en/features/archive)) |
| Want AI to research without citing garbage | No answer | AI only retrieves your subscribed sources ([AI Friendly](/en/features/ai)) |
| Information overload, endless scrolling | Give you more | One bowl a day, read and close ([Today](/en/features/reading)) |

## When you should NOT use sip

To be honest, sip isn't right for these:

- You want a **web-based** reader accessible from a phone browser → choose a self-hosted reader like FreshRSS / Miniflux.
- You want **multiple users online**, sharing one subscription and account system → self-hosted or cloud.
- You just want 200 feeds in one place and don't care about "article edits" or "AI citations" → any mainstream reader is enough.
- You already have a mature deployment and migration costs are high → no need to switch.

## Migrating over?

Mainstream readers all support OPML, and so does sip:

```bash
sip --import-opml your-export.xml     # FreshRSS / Feedly / Inoreader / TT-RSS all export OPML
sip -l                                # confirm the feeds are in
```

> Running both in parallel for a week works fine: the old reader for quick browsing, sip for deep reading and AI. Keep the one with good reason, remove the redundant one.

## Next steps

- [5-Minute Quick Start](/en/guide/quick-start) — from download to first value
- [Practical Scenarios](/en/guide/practical-scenarios) — 6 real workflows
- [Features Overview](/en/features/) — the three capability modules
