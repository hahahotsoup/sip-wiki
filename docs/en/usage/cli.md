# CLI Mode

```bash
sip -l                  # list all feeds
sip -l 1                # list articles of feed 1 (ID format [list index/real ID])
sip -d https://xxx/rss  # download a new RSS feed
sip -u 1                # update feed 1
sip -a 1                # archive (adds a timestamp)
sip -una 1              # unarchive
sip -r 1                # remove a feed
sip -h                  # help
sip --lang en-US -l     # switch to the English UI
```

**Full-screen reading**: `sip --show <article-id>` opens a sidebar-less full-screen reading interface (Markdown-rendered body). At the bottom it prompts **"Press W to enter the full reader · Press Esc to exit"** — press `W` to seamlessly switch into the full TUI (positioned at the current article), or `Esc`/`Q` to return to the command line.

**AI reading the original**: `sip --show <article-id> --json` prints the article's title/source/link/publish time/author + **raw body** (no rendering) as JSON to stdout for AI or scripts, e.g. `sip --show 42 --json --lang en-US --ignoresafeannouncement`. If the article's full text was fetched, the JSON also includes a **`fulltext`** field (plain-text body, more complete than the RSS summary — AI should use it first when answering).

**Version tracking & Diff**:

```bash
sip --versions 42            # list all historical versions of article 42 (with status and time)
sip --show 87 --json         # 87 might be the ID of a historical version, still readable
sip --diff 42                # diff the body between the two latest versions
sip --diff 42 v1 v3 --json   # specify two versions, structured output {from, to, changes:[{type,before,after}]}
```

> `--versions` takes the **global article ID** from `--show`/`--grep` results; each version is an independent DB row with its own ID. When an article has only one version, a notice is printed (exit code 0, not an error). The IDs in `-l <feed-id>` listings use the `[list index/real ID]` dual format — take the **right-hand** real ID when using `--show`/`--versions`/`--summary`.

## Parameter Reference

| Short | Long | Description |
|--------|--------|------|
| `-l` | `--list` | List all feeds; with an ID, list that feed's articles (`-l --json` / `-l 1 --json` structured output, includes health status and content quality). ID format `[list index/real ID]`; commands like `--show/--versions/--summary` use the right-hand real ID |
| `-d` | `--download` | Download a new RSS feed (http/https prefix optional, auto-completed) |
| `-u` | `--update` | Update a specific feed (by ID) |
| `-a` | `--archive` | Archive the current snapshot (adds a timestamp) |
| `-una` | `--unarchive` | Unarchive (checks for same-name conflicts) |
| `-r` | `--remove` | Remove a feed and all its articles and vectors (add `--yes`/`-y` to skip confirmation, for scripts/AI non-interactive use) |
| `--show <id>` | | Full-screen reading (no sidebar; `W` enters full TUI, `Esc` exits); with `--json` outputs unrendered original JSON to AI/scripts |
| `--versions <id>` | | List all historical versions of an article (with status and time; `--json` structured); to read an old version use `--show <that version's id>` |
| `--diff <id> [vA vB]` | | Diff an article's body between two versions (default: two latest); `--json` structured output for AI |
| `--export <id \| feed:N \| all> [out.md\|dir]` | | Export articles as Markdown (asks before `--export-all`; `--yes` skips) |
| `--fulltext <id>` | | Fetch an article's full text to the local cache (consent required first time; `--yes` skips consent/confirmation, `--json` structured); `--purge-fulltext [id]` clears the cache |
| `--feed-info <id>` | | Feed identity & health: name/type/author/website/last update/latest article/status (`--json` structured) |
| `--export-opml [file]` | | Export all feeds as OPML (default `feeds.opml`) |
| `--import-opml <file>` | | Bulk import feeds from OPML (skips existing by FeedUrl) |
| `--like <id> [--ai [reason]]` | | Mark an article: user like (♥) or AI judgment (🤖); `--likes [--json]` views all marks |
| `--today [--json] [--refresh] [--quick N]` | | Today's reading list (rule-based selection, cap = target 5 articles; includes estimated time and reasons). **One fixed bowl per day** (cached for the day; new articles don't auto-enter the list that day); `--refresh` regenerates explicitly; for same-day new content use `--grep`/`--show` directly; enable Sumenia to track completion progress |
| `--sync [--feed N] [--json]` | | Update only feeds that are "due" (optional `--feed <id>` to limit to one; `--json` structured) |
| `--update-all` | | Force-update all feeds (equivalent to TUI `F6`) |
| `--schedule <id> <expression>` | | Set a feed's update schedule (see [Update Scheduling](/en/usage/update-scheduler)): `30m` / `1h` / `7d` / `daily@10:00` / `weekly@Mon 08:00` / `manual` |
| `--purge-fulltext [id]` | | Clear the full-text cache (no ID = clear all; see [Full-Text Fetch](/en/usage/full-text-fetch)) |
| `telemetry status\|show\|enable\|disable\|clear\|export` | | View/toggle/delete/export the local reading telemetry **Sumenia** (off by default; see [Telemetry & Privacy](/en/features/telemetry)) |
| `simon status\|level <1\|2\|3>\|export-key <file>\|import-key <file>` | | Security guardian **孟思琳 (simon)**: on by default, cannot be disabled, level only adjustable (1=basic / 2=strict / 3=extreme); level 2 blocks destructive writes for non-interactive calls, level 3 blocks all CLI calls + full data encryption; **downgrading only in the TUI command bar**; keys auto-generated and stored in the OS credential store (see [Security](/en/features/security)) |
| `--init` / `--config` / `--index` / `--reindex` / `--search` / `--grep` / `--summary` | | AI-related commands, see [AI Commands](/en/usage/ai-commands) |
| `--insights [--interval]` | | Reading insights: per-feed reading facts (opened/finished/completion rate/♥🤖 likes/backlog) + explainable `reasons` (no black-box scores); `--insights-interval` schedules reminders. Requires telemetry enabled |
| `--dedup <scan\|hide-cluster\|hide\|list\|undo>` | | Cross-source dedup: detects "possibly the same article" by paragraph overlap (outputs **duplicate clusters** since v1.1.4 — no pair explosion); `hide-cluster <representativeId>` hides a whole cluster in one shot (data kept), `hide <hiddenId> <canonicalId>` hides a single article, `undo <key>` restores, `list` views |
| `--policy <action> --feed <id>` | | Source Policy (v1.1): `lower_frequency` / `archive` / `tag` / `keep` / `unsubscribe`; rules only via your confirmation (`createdBy: user`), AI never auto-writes |
| `--onboarding` | | Onboarding (v1.1): add recommended feeds by domain (AI / Dev / Tech companies) in one click; `templates.json` is editable |
| `ingest --stdin [--origin <url>] [--producer <name>] [--title <t>] [--ttl <days>] [--yes]` | | Store piped input as **evidence** (v1.2 evidence library) |
| `ingest --url <url> [--ttl <days>] [--yes]` | | Store a web page directly as a `watch` target (first snapshot, SSRF-guarded) |
| `ingest --evidence <file\|--stdin>` | | Import a `sip-evidence-v1` evidence package (schema-validated) |
| `ingest list [--stale] [--group N] [--tag <tag>]` / `show <id>` / `confirm <id>` / `rm <id> [--yes]` | | Browse / view / verify / forget (light store, easy delete); `--tag` filters by tag |
| `ingest refresh [id \| --stale \| --all]` | | Re-fetch to keep fresh (stale watch targets by default) |
| `ingest group add <label> [--seed <query>] \| rename <N> <new> \| rm <N>` / `groups` | | Topic grouping (needs AI embedding configured; topics are yours to define) |
| `ingest retrieve <query> [--top N] [--group N]` | | Evidence retrieval with full context (verbatim excerpts/source/version/freshness/verification/consensus/grade/reversal, for agents) |
| `ingest ask <question>` | | Answer from your evidence only — **quote, never paraphrase** |
| `ingest tree <id> [--depth N]` | | View tree-structured comments (v1.3) |
| `ingest tag list` / `tag add <id> <tag>` / `tag rm <id> <tag>` | | Multi-tag management (v1.3) |
| `ingest stats` | | One-line evidence library summary (v1.4) |
| `ingest cleanup --stale [--min-views N] [--dry-run] [--yes]` | | Clean stale evidence (v1.4) |
| `ingest watch add <id> [--interval <min>]` / `watch rm <id>` / `watch list` / `watch refresh [id] [--all]` | | Web monitoring (v1.4) |
| `--diff <id> [--semantic]` | | Semantic diff showing distance and change grade (v1.4) |
| `-h` | `--help` | Show help |

> v1.1 adds: `--dedup` (cross-source dedup), `--policy` (Source Policy), `--insights` / `--insights-interval` (reading insights), `--onboarding` (recommended-feed templates); v1.2 adds: `ingest` (evidence library); v1.2.2 adds: `ingest tree` (tree comments), `ingest tag` (multi-tag), `ingest stats` (stats), `ingest cleanup` (cleanup), `ingest watch` (web monitoring), `--diff --semantic` (semantic diff). See [Features Overview](/en/features/).

> Global parameters: `--ignoresafeannouncement` (skip extraneous output like the safety banner, for scripts/AI), `--lang <code>` (switch language, e.g. `--lang en-US`). Output is always UTF-8.

## Exit Codes (for scripts / AI to judge success)

CLI commands exit `0` on success, and return a non-zero code by category on failure:

| Exit code | Meaning |
|--------|------|
| `0` | Success (including normal cancellation, e.g. answering n to the `-r` confirmation) |
| `1` | General error (argument/usage error, unknown command, DB error, partial update failure) |
| `2` | Network / service unreachable (`NETWORK_ERROR`, `MODEL_UNAVAILABLE`, download timeout) |
| `3` | Resource not ready (AI not configured, API key missing/invalid, `NO_INDEX`, feed/article not found, empty query) |

> In `--json` mode, errors still output a structured `{"success": false, "error": {...}}` first, then exit with the corresponding non-zero code.
