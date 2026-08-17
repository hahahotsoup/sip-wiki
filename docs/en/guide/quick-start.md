# 5-Minute Quick Start

> Goal: **within 5 minutes, go from download to your first taste of sip's value** — add a feed, see today's list, track an article revision.

## Minute 0: Download and run

Download the latest **single-file executable** from [Releases](https://github.com/hahahotsoup/sipintui/releases) (no extraction needed, no pile of DLLs):

| Platform | File |
|------|------|
| Windows x64 | `sip-v1.2.0-win-x64.exe` |
| Linux x64 | `sip-v1.2.0-linux-x64` |
| macOS Intel / Apple Silicon | `sip-v1.2.0-osx-x64` / `sip-v1.2.0-osx-arm64` |

> Artifact names carry **version + architecture** (`sip-v<version>-<platform>`, no more overwriting); older releases used names like `sip-win-x64.exe`. First run creates the `readwithhotsoup/` data directory next to the exe.

```bash
./sip.exe            # Windows: enter TUI (creates readwithhotsoup/ data dir on first launch)
./sip.exe --help     # or use the CLI directly
./sip.exe --version  # show the version (since v1.1.4 it also shows the build time, e.g. sip v1.2.0 (built 2026-08-17 09:39))
```

- **Single file + built-in official translations**: language files are embedded into the exe, auto-restored when the data directory is missing — a single exe works even if that's all you copy
- **Framework dependency**: requires the [.NET 10 runtime](https://dotnet.microsoft.com/download) to be preinstalled on the target machine (small footprint); to skip the runtime use a self-contained publish (see [Build from Source](/en/guide/build))
- **Data directory**: on first run, `readwithhotsoup/` is auto-created next to the exe — the SQLite database `rss.db`, AI config, language files, full-text cache, reading progress, telemetry, and **all data live here**; back up or migrate by copying the whole folder

## Minute 1: Add your first feed

```bash
sip -d https://blog.hotsouprealm.top/atom.xml     # add a feed (press D inside the TUI too)
sip -l                                            # list all feeds, confirm it's in
```

> You can also batch-import with `sip --import-opml file.xml` (e.g. exported from FreshRSS).

## Minute 2: Update, then read

```bash
sip -u 1             # update feed 1, fetch the latest articles
sip -l 1             # list that feed's articles
sip --show 42        # open an article in full-screen read mode (W → full TUI, Esc → back)
```

Inside the TUI, press Enter to read, `j/k` to move, `Space` to page, `i` for immersive reading. **Full keyboard, no ads, no recommendation feed.**

## Minute 3: See what to read today

```bash
sip --today          # 5 rule-based picks for today, with estimated reading time and reasons
```

This is sip's "one bowl a day" — a fixed 5 articles, read and close. The top section also lists **today's changes** (who added, who edited).

## Minute 4: Track an "article revision"

```bash
sip --versions 42    # this article's version history
sip --diff 42        # what changed in the last two versions
```

When you see diff output (added/removed lines with before/after context), you've touched sip's core capability that distinguishes it from FreshRSS.

## Minute 5: Next steps

- **Want AI search/summaries**: `sip --init` configure model → `sip --index` vectorize → `sip --search "topic" --json`
- **Want a group bot**: [Bot Integration](/en/usage/bot-integration) (OpenClaw / Cherry Studio, QQ/WeChat/Discord/Telegram)
- **Want scheduled auto-updates**: `sip --schedule 1 daily@08:00`
- **Want a whitelist for family**: [Practical Scenario 4](/en/guide/practical-scenarios)

## AI skill

The [.opencode/skills/sip-rss](https://github.com/hahahotsoup/sipintui/tree/main/.opencode/skills/sip-rss) directory in the source contains a skill you can hand directly to AI. You can also download `sip-skill.zip` directly from [Releases](https://github.com/hahahotsoup/sipintui/releases) (shipped alongside the single-file builds for each platform).

---

> More workflows in [Practical Scenarios](/en/guide/practical-scenarios); why sip over other readers in [Competitors](/en/guide/competitors).
