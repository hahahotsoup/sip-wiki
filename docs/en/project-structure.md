# Project Structure

```
├── sip.csproj          # project file (program name: sip)
├── RssReader.cs        # all code (single file)
├── publish.ps1         # single-file packaging script (win/linux/mac platforms)
├── languages/          # default language files (copied next to the exe at build/publish time, also embedded as a fallback)
│   ├── zh-CN.json      # Simplified Chinese
│   ├── zh-Moe.json     # Cat-styled Chinese
│   └── en-US.json
├── sip-测试报告-2026-08-11.md  # first-round comprehensive test report (51 features + 30+ exception injections + security penetration + stress)
├── sip-完整测试报告-2026-08-12-最终版.md  # full test report (~230+ tests, overall 8.4/10, three-round iteration v1.0→v1.1→v1.1.4)
├── .opencode/skills/   # AI agent skill for using the CLI (teaches AI to call sip)
│   └── sip-rss/SKILL.md
├── readwithhotsoup/    # runtime data directory (auto-created next to the exe on first launch)
│   ├── rss.db          # SQLite database
│   ├── telemetry.db    # telemetry database (Sumenia, independent of rss.db, off by default)
│   ├── ai_config.json  # AI non-sensitive config (generated at runtime)
│   ├── fulltext/       # full-text fetch cache (<itemId>.md + vecs.json)
│   ├── article_signals.json  # article marks (♥ user / 🤖 AI)
│   ├── reading_progress.json  # reading progress memory
│   └── languages/      # language files (default translations copied here, editable directly)
└── README.md
```
