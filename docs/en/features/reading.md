# 📖 Assisted Reading

- **TUI folder view**: feed + article tree expansion, keyboard-driven (vim-style shortcuts)
- **Immersive reading mode**: hide all sidebars with one key, read the body full-screen
- **Full-text fetch**: when an RSS summary is too short, `sip --fulltext <id>` fetches the original into the local cache (zero table changes)
- **Markdown rendering**: HTML auto-converts to Markdown, code blocks/lists/links render perfectly
- **Today's hot soup**: `sip --today` gives today's 5 rule-based selections (new in the last 48h / recently updated by the author / full-text quality / ♥🤖 marking weighted, with estimated reading time and reasons), also shown on the start page — **guides a habit of a small daily read first**; personalization evolves once Sumenia accumulates enough behavioral data

  > **One fixed bowl per day**: the day's list is cached (`today_cache`), so new articles don't auto-enter the list that day; to regenerate use `sip --today --refresh`. To read same-day new content just use `--grep`/`--show`. Enable Sumenia to track completion progress.

More operational details in [TUI Mode](/en/usage/tui).
