# Project Structure

```
├── sip.csproj            # project file (net10.0, version v1.1.45)
├── RssReader.cs          # main program: CLI entry / subscriptions / reading / search / AI
├── Tui.cs                # TUI (folder view, immersive reading, command bar)
├── Sumenia.cs            # telemetry service (Sumenia, off by default, separate DB)
├── simon.cs              # security guardian & data encryption (孟思琳, on by default, cannot be disabled)
├── publish.ps1           # single-file packaging script (win/linux/mac platforms)
├── languages/            # default language files (copied next to the exe at build/publish time, also embedded as a fallback)
│   ├── zh-CN.json        # Simplified Chinese
│   ├── zh-Moe.json       # Cat-styled Chinese (masochist edition)
│   └── en-US.json
├── prompts/              # agent persona prompts (Sumenia sumenia.md / sumenia.en.md)
├── tools/                # dev tools (language key sync add-lang-keys, benchmarks bench-gen / bench-run)
├── tests/Sip.Tests/      # 38 process-level black-box test cases (CLI contract / SSRF matrix / dedup invariants / terminal injection / simon)
├── .github/workflows/    # GitHub Actions CI (build + test + publish smoke)
├── .opencode/skills/     # AI agent skill for using the CLI (teaches AI to call sip)
│   └── sip-rss/SKILL.md
├── docs/                 # in-repo planning docs (e.g. 规划-测试基线与拆TUI)
├── sip-测试报告-2026-08-11.md  # first-round comprehensive test report (51 features + 30+ exception injections + security penetration + stress)
├── sip-完整测试报告-2026-08-12-最终版.md  # full test report (~230+ tests, overall 8.4/10, three-round iteration v1.0→v1.1→v1.1.4)
├── sip-v1.1-新功能测试清单.md      # v1.1 new-feature checklist (internal)
├── readwithhotsoup/    # runtime data directory (auto-created next to the exe on first launch)
│   ├── rss.db          # SQLite database (SQLCipher-encrypted at guardian level 3)
│   ├── telemetry.db    # telemetry database (Sumenia, independent of rss.db, off by default)
│   ├── ai_config.json  # AI non-sensitive config (generated at runtime)
│   ├── simon_events.json  # 孟思琳 event log (DB repairs / blocked calls / level changes, last 200)
│   ├── fulltext/       # full-text fetch cache (<itemId>.md + vecs.json; SIPC1-encrypted at level 3)
│   ├── article_signals.json  # article marks (♥ user / 🤖 AI)
│   ├── reading_progress.json  # reading progress memory
│   └── languages/      # language files (default translations copied here, editable directly)
└── README.md
```
