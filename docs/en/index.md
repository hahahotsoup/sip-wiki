---
layout: home

hero:
  name: sip
  text: Your information, your history, your judgment
  tagline: A local-first personal information hub — collect, preserve, track, filter, use. Five things that put you back in control of your information input.
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

## Quick Start

```bash
# Download the single-file executable from Releases and run it directly
./sip.exe            # Windows: enter TUI (creates readwithhotsoup/ data dir on first launch)
./sip.exe --help     # or use the CLI directly
```

Want to dig deeper: [How sip compares to other readers](/en/guide/competitors) · [6 practical workflows](/en/guide/practical-scenarios).

## 📋 Welcome to the Test Report

[sip Second-Round Test Report (2026-08-12)](/en/sip-second-round-test-report-2026-08-12) — **~230+ tests** across three iterations (v1.0 → v1.1 → v1.1.4), fault injection, stress testing, security penetration. Overall **8.4/10 (A-)**, 22 defects fixed and re-verified, +696 lines with zero regression. Earlier round: [Comprehensive Test Report (2026-08-11)](/en/sip-test-report-2026-08-11) — 51 functional tests + 30+ boundary/exception injections, all 11 defects fixed in **v1.0** (see [Test Report](/en/test-report)).

> sip is not a product chasing "daily active users" and "time on site". It pursues this:
>
> **When you open sip, you know what you read today is trustworthy; when your AI calls sip, you know the sources it cites are reliable.**
