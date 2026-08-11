# Quick Start

## Download directly (recommended)

Download the latest **single-file executable** from [Releases](https://github.com/hahahotsoup/sipintui/releases) (no extraction needed, no pile of DLLs):

| Platform | File |
|------|------|
| Windows x64 | `sip-win-x64.exe` |
| Linux x64 | `sip-linux-x64` |
| macOS Intel / Apple Silicon | `sip-osx-x64` / `sip-osx-arm64` |

After downloading, run it directly:

```bash
./sip.exe            # Windows: enter TUI (creates readwithhotsoup/ data dir on first launch)
./sip.exe --help     # or use the CLI directly
```

- **Single file + built-in official translations**: language files are embedded into the exe, auto-restored when the data directory is missing — a single exe works even if that's all you copy
- **Framework dependency**: requires the [.NET 10 runtime](https://dotnet.microsoft.com/download) to be preinstalled on the target machine (small footprint); to skip the runtime use a self-contained publish (see below)
- **Data directory**: on first run, `readwithhotsoup/` is auto-created next to the exe — the SQLite database `rss.db`, AI config, language files, full-text cache, reading progress, telemetry, and **all data live here**; back up or migrate by copying the whole folder

## AI skill

The [.opencode/skills/sip-rss](https://github.com/hahahotsoup/sipintui/tree/main/.opencode/skills/sip-rss) directory in the source contains a skill you can hand directly to AI. You can also download `sip-skill.zip` directly from [Releases](https://github.com/hahahotsoup/sipintui/releases) (shipped alongside the single-file builds for each platform).
