# Introduction

> **—「Taste it. Savor it.」**
>
> **sip: your information, your history, your judgment.**

sip is a **local-first personal information hub**: it collects content from RSS and other sources, preserves it locally and tracks changes over time, and helps you take control of your information input through search, filtering, and agents.

It helps you do five things:

```
collect → preserve → track → filter → use
```

- **Collect**: RSS sources
- **Preserve**: full-text fetching, version snapshots
- **Track**: what the author changed (Version / Diff)
- **Filter**: Insights reports, Source Policy rules, cross-source dedup, high-frequency collapsing
- **Use**: full-text / semantic search, agents / bots, Markdown export

**AI helps you understand information, but never decides its value for you** — the judgment is always yours.

And, shamelessly: [https://blog.hotsouprealm.top/atom.xml](https://blog.hotsouprealm.top/atom.xml)
Follow the Hot Soup Teahouse. Follow us, thank you. 🐾

## Why does sip exist?

Today's information environment has three harsh realities:

1. **LLMs cite garbage sources** — DeepSeek, Doubao, ChatGPT casually cite Sohu, Baijiahao, low-quality self-media, and you can't even tell it "don't use these".
2. **Algorithms trap you in a bubble** — TikTok/Toutiao keep you scrolling but never tell you "why this was recommended", and never let you choose "what I don't want to see".
3. **The people you care about lack the ability to discern** — your parents, your friends have no technical means to protect themselves against clickbait and rumors.

sip's answer to these three problems is simple:

> **I stand my ground, and I read the information too.**

## Core Design Principles

| Principle | Description |
|------|------|
| **Local-first** | Data stays in your hands (SQLite + file cache), no account needed, reading history never uploaded |
| **Transparent decisions** | Only see sources you subscribe to, no algorithmic black box; filter rules are simply the feed list you maintain |
| **Version is truth** | What did the author change? When? sip records it all for you, losing no history |
| **AI reads a whitelist only** | AI summaries and semantic search rely only on sources you trust, eliminating low-quality citations |
| **Judgment is yours** | AI helps you understand information but never decides its value for you — every decision (filter, lower frequency, archive) goes through your confirmation |
| **Out of the box, ultra-light** | Single-file exe, zero dependencies, works on launch; AI features called on demand, never pre-run |

## What specific problems does it solve?

### 1. A guardrail for AI

When you or your AI agent need to look something up:

- Let AI call `sip --search "xxx" --json`
- AI only retrieves from the sources you subscribe to
- Say goodbye to "AI rambling on about Sohu and Baijiahao"

### 2. Make information changes "visible"

A normal RSS reader only tells you "there's an article".

sip tells you:

- "This article was modified by its author on August 1"
- "This is what it said before, and this is what it says now" (`sip --diff 123 v1 v3`)
- "This blog changed its key opinions 12 times over the past year"

**What you see is no longer a static page, but the evolution of information.**

### 3. Help the people you care about avoid information overload

Configure a whitelist for your parents (for example: CCTV News, your local weather bureau, medical accounts you trust).

After they open sip:

- They only see the sources you've curated
- Articles with too-short summaries are automatically prompted to fetch the full text, to be read slowly
- No need to tell truth from falsehood, because the garbage sources are already blocked out

**hahahotsoup note: I'm well aware the TUI has a high learning curve, so a Web UI (sip-web) is now on the roadmap** — manage feeds, read articles, run full-text/semantic search, and view version diffs in the browser, no terminal needed. It is currently **experimental, has no security features, and is for local use only**: [Web UI](/en/usage/web).

## Design Boundaries

sip only does two things — **deterministic rules** and **local fact storage**. Everything you care about (collect, preserve, track, filter, use) is built on top of these two; anything requiring judgment/explanation/conversation is left to agents and users. Today's selection rules for the Hot Soup Teahouse remain fixed and explainable; once enough telemetry data accumulates for personalization and other "intelligence", it will either be implemented as new deterministic rules or live in the agent layer — not in the program.

## In Closing

sip won't make you scroll more, but it will let you read with more peace of mind.

May we meet again in good health 🍲
