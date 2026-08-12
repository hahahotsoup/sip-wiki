# 🍲 sip Comprehensive Test Report (Final)

> Coverage period: 2026-08-11 ~ 2026-08-12
> Tested versions: v1.0 → v1.1 → v1.1.4 (incl. cluster refactor)
> Method: automated CLI + manual TUI + fault injection + stress testing + security penetration
> Note: this report consolidates **all test processes and re-verification data** since the second round — read it straight through, no need to consult the intermediate files

---

## Table of Contents

1. Test Overview & Timeline
2. First Round Review (v1.0, 7.1 pts)
3. v1.1 New-Feature Testing (dedup/policy/insights/onboarding/telemetry)
4. Security Re-test (7 vulnerabilities → 6 fixed)
5. Tavern Jokes (creative edge-case mining)
6. Stress Testing (dedup/policy/telemetry/Sumenia)
7. Supplementary Tier (progress/health/WAL/OPML/export)
8. Second Round Score (7.6 pts)
9. v1.1.4 Re-test (discovering the cap & bidirectional pairing)
10. Cluster Refactor Verification (root-curing the output explosion)
11. grep Wildcard Problem & Fix
12. Large-Change Regression (+696 lines, zero regression)
13. Final Issue List
14. Final Score
15. Appendix: Test Sites & Data

---

## 1. Test Overview & Timeline

| Phase | Time | Version | Core Output |
|------|------|---------|------------|
| First round, full features | 08-11 | v1.0 | 51 tests, score 7.1 |
| v1.1 new features | 08-12 AM | v1.1 | 28 tests, 23 pass / 5 fail |
| Security re-test | 08-12 | v1.2 | 7 vulns, 6 fixed |
| Tavern jokes | 08-12 | v1.2 | 30 items, 4 defects unearthed |
| Stress test | 08-12 | v1.2 | performance curves + concurrency |
| Sumenia stress | 08-12 | v1.2 | 463 events / concurrency |
| v1.1.4 re-test | 08-12 | v1.1.4 | cap-2000 discovered |
| Cluster refactor | 08-12 | v1.1.4 | output explosion root-cured |
| Large-change regression | 08-12 | v1.1.4 (18:52) | +696 lines, zero regression |

**Cumulative tests**: ~230+ items | **Defects found**: ~25 | **Fixed & verified**: 22

---

## 2. First Round Review (v1.0)

51 functional tests, score **7.1/10**.

| Dimension | Score |
|------|------|
| Feature completeness | 8.5 |
| Stability | 6.0 (bare main-DB crash, O(n²)) |
| Performance | 7.0 |
| Security | 6.5 |
| Documentation | 7.5 |
| AI friendliness | 6.5 |

Main defects: `-l N` O(n²) hang, rss.db corruption bare crash, SSRF, terminal injection, exit-code contract chaos, `--init` crash on non-TTY.

---

## 3. v1.1 New-Feature Testing

### 3.1 Cross-source dedup `--dedup` (pair form, at the time)

- **Detection boundary**: constructed 100% / 80% / 71% / 61% four similarity tiers and measured them — only **paragraph-level overlap ≥ 80%** is reported
- **Detection**: `--dedup scan` 12 groups (11 × 100% + 1 × 80%)
- **Hide/undo**: hide/list/undo basically normal
- **⚠️ Failures**:
  - Anti-resurrection failed (delete + re-fetch + re-import)
  - `-l N` list did not filter dedup
  - scan candidates did not shrink after hiding

### 3.2 Source Policy `--policy` ✅ all passed

5 actions (tag/keep/lower_frequency/archive/unsubscribe) + remove + boundary exit codes; `createdBy` is always user.

### 3.3 Insights ✅ all passed

`status`+`reasons` refactor; no health/action/basis, no value judgments.

### 3.4 Onboarding

- CLI ✅ (list/category/add/skip)
- **TUI command line ❌ not wired** (fixed later)

### 3.5 Telemetry ✅ all passed

consent_change / feed_change / search (incl. full query terms) / dedup events all present.

---

## 4. Security Re-test (7 vulnerabilities → 6 fixed)

| # | Vulnerability | Re-test result | Key evidence |
|---|------|---------|---------|
| 1 | SSRF (full-text fetch reaching intranet) | ✅ Fixed | loopback/private/CGNAT/cloud-metadata all blocked; server logs show zero intranet requests |
| 2 | Terminal injection (ESC control chars) | ✅ Fixed | `cat -v` confirms ESC fully stripped |
| 3 | javascript:/file: links | ⚠️ Partial | TUI open is blocked; exported .md still keeps the text |
| 4 | rss.db corruption bare crash | ✅ Fixed | scene preserved as `.corrupt` + auto-rebuild |
| 5 | `--init` non-TTY crash | ✅ Fixed | ReadKey exception degrades to ReadLine |
| 6 | Exit-code contract | ✅ Fixed | 6 commands all comply (0/1/3) |
| 7 | grep wildcards | ❌ Not fixed (fixed later) | see Section 11 |

**Security score: 6.5 → 8.5**

---

## 5. Tavern Jokes (30 edge-case stunts)

**Grand prize: dedup self-hug family pack**
```
hide 924 924 → hidden 924 (keeping 924)   ← hiding itself
hide 924 925 + hide 925 924 → ring hide   ← canonical is itself hidden
```

**Runner-up: hide breaks semantics**
```
hide 931(Rust article) 1(hot-soup AI article) → hidden 931 (keeping 1)  ← unrelated articles accepted
```

**Bronze: policy says one thing, does another**
```
lower_frequency 3x/day → invalid schedule but still written to policy
```

**Line comedy**: exit-code hopping, `-L`==`-l`, `-d "not a url"` auto-completed to `https://not a url`, etc.

**4 real defects distilled**: hide without validation, invalid schedule residue, `-l` not filtering dedup, self-hug stacking.

---

## 6. Stress Testing

### 6.1 dedup scan complexity (pair era)

| Data volume | Time | Conclusion |
|--------|------|------|
| 1500 articles | 1.2s | fast |
| 6500 articles | 14.3s | O(n²) obvious |
| 4945 real duplicates | **9.7s + 503k pairs + 105MB** | output explosion |

### 6.2 Batch operations

- hide ×100: 48s (0.48s each, dominated by startup overhead)
- undo ×20: 10.3s
- policy ×15: instant
- `-l` 27 feeds: 541ms

### 6.3 Concurrency

- 5 concurrent reads / 4 concurrent writes / 8-process mix: all succeeded, DB intact
- WAL crash recovery: DB intact after kill -9

### 6.4 Sumenia stress (telemetry)

- 463 events: show 0.5s / export 0.6s / insights 0.6s
- Event mix: search 304 / dedup 132 / feed_change 19 / consent_change 1
- 4~8 concurrent reads/writes all safe

---

## 7. Supplementary Tier

| Test item | Result |
|--------|------|
| Reading-progress tolerance (invalid/negative/out-of-range/400KB) | ✅ no crashes |
| Feed health (failure accumulation → success reset) | ✅ FailCount 4→0 |
| SQLite WAL crash recovery | ✅ intact after kill |
| sidecar timing defect | ✅ confirmed fixed |
| OPML round-trip idempotence | ✅ |
| `--likes --json` / `--lang` variants | ✅ |
| Large-feed export 839 articles | ✅ 0.88s |

---

## 8. Second Round Score

**7.6/10 (A-)**, +0.5 over round one.

| Dimension | v1.0 | v1.2 | Change |
|------|------|------|------|
| Features | 8.5 | 8.0 | -0.5 |
| Stability | 6.0 | 7.5 | +1.5 |
| Performance | 7.0 | 6.5 | -0.5 |
| Security | 6.5 | **8.5** | +2.0 |
| Documentation | 7.5 | 7.5 | flat |
| AI friendliness | 6.5 | 7.0 | +0.5 |

---

## 9. v1.1.4 Re-test (key turning point)

### 9.1 Eight-defect re-test

| # | Defect | Result |
|---|------|------|
| 1 | Anti-resurrection | ✅ Fixed (interception + controlled experiment) |
| 2 | `-l N` filters dedup | ✅ Fixed |
| 3 | scan performance/explosion | ⚠️ Partial (see below) |
| 4 | hide semantic validation | ✅ Fixed (self-hug / unrelated both blocked) |
| 5 | lower_frequency invalid schedule | ✅ Fixed |
| 6 | grep wildcards | ❌ (fixed later, see 11) |
| 7 | TUI telemetry empty command | ✅ Fixed |
| 8 | orphan rules after feed removal | ✅ Fixed |

### 9.2 Major discovery: cap 2000 + bidirectional-pairing bug

**Decisive experiment** (2 feeds × 30 fully identical articles):

| Metric | Theory | Actual |
|------|------|------|
| Unique duplicate pairs | 900 | **1800 (doubled)** |
| Symmetric reverse pairs | 0 | **1800 (all of them)** |

**Conclusion**:
- `FindNearDuplicates` has a silent `MaxCandidates = 2000` truncation (preventing output explosion)
- **Under the hood every cross-feed pair was computed twice** (bidirectional traversal) — half the cap budget wasted on symmetric duplicates
- GitHub main-branch source is one-way `i<j`, the local exe is bidirectional — **exe and source out of sync** (wrong version copied)

---

## 10. Cluster Refactor Verification (root-cause fix)

Pair detection was changed to **cluster detection**:

```
Found 1 duplicate cluster (paragraph overlap ≥ 80%):
Cluster 60 articles · overlap ≥ 100% · representative [18818]
     members: 18819, 18820, ...
     keep the representative, hide the rest: sip --dedup hide-cluster 18818
```

### 10.1 Effect comparison

| Scenario | Old (pair) | New (cluster) |
|------|------------|----------------|
| 30×30 fully identical | 900 pairs (1800 with bidirectional bug) | **1 cluster (60 articles)** |
| 101 fully identical | output explosion (tens of thousands of pairs) | **1 cluster · 357 bytes · 765ms** |
| Output cap | 2000 pairs silently truncated | **no truncation** |
| Hide operation | hide pair by pair | **hide-cluster hides the whole cluster in one shot** |

### 10.2 Full-chain verification

- scan cluster form ✅ (10 pairs → 5 clusters)
- hide-cluster ✅ (3-article cluster → hide 2, keep 1)
- boundaries ✅ (repeat hide / non-representative / nonexistent → all correctly rejected)
- list/undo ✅ (every member has an independent undo key)
- anti-resurrection ✅ (still intercepted in cluster mode)
- `--today` interaction ✅ ("N groups possibly the same article" works)

**10.3 JSON structure**
```json
{ "clusters": [{ "size": 60, "representativeId": 18818,
                 "title": "...", "source": "...", "minOverlap": 100,
                 "members": [18818, 18819, ...] }] }
```

---

## 11. grep Wildcard Problem & Fix

### 11.1 Symptom

```
--grep "%" → [1] article (0 occurrences)   ← hit but count 0
--grep "_" → [14] article (0 occurrences)  ← same
```

### 11.2 Root cause (% and _ share the same problem)

- **SQL matching**: the keyword is escaped to a literal; LIKE matches the **whole Content** original (incl. HTML attributes)
- **Snippet counting**: `ExtractGrepSnippets` uses the raw keyword and does `IndexOf` over the **visible text** after `StripHtml`
- **Mismatch**: `%`/`_` all live in HTML attributes (URL-encoded, bilibili links); after tag stripping, visible text is 0

Measured data:

| Article | Char | Content total | In attributes | Visible text |
|------|------|------------|--------|---------|
| article 1 | % | 36 | yes | **0** |
| article 14 | _ | 2 | yes | **0** |
| article 49 | _ | 1 | no (huggingface_hub) | **1** ✅ |

### 11.3 Fix (Plan A)

When there's a hit but visible count is 0, hint:

```
[1] article (0 occurrences)  (only matched links/attributes, not counted in visible text)
```

Measured: `%`/`_` hints correct; normal hits (huggingface_hub 1×) unaffected.

---

## 12. Large-Change Regression (+696 lines)

After `RssReader.cs +696 lines` (cluster refactor + grep hint + all defect fixes + `--version` build time), systematic regression:

| Category | Result |
|------|------|
| Base regression script, 19 items | ✅ all pass |
| dedup cluster full chain + boundaries | ✅ |
| exit-code contract, 6 items | ✅ |
| Security (ESC/SSRF/init) | ✅ zero regression |
| Core features (export/versions/diff/update/like/schedule/OPML) | ✅ |
| Version tracking (simulated v2) | ✅ |
| Large export 936 articles | ✅ 1s |

**Conclusion: +696 lines, zero regression.**

---

## 13. Final Issue List

### 🟢 Low severity (2)

| # | Issue | Note |
|---|------|------|
| 1 | `--export` keeps malicious protocol link text | TUI opening is blocked; `javascript:` etc. still in exported .md (only triggers in external renderers) |
| 2 | dedup.json occasional loss | not reproduced since the cluster refactor; suspected legacy leftover, watching |

### 🎨 UX details (3)

| # | Issue | Note |
|---|------|------|
| 3 | `i` view (hidden list) has no x | only undo, no delete |
| 4 | home content still centered | left-align fix didn't cover the start screen |
| 5 | `s` and Enter panel redundancy | overlapping design entries |

### ✅ Clarified

- **File-in-use** = user's manual operation, not a program issue (struck out)
- The remaining 22 defects all fixed and verified

---

## 14. Final Score

| Dimension | v1.0 | v1.2 | v1.1.4 (final) | Note |
|------|------|------|--------------|------|
| Feature completeness | 8.5 | 8.0 | **8.8** | cluster detection live, features complete |
| Stability | 6.0 | 7.5 | **8.5** | output explosion root-cured, anti-resurrection fixed |
| Performance | 7.0 | 6.5 | **8.0** | no O(n²) output problem after clustering |
| Security | 6.5 | 8.5 | **8.5** | stable |
| Documentation | 7.5 | 7.5 | **8.0** | README/Wiki polished |
| AI friendliness | 6.5 | 7.0 | **8.0** | init usable, exit codes all correct, TUI completed |

**Total: 8.4 / 10 (A-, excellent)**

```
8.8×0.25 + 8.5×0.20 + 8.0×0.15 + 8.5×0.20 + 8.0×0.10 + 8.0×0.10
= 2.20 + 1.70 + 1.20 + 1.70 + 0.80 + 0.80
= 8.40
```

### Score evolution

```
v1.0    7.1  (good features, security/stability debt)
v1.2    7.6  (6 security vulns fixed, entered the trustable zone)
v1.1.4  8.4  (cluster refactor root-cures the output explosion, +696 lines zero regression)
```

**In one sentence**: from "usable" (7.1) to "trustable" (8.4), three iterations closed all three short boards — security, stability, performance — leaving only low-severity UX details.

---

## 15. Appendix: Test Sites & Data

### Current environment

- 4 real feeds (hot-soup teahouse/HF/World/hin.cool), 923 articles, `integrity ok`
- All test feeds/temp files/dedup rules cleaned up
- Pending commit: `RssReader.cs +696`, `Tui.cs +17`, 3 language files, README×2, sip.csproj, --version

### Test data notes

- Plagiarism test feeds: 5 (dup_a~h.xml, 100%/80%/71%/61% similarity gradient)
- Stress constructions: up to 7445 articles / 27 feeds
- Security tests: SSRF server, entity bombs, XXE, terminal-injection payloads
- All tests left the environment clean

### Reference files

- `sip-regression.sh` (19-item quick regression script, anyone can run)
- [sip Comprehensive Test Report (2026-08-11)](/en/sip-test-report-2026-08-11) (first round, 51 functional tests)
- `sip-v1.1-测试报告-2026-08-12.md` (v1.1 new features)
- `sip-安全复测报告-2026-08-12.md` (security)
- `sip-第二轮成果汇总与评分-2026-08-12.md` (second round)

---

*Report generated: 2026-08-12 | all conclusions based on reproduced measurements + source-line evidence | version sip v1.1.4 (built 2026-08-12 18:52)*
