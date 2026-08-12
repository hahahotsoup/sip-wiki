# Roadmap (not yet implemented)

The following capabilities are in the design but **not in the current version** — no false advertising:

- 🔒 **Whitelist / blacklist filtering** (domain-level, keyword-level) + **filter logs**
- ✅ **Cross-feed article deduplication** (shipped in v1.1): `--dedup` detects "possibly the same article" by paragraph overlap; since v1.1.4 it outputs **duplicate clusters** (`hide-cluster <representativeId>` hides a whole cluster, data kept, undoable) — see [Features Overview](/en/features/)
- 📖 **System TTS reading** (Windows/macOS/Linux native voices) + **author audio priority** (detect RSS audio attachments, prefer playing the original sound)
- 📖 **Sip Today personalization**: v1 is rule-based selection; once Sumenia accumulates enough behavioral data, evolve toward personalized ranking explaining "why this was recommended"
