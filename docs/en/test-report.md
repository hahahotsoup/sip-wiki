# Test Report

## sip Second-Round Test Report (2026-08-12)

**~230+ tests** (three-round iteration summary: v1.0 → v1.1 → v1.1.4) + **automated CLI** + **manual TUI** + **fault injection** + **stress testing** + **security penetration**.

Overall score **8.4 / 10 (A-, excellent)** — from "usable" (7.1) to "trustable" (8.4), three iterations closed the security, stability, and performance short boards.

▶ Full report: [sip Second-Round Test Report (2026-08-12)](/en/sip-second-round-test-report-2026-08-12)

## sip Comprehensive Test Report (2026-08-11)

**51 functional tests** + **30+ boundary/exception injections** + **security penetration** + **data volume stress testing** + **concurrency tests**.

▶ Full report: [sip Comprehensive Test Report (2026-08-11)](/en/sip-test-report-2026-08-11)

The 11 defects in the report (the `-l` list O(n²), SSRF, terminal injection, main-database corruption tolerance, etc.) were all fixed in **v1.0** and re-verified item by item.

## v1.0 Security & Robustness Updates

- 🚀 **Performance**: `-l N` list O(n²) → window functions + indexes (5000 articles 30s+ → 0.6s)
- 🔒 **SSRF protection**: full-text fetch only allows http/https + blocks loopback/link-local/private ranges; set `"allowPrivateNet": true` in `ai_config.json` to allow intranet feeds; TUI validates the protocol before opening links (blocks `javascript:` injection)
- 🛡️ **Terminal injection**: ESC/control characters stripped at every output point (grep/list/search/diff, etc.)
- 💾 **Main-database corruption self-healing**: rss.db integrity check modeled on telemetry — corrupt → preserve the scene → rebuild, never crashes
- 🩺 **telemetry.db concurrency false-positive fix**: migrated to WAL + busy_timeout retries + silent skip when busy (24 concurrent startups measured, zero false positives)
- 🤖 **AI/Agent friendly**: `--init` degrades gracefully on non-TTY without crashing; exit-code contract fully verified; `--show --json` merges full-text cache (`fulltext` field)
- 🔍 **Retrieval**: `--grep` treats `%`/`_` wildcards literally; full-text sidecar vectors backfilled in order (fetching full text before indexing no longer misses)
- ✍️ **Robustness**: `--export-opml` tolerates bad paths; ai_config endpoints auto-complete protocol headers + camelCase compatibility; piped input UTF-8 (Chinese consent phrases no longer encoding-mismatched)

## Long-Term Test Checklist

The behavior of the following features only shows problems over days/weeks, so a single test can't catch them — worth including in routine checks:

### Data accumulation

| Feature | Observation point |
|------|--------|
| Version tracking/archiving | Author edits → new version; after long accumulation, Guid grouping, `✎` mark, `--diff` correctness; list performance as version count grows |
| Update scheduling | Whether `30m` / `daily@10:00` / `weekly@Mon 08:00` expire correctly by clock/interval; `LastCheckedAt` recomputation; only update what's due, no gratuitous refreshes |
| Feed health | Failure count accumulates → resets on success? The "⚠ not updated for a long time" mark (needs 30 days or schedule×3) |
| Reading progress | Multi-day/multi-article scroll positions restored correctly; `reading_progress.json` growth; bad values (negative/out of range) rejected |
| Full-text cache | Whether auto-cleanup triggers at 200 files/200MB; `vecs.json` growth; orphan cleanup after deleting articles/feeds |
| Language file merge | New keys keep auto-merging after multi-version upgrades; keys you've modified are never overwritten |

### Long-running

| Feature | Observation point |
|------|--------|
| TUI left open for a long time | Whether the 15-minute background sync loop leaks (memory/handles); immersive/collapse/manage/version-dialog operations don't crash when repeated |
| Auto-sync | Due feeds update on time when idle; no hangs/duplicates |
| SQLite performance | `-l` / `--grep` / `--search` latency with 10k+ articles; concurrent reads/writes under WAL |

### Stability & consistency

| Feature | Observation point |
|------|--------|
| AI summary/vector cache | Summary cache reused without repeated calls; model unavailable → after recovery sidecar-merged search still correct |
| OPML round-trip | Export → import → re-export, no duplicated feeds (idempotent) |
| Full-text fetch consent | Consent takes effect once; `--yes` / interactive path consistent long-term |
