---
layout: home

hero:
  name: sip
  text: An information firewall
  tagline: Reading is like sipping soup — don't keep glancing into the bowl, close your eyes and savor it first. — "Taste it. Savor it."
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/quick-start
    - theme: alt
      text: Features
      link: /en/features/
    - theme: alt
      text: Download Releases
      link: https://github.com/hahahotsoup/sipintui/releases

features:
  - icon: 📚
    title: Smart Archiving
    details: Track every change, visualize content diffs, and keep timestamped snapshots that preserve the complete state of any moment.
    link: /en/features/archive
  - icon: 📖
    title: Assisted Reading
    details: TUI folder view, immersive reading mode, full-text fetching, and Markdown rendering for a more comfortable read.
    link: /en/features/reading
  - icon: 🤖
    title: AI Friendly
    details: Full-featured CLI, unified JSON output, embedding semantic search, LLM summaries, and structured exit codes.
    link: /en/features/ai
  - icon: 🛡️
    title: Local-First
    details: Your data stays with you (SQLite + file cache). No account needed, reading history never uploaded.
    link: /en/guide/introduction
  - icon: 🔍
    title: Transparent Decisions
    details: Only see sources you subscribe to, no algorithmic black box; your filter rules are simply the feed list you maintain.
    link: /en/guide/introduction
  - icon: 🕊️
    title: Privacy & Telemetry
    details: Local reading telemetry (Sumenia), off by default, stored locally only, never auto-uploaded.
    link: /en/features/telemetry
---

## 📋 Welcome to the Test Report

[Comprehensive sip Test Report (2026-08-11)](/en/sip-test-report-2026-08-11) — 51 functional tests + 30+ boundary/exception injections + security penetration + data volume stress testing + concurrency tests. All 11 defects found in the report were fixed in **v1.0** and re-verified item by item (see [Test Report](/en/test-report)).

## Quick Start

```bash
# Download the single-file executable from Releases and run it directly
./sip.exe            # Windows: enter TUI (creates readwithhotsoup/ data dir on first launch)
./sip.exe --help     # or use the CLI directly
```

> sip is not a product chasing "daily active users" and "time on site". It pursues this:
>
> **When you open sip, you know what you read today is trustworthy; when your AI calls sip, you know the sources it cites are reliable.**
