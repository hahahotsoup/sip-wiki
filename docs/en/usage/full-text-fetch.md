# Full-Text Fetch

When an RSS summary is too short (<100 chars), you can fetch the original into the local cache:

```bash
sip --fulltext <id>            # fetch full text (consent phrase required first time; --yes skips consent/confirmation)
sip --fulltext <id> --json     # structured output {itemId, cached, content}
sip --purge-fulltext [id]      # clear the cache (no ID = clear all)
```

- Full text is stored in `readwithhotsoup/fulltext/<itemId>.md` (file cache, **does not modify the database**); if the feed is indexed, the full-text vector is stored in `vecs.json` and merged into semantic search; `--index`/`--reindex` auto-backfill full-text vectors for articles with an existing full-text cache (fetching full text before indexing no longer misses it)
- **Content is always the primary body**; full text is only supplementary. When displaying, the original appears above and the full text below, separated by a divider
- Fetching creates no new version and doesn't participate in diff/updates
- **Fetch security boundary (SSRF protection)**: only http/https links allowed; loopback (127.0.0.1/::1) and link-local/cloud metadata addresses (169.254.0.0/16) are always rejected; private ranges (10/8, 172.16/12, 192.168/16, 100.64/10) are rejected by default — to fetch intranet feeds, set `"allowPrivateNet": true` in `ai_config.json`
- `sip --show <id> --json` outputs a `fulltext` field when a full-text cache exists (AI/scripts can read the full text without first running `--fulltext` then reading a file)
