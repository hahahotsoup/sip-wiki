# Features Overview

sip's features fall into four main areas: **smart archiving**, **assisted reading**, **AI friendly**, and the **intake closed loop (v1.1)**, plus capabilities in planning (see [Roadmap](/en/features/roadmap)).

| Module | Description | Details |
|------|------|------|
| 📚 Smart Archiving | Version tracking, content diff, snapshot archiving, reading progress memory, feed identity & health, content quality marking | [Go](/en/features/archive) |
| 📖 Assisted Reading | TUI folder view, immersive reading, full-text fetch, Markdown rendering, today's hot soup | [Go](/en/features/reading) |
| 🤖 AI Friendly | Full-featured CLI, unified JSON output, semantic search, LLM summaries, structured exit codes | [Go](/en/features/ai) |
| 🔁 Intake Closed Loop (v1.1) | Cross-source dedup (`--dedup`), Source Policy (`--policy`), reading insights (`--insights`), Onboarding (`--onboarding`) | [below](#intake-closed-loop) |
| 🕊️ Privacy & Telemetry | Local telemetry Sumenia, off by default, stored locally only | [Go](/en/features/telemetry) |

## Intake Closed Loop

Since v1.1, sip moves from an "RSS reader" toward a "personal information hub" filter loop: read → analyze → you confirm → rule takes effect → the feed gets cleaner. Four "decision is yours" capabilities — **detection is a fact, the decision is yours, the rule persists**:

- **Cross-source dedup (`--dedup`)**: when the same article is re-pushed by multiple feeds, sip detects "possibly the same article" by **paragraph overlap** (cross-source, zero LLM). Since v1.1.4 detection outputs **duplicate clusters** (a group of same-article rows: a representative + members) — however many duplicates, you only get a handful of clusters, **no pair explosion, no truncation**. `hide-cluster <representativeId>` hides the whole cluster in one shot (keeps the representative, hides the rest); `hide <hiddenId> <canonicalId>` hides a single article. Hiding marks `Status='dedup'` — since every query reads only `active`, it **automatically disappears from search / fulltext / summary / counts** (data kept, not deleted). Rules live in `dedup.json`; `--sync` skips re-importing them (**no resurrection**); if the ignored article is later changed by the author into different content, the rule auto-expires and re-prompts. `undo <key>` restores in one shot.
- **Source Policy (`--policy`)**: stores "your decision" in `source_policy.json` and **applies** it: `lower_frequency` (directly changes the update schedule) / `archive` / `tag` (adds a tag, `-l` shows `#tag`) / `keep` / `unsubscribe` (records a note). **`createdBy` is always `user`, never auto-written by AI** — every rule goes through your confirmation.
- **Reading insights (`--insights`)**: `status` (technical failures only: normal / ⚠ long-untouched / ✗ failed N times) + `reasons` (a factual list of reasons), with value-judgment phrasing like "consider unsubscribing / consider pruning" removed — **low reading ≠ low value**, no black-box scores. Judgment is left to you.
- **Onboarding (`--onboarding`)**: add recommended feeds by domain (AI / Dev / Tech companies) in one click, lowering the first-use barrier; `templates.json` is editable.

## Privacy & Telemetry

Local reading telemetry **Sumenia**: off by default, stored locally only, never auto-uploaded; viewable / disableable / clearable / exportable. See [Telemetry & Privacy](/en/features/telemetry).
