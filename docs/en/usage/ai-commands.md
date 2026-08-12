# AI Commands (semantic search / smart summaries)

Built-in AI capabilities: **embedding vectorization + semantic search** (RAG) and **LLM article summaries**, usable by AI agents or humans through the same CLI.

```bash
sip --init                          # first-time AI config (model + API key, interactive)
sip --config                        # view/modify AI config
sip --index                         # embed-vectorize articles (interactive feed selection)
sip --reindex                       # re-vectorize after changing the embedding model
sip --search "LLM Agent"            # semantic search (returns matching articles + similarity)
sip --search "RAG" --feed 1 --json  # search within a feed, JSON output
sip --grep "keywords"               # full-text search (title/body/summary, no AI dependency)
sip --summary 12                    # generate a summary for article 12 (saved to DB)
sip --summary feed:3                # generate summaries for all articles of feed 3
sip --summary-all                   # generate summaries for all articles without one
```

## Command Reference

| Command | Description |
|------|------|
| `--init` | Interactive first-time config: choose an Embedding provider, LLM provider, and enter an API key. 🔒 **Requires a real interactive terminal** (security): refuses when stdin is redirected (exit code 1) — AI/scripts cannot drive it through a pipe, a human must run it manually |
| `--config` | Print the current AI config (without secrets) and the config file path |
| `--index` | Batch-generate embedding vectors for the selected feed's articles |
| `--reindex` | After changing the embedding model (dimension change), clear old vectors and fully rebuild |
| `--search <query>` | Semantic search; optional `--feed <id>`, `--threshold 0.7`, `--json`. ⚠️ Performance note: cross-feed search is a full vector scan; prefer `--grep` (SQL LIKE exact match); for semantic expansion use `--feed <id>` to limit to a single feed, or tune `--threshold` to reduce candidates. ⚠️ Full-text vector hits usually score 0.1–0.2 lower than title vectors; when searching for "concepts unique to the body", lower the threshold if results are sparse |
| `--grep <keyword>` | Full-text search (SQL LIKE, no AI dependency); default outputs "ID + title + hit count + ±50-char snippet", with limits (`--limit N` / `--max-snippets N` / `--json` / `--full`). `%`/`_` are matched literally; when hits fall only in links/HTML attributes (0 occurrences in visible text) it hints "(only matched links/attributes, not counted in visible text)" |
| `--summary <id>` | Call the LLM to generate a summary for a single article (`--json` structured); `feed:<id>` generates for every article in that feed |
| `--summary-all` | Generate summaries for all articles whose `Summary` is empty |

**API keys** are stored in the OS native credential store (Windows Credential Manager / macOS Keychain / Linux Secret Service), never written to any file; non-sensitive config lives in `readwithhotsoup/ai_config.json` (case-insensitive keys, auto-completes missing `http(s)://` protocol headers on endpoints; `"allowPrivateNet": true` permits full-text fetching from intranet sites).

## Error Codes

On failure, AI commands report a unified structured error code; in `--json` mode errors return as `{"error": {"code": "...", ...}}`: `MODEL_UNAVAILABLE` / `INVALID_RESPONSE` / `INVALID_JSON` / `EMPTY_RESPONSE` / `API_KEY_INVALID` / `NETWORK_ERROR` / `NO_INDEX` / `FEED_NOT_FOUND` / `ITEM_NOT_FOUND` / `EMPTY_QUERY`.
