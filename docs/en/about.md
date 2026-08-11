# About sip

> **—「Taste it. Savor it.」**
>
> **Reading is like sipping soup — don't keep glancing into the bowl, close your eyes and savor it first.**

sip is an information firewall: letting you and your AI only see content you trust.

It is not an algorithm-driven reader, nor a feed meant to make you "scroll more". It is a **local-first transparent information filter and reading assistant** — you specify your sources, sip guards and assists in filtering them while improving the reading experience, so you and your AI agents get answers from a clean, traceable dataset.

## Design Philosophy

| Principle | Description |
|------|------|
| **Local-first** | Data stays in your hands (SQLite + file cache), no account needed, reading history never uploaded |
| **Transparent decisions** | Only see sources you subscribe to, no algorithmic black box; filter rules are simply the feed list you maintain |
| **Version is truth** | What did the author change? When? sip records it all for you, losing no history |
| **AI reads a whitelist only** | AI summaries and semantic search rely only on sources you trust, eliminating low-quality citations |
| **Out of the box, ultra-light** | Single-file exe, zero dependencies, works on launch; AI features called on demand, never pre-run |

**Design boundaries**: sip only does two things — **deterministic rules** and **local fact storage**; anything requiring judgment/explanation/conversation is left to agents and users. Today's selection rules for the Hot Soup Teahouse remain fixed and explainable; once enough telemetry data accumulates for personalization and other "intelligence", it will either be implemented as new deterministic rules or live in the agent layer — not in the program.

It won't make you scroll more, but it will let you read with more peace of mind.

## Author & Blog

sip is developed and maintained by **hahahotsoup**.

- Blog: [Hot Soup Teahouse](https://blog.hotsouprealm.top/)
- RSS: <https://blog.hotsouprealm.top/atom.xml>
- GitHub: [sipintui](https://github.com/hahahotsoup/sipintui) (source code)

Follow the Hot Soup Teahouse. Follow us, thank you. 🐾

## Open Source License

sip is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

You are free to use, modify, and redistribute this software under the terms of the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) license.

## Acknowledgements

sip is built with the following open-source technologies:

- [.NET](https://dotnet.microsoft.com/) · [Microsoft.Data.Sqlite](https://learn.microsoft.com/dotnet/standard/data/sqlite)
- [CodeHollow.FeedReader](https://github.com/arminreiter/FeedReader) (RSS/Atom parsing)
- [DiffPlex](https://github.com/mmanela/diffplex) (text diff)
- [Terminal.Gui](https://github.com/gui-cs/Terminal.Gui) (TUI)
- [HtmlAgilityPack](https://html-agility-pack.net/) (HTML parsing)
- [ktsu.CredentialCache](https://www.nuget.org/packages/ktsu.CredentialCache) (credential storage)

This documentation site is built with [VitePress](https://vitepress.dev/) + [Teek](https://github.com/Kele-Bingtang/vitepress-theme-teek).

© 2026 hahahotsoup with <3
