# 🔒 Security

> sip is conservative by nature, because it believes your information is yours first.
>
> In one sentence: it does not collect, does not track, does not quietly upload your stuff.

sip's security system has three layers: **data ownership** (all local, no sign-up, no cloud), **conservative by default** (telemetry off by default, API keys never in scripts), and at its core the **孟思琳 (simon) security guardian** (on by default, cannot be disabled, level only adjustable).

## 孟思琳 (simon) — Security Guardian (on by default, cannot be disabled)

孟思琳 is sip's security subsystem personified (source: `simon.cs`). She handles:

- **Automatic database repair** (integrity check + WAL self-healing)
- **SSRF protection** (full-text fetch URL validation)
- **Terminal injection blocking** (ANSI escape stripping)
- **Non-interactive call control** (script/AI calls blocked by level)
- **Data encryption** (level 3: SQLCipher + AES-GCM)

### Levels

Only levels 1 / 2 / 3 exist — **there is no 0 = cannot be disabled**:

| Level | Name | Behavior |
|------|------|------|
| 1 | Basic (default) | Integrity self-healing + baseline protections |
| 2 | Strict | CLI write operations always rejected; read-only commands work, or use the TUI |
| 3 | Extreme | All CLI calls rejected (sole exception `simon status`), TUI only; **data encryption enabled** |

- Levels can only be raised by scripts — **downgrading only works in the TUI command bar**; the CLI always refuses (`SIMON_LOCKED`) — "孟思琳 won't let herself be weakened by scripts or CLI"
- The read-only whitelist (allowed at level 2) includes `ingest list/show/retrieve/groups/ask`; `ingest` write commands (`--stdin` / `--url` / `--evidence` / `refresh` / `group` etc.) are blocked together with other non-interactive calls; `ingest --url` shares the same SSRF protection as full-text fetch
- The authoritative level value lives in the **OS credential store** (editing `sip_settings.json` cannot downgrade), scoped by a hash of the data directory — multiple sip copies on one machine don't affect each other
- Blocking principle: the CLI (including interactive terminals) is an untrusted channel; the TUI command bar is always a human channel and is never blocked
- Everything is logged in `readwithhotsoup/simon_events.json` (last 200 entries: `repair_db` / `blocked_cmd` / `level_change` / `key_import`)
- Persona lines: repairing the DB —「哎呀，麻烦我修复下数据库——检测到损坏，已保留现场并重建」(oops, let me fix the database — corruption detected, scene preserved and rebuilt); About screen —「🔒 孟思琳正保护着你的软件哦」(🔒 孟思琳 is protecting your software)

### CLI commands

```
sip simon status [--json]                 # level / encryption state / repair & block counts / recent events
sip simon level <1|2|3>                   # adjust level (downgrade only in the TUI command bar)
sip simon export-key <file>               # export the DB encryption key backup (for migration; real terminal required)
sip simon import-key <file>               # import a key backup (real terminal required)
```

Example `simon status` output (excerpt):

> 孟思琳(simon) 安全守护
> 挡位: 2(严格)——默认开启,无法关闭,只能调节
> 数据加密: 已开启(密钥在系统凭据库,自动生成;开启后不可逆)
> 永远作为此软件的最后一道安全防线。
> 数据库修复: 1 次
> 已拦截非交互调用: 3 次

## Data Encryption (level 3)

Raising to level 3 automatically runs **full data encryption**; the original plaintext DB is backed up as `rss.db.plaintext.bak`:

| Data | Method |
|------|----------|
| `rss.db` | SQLCipher (`PRAGMA key`; FTS index tables rebuilt on startup, lazily backfilled on first `--grep`) |
| `fulltext/*.md` cache, `dedup.json` | AES-GCM (`SIPC1` format, reuses the same key) |

- **Keys are auto-generated** (32 random bytes) and stored only in the OS credential store (Windows Credential Manager / macOS Keychain / Linux Secret Service) — **you never have to remember a key**
- Idempotent and crash-safe (two-step atomic replacement; data recoverable if it crashes at any point); **the encrypted DB stays readable after downgrading** — level 3 only decides whether to migrate to encryption
- **Irreversible once enabled** (`status` says "开启后不可逆"); for machine migration use `sip simon export-key` to back up the key and keep it safe (that file can decrypt all your data)
- `export-key` / `import-key` both require a real interactive terminal — so scripts can't steal your key

## Network & Terminal Protections

- **SSRF protection** (full-text fetch): only `http/https`; loopback and link-local addresses are **hard-blocked**; private network ranges are **blocked by default** (intranet feeds can be allowed via `"allowPrivateNet": true` in the AI config); cloud metadata addresses (e.g. 169.254.169.254) are unreachable
- **Terminal injection blocking**: ANSI escape sequences and control characters in RSS titles/bodies are stripped before CLI export and TUI rendering (keeping `\n \t \r` whitespace so Markdown syntax is unaffected) — malicious feeds cannot hijack your terminal

## Database Reliability

- SQLite **WAL mode** + **integrity check**: on abnormal exit the next start self-checks and auto-repairs (large DBs take ~30s, once only); repairs are logged to `simon_events.json`
- The telemetry DB (`telemetry.db`) is independent of `rss.db`; corruption never affects reading data (see [Telemetry & Privacy](/en/features/telemetry))

## Credentials & Privacy

- **API keys**: stored only in the OS credential store; `--init` must be run manually in a real terminal — keys never enter scripts or logs
- **Sensitive records like search terms** stay local only; clear them anytime with `telemetry export` / `telemetry clear`
- Telemetry (Sumenia) is **off by default**, and even when enabled it only records locally, never uploads

## Quality Assurance

The repo ships **71 process-level black-box test cases** (CLI contract / SSRF matrix / dedup invariants / terminal injection / simon guardian & encryption round-trips / ingest) + GitHub Actions CI, auto-regressed on every change; `SimonTests.cs` specifically asserts: "不存在 off = 无法关闭" (there is no off = cannot be disabled).

---

- Character lore & famous lines: see [Meme Encyclopedia (梗百科)](/梗百科) — Chinese only
- Telemetry boundaries: [Telemetry & Privacy](/en/features/telemetry)
- Data directory & file layout: [Project Structure](/en/project-structure)
