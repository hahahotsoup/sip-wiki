# Features Overview

sip's features fall into four main areas: **smart archiving**, **assisted reading**, **AI friendly**, and the **intake closed loop (v1.1)**, plus capabilities in planning (see [Roadmap](/en/features/roadmap)).

| Module | Description | Details |
|------|------|------|
| 📚 Smart Archiving | Version tracking, content diff, snapshot archiving, reading progress memory, feed identity & health, content quality marking | [Go](/en/features/archive) |
| 📖 Assisted Reading | TUI folder view, immersive reading, full-text fetch, Markdown rendering, today's hot soup | [Go](/en/features/reading) |
| 🤖 AI Friendly | Full-featured CLI, unified JSON output, semantic search, LLM summaries, structured exit codes | [Go](/en/features/ai) |
| 🔁 Intake Closed Loop (v1.1) | Cross-source dedup (`--dedup`), Source Policy (`--policy`), reading insights (`--insights`), Onboarding (`--onboarding`) | [below](#intake-closed-loop) |
| 🚪 Evidence Library (v1.2) | Turn non-RSS info into evidence: store (stdin/URL/evidence packages), organize (semantic dedup + topic groups), track (refresh + change grading ⚪🟡🔴 + reversal detection), use (retrieve / ask) | [below](#evidence-library) |
| 🌳 Tree Comments + Multi-tag + Data Checkup + Web Monitoring (v1.2.2) | Tree-structured comments (FragmentId + recursive CTE), multi-tag system (Tags + EvidenceTags many-to-many), evidence stats (stats), stale cleanup (cleanup), web monitoring (watch), semantic diff (--semantic) | [below](#tree-comments-and-multi-tag-v122) |
| 🕊️ Privacy & Telemetry | Local telemetry Sumenia, off by default, stored locally only | [Go](/en/features/telemetry) |
| 🔒 Security Guardian | 孟思琳 (simon): on by default, cannot be disabled, level 1/2/3 only; level 3 encrypts all data | [Go](/en/features/security) |
| ⚡ Million-Scale Performance | FTS5 full-text search, TUI lazy loading, batch transactions, windowed indexes | [below](#million-scale-performance) |

> 🐾 The [Meme Encyclopedia (梗百科)](/梗百科) is **Chinese-only** — it has no English version. You've been warned ~~(or blessed)~~.

## Intake Closed Loop

Since v1.1, sip moves from an "RSS reader" toward a "personal information hub" filter loop: read → analyze → you confirm → rule takes effect → the feed gets cleaner. Four "decision is yours" capabilities — **detection is a fact, the decision is yours, the rule persists**:

- **Cross-source dedup (`--dedup`)**: when the same article is re-pushed by multiple feeds, sip detects "possibly the same article" by **paragraph overlap** (cross-source, zero LLM). Since v1.1.4 detection outputs **duplicate clusters** (a group of same-article rows: a representative + members) — however many duplicates, you only get a handful of clusters, **no pair explosion, no truncation**. `hide-cluster <representativeId>` hides the whole cluster in one shot (keeps the representative, hides the rest); `hide <hiddenId> <canonicalId>` hides a single article. Hiding marks `Status='dedup'` — since every query reads only `active`, it **automatically disappears from search / fulltext / summary / counts** (data kept, not deleted). Rules live in `dedup.json`; `--sync` skips re-importing them (**no resurrection**); if the ignored article is later changed by the author into different content, the rule auto-expires and re-prompts. `undo <key>` restores in one shot.
- **Source Policy (`--policy`)**: stores "your decision" in `source_policy.json` and **applies** it: `lower_frequency` (directly changes the update schedule) / `archive` / `tag` (adds a tag, `-l` shows `#tag`) / `keep` / `unsubscribe` (records a note). **`createdBy` is always `user`, never auto-written by AI** — every rule goes through your confirmation.
- **Reading insights (`--insights`)**: `status` (technical failures only: normal / ⚠ long-untouched / ✗ failed N times) + `reasons` (a factual list of reasons), with value-judgment phrasing like "consider unsubscribing / consider pruning" removed — **low reading ≠ low value**, no black-box scores. Judgment is left to you.
- **Onboarding (`--onboarding`)**: add recommended feeds by domain (AI / Dev / Tech companies) in one click, lowering the first-use barrier; `templates.json` is editable.

## Evidence Library

The second door of v1.2「广开言路」: `sip ingest` turns **non-RSS information** (evidence found elsewhere, ordinary web pages, evidence packages) into a local, trackable evidence library — same DB as RSS articles (`Evidence` table in `rss.db`, schema `sip-evidence-v1`). **Store it when you find it; track it once stored; trust it because it's tracked.**

- **Store**: `ingest --stdin` (pipe text in) / `ingest --url <url>` (web page as a `watch` target, SSRF-guarded) / `ingest --evidence <file|--stdin>` (import `sip-evidence-v1` packages, schema-validated)
- **Organize**: semantic dedup (reuses embeddings, needs `--init` AI setup) + topic groups (`group add <label> [--seed <query>]` / `rename` / `rm`) — topics are yours to define
- **Track**: version chain + hash + **bi-temporal** (no change, no new version; old content stays readable, never overwritten); `refresh [id | --stale | --all]` re-fetches for freshness; **change grading ⚪polish / 🟡adjust / 🔴reverse** (reversal requires dual verification with stance-flip signal words — presented, never concluded); TTL freshness (watch 7 days / evidence 30 days, `--ttl` overrides)
- **Use**: `retrieve <query> [--top N] [--group N]` returns evidence with full context (verbatim excerpts/source/version/freshness/verification/consensus/topic/grade/reversal); `ask <question>` answers **from your evidence only — quote verbatim, never paraphrase, never fabricate**; `confirm <id>` verifies, `rm <id>` forgets (light store, easy delete), `list [--stale] [--group N]` browses

Guardian level 2 blocks `ingest` write commands for non-interactive calls (see [Security](/en/features/security)); commands in [CLI](/en/usage/cli).

## Tree Comments and Multi-tag (v1.2.2)

v1.2.2「Tree Comments + Multi-tag + Data Checkup + Web Monitoring」: evidence organization becomes more flexible, easier to maintain and track.

- **Tree Comments**: `sip ingest tree <id>` views tree-structured comments (FragmentId field + recursive CTE queries), supports `--depth` control
- **Multi-tag System**: Tags + EvidenceTags many-to-many associations
  - `sip ingest tag list` lists all tags
  - `sip ingest tag add <evidenceId> <tagName>` adds tag to evidence
  - `sip ingest tag rm <evidenceId> <tagName>` removes tag from evidence
  - `sip ingest list --tag <tagName>` filters evidence by tag
- **Evidence Table Extension**: new fields including FragmentId, Platform, ContentId, Author, CanonicalUrl, Context, Snapshot, Note, WatchEnabled, WatchInterval, WatchLastCheckedAt, WatchLastHash
- **Data Checkup**: `sip ingest stats` one-line summary (total evidence, versions, modified, reversed, topics, tags, new today); `sip ingest cleanup --stale` cleans stale evidence — ViewCount ≥ 3 or viewed within 7 days auto-kept, `--dry-run` previews deletion, `--json` outputs machine-readable report
- **Web Monitoring**: `sip ingest watch add <id>` marks evidence as monitoring target (minimum 5 min interval); `watch list` lists all monitoring targets; `watch refresh [id] [--all]` manually refreshes monitored content (no auto-fetch, needs cron配合)
- **Semantic Diff**: `sip --diff <id> --semantic` shows semantic distance (0-1, lower = more similar) and change grade (⚪polish/🟡adjust/🔴reverse)

## Privacy & Telemetry

Local reading telemetry **Sumenia**: off by default, stored locally only, never auto-uploaded; viewable / disableable / clearable / exportable. See [Telemetry & Privacy](/en/features/telemetry).

## Security Guardian

**孟思琳 (simon)** is sip's security guardian — the opposite of Sumenia (off by default): **on by default, cannot be disabled, level only adjustable** (1 basic / 2 strict / 3 extreme). Level 3 enables full data encryption (rss.db via SQLCipher, full-text cache & dedup rules via AES-GCM), keys auto-generated and stored only in the OS credential store; downgrading is only possible in the TUI command bar (the CLI is never trusted). See [Security](/en/features/security).

## Million-Scale Performance

Adapted for large libraries (100k–1M articles), measured on a 1M-article benchmark:

| Capability | Notes |
|------|------|
| FTS5 full-text search | `--grep` ≥3 chars uses FTS5 + trigram (Chinese substring searchable), 1M articles ~2.2s → ~0.5s; short words auto-fallback to LIKE; lazy index backfill |
| TUI lazy loading | Startup/refresh loads only collapsed counts; a feed's articles load on expand (2w cap per feed) |
| Batch transactions | Whole-feed updates commit once (single disk flush) |
| Windowed indexes | Today / dedup query by `PublishDate` index; dedup windows over 20k take only the latest N |
| Startup optimization | Clean-exit marker skips the 28s full integrity check on a 2GB DB (abnormal exit still fully checks) |
