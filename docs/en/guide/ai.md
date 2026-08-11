# AI Related

- AI (deepseek / opencode / chatgpt) used to generate parts of the code and comments
- Built-in embedding semantic search and LLM summaries (see the [AI Commands](/en/usage/ai-commands) section)

## Initialization Notes for AI Agents / Scripts

By default **no model is configured and nothing is vectorized** — running `--search` directly will report "AI not configured" or "no vector index yet". AI should first run `sip --config` to confirm initialization; if config is missing run `sip --init`, if the index is missing run `sip --index`, if the model was changed run `sip --reindex`. Output is always **UTF-8**.

## Retrieval Strategy (recommendations for agents)

1. **Confirm hits with full-text search first**: `--grep` is exact keyword matching (title/body/summary), no AI dependency, no threshold issues. The default is a safe snippet mode (each article only outputs "ID + title + hit count + ±50-char snippet", max 20 articles × 10 snippets), so large sources' bodies won't flood the context; if too many hits add `--limit N`, for structured results use `--json`, for a full article use `--show <id> --json`.
2. **Then expand with semantic search**: `--search` finds "articles similar in meaning but different in wording" by semantic similarity; across all sources it's a full vector scan, which gets noticeably slower with large data — prefer `--grep`, use `--search` only when you truly need semantic expansion, combined with `--feed <id>` to limit sources and `--threshold` to tune the threshold.
3. **Vary the keywords**: break the topic into 3–6 different keywords/phrases/synonyms/English originals, search each, then merge and dedupe.
4. **Watch the threshold**: default 0.7. 0–2 results → lower to 0.5–0.6; lots of noise → raise to 0.75–0.8; local bge-m3 often lands at 0.5–0.6, so try 0.5; hits from full-text-fetched articles typically score 0.1–0.2 lower than title vectors, so you can lower the threshold and retry.
5. **Read the full text**: use `sip --show <id> --json` (AI should always pass `--json`; bare runs enter the full-screen reading UI); when a full-text cache exists, the JSON includes a `fulltext` field — use it first.

## AI skill

The [.opencode/skills/sip-rss](https://github.com/hahahotsoup/sipintui/tree/main/.opencode/skills/sip-rss) directory in the source contains a skill you can hand directly to AI. You can also download `sip-skill.zip` directly from [Releases](https://github.com/hahahotsoup/sipintui/releases) (shipped alongside the single-file builds for each platform).
