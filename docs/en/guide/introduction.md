# Introduction

> **—「Taste it. Savor it.」**
>
> **Reading is like sipping soup — don't keep glancing into the bowl, close your eyes and savor it first.**

sip is an information firewall: letting you and your AI only see content you trust.

It is not an algorithm-driven reader, nor a feed meant to make you "scroll more". It is a **local-first transparent information filter and reading assistant** — you specify your sources, sip guards and assists in filtering them while improving the reading experience, so you and your AI agents get answers from a clean, traceable dataset.

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

**hahahotsoup note: I'm well aware the TUI has a high learning curve, so once the program matures, Avalonia is on the roadmap.**

## Design Boundaries

sip only does two things — **deterministic rules** and **local fact storage**; anything requiring judgment/explanation/conversation is left to agents and users. Today's selection rules for the Hot Soup Teahouse remain fixed and explainable; once enough telemetry data accumulates for personalization and other "intelligence", it will either be implemented as new deterministic rules or live in the agent layer — not in the program.

## In Closing

sip won't make you scroll more, but it will let you read with more peace of mind.

May we meet again in good health 🍲
