# Web UI (sip-web)

> Don't want to open a terminal? Give sip a local Web UI: manage subscriptions, read articles, full-text / semantic search, Today's Hotsoup, and version diffs right in the browser. It translates **web requests into HTTP calls** — a lightweight HTTP service turns each request into a `sip <command> --json` CLI invocation and returns sip's structured output to the page unchanged.
>
> **中文版**：[简体中文](/使用/Web.html) · Repo: [hahahotsoup/sip-webapiextra](https://github.com/hahahotsoup/sip-webapiextra)

## How it fits together

```
Browser (http://127.0.0.1:8777)
        │ Web requests (REST / JSON)
        ▼
   sip-web.py (local HTTP server · translation layer)
        │ translated into CLI calls: sip <command> --json --ignoresafeannouncement
        ▼
   sip executable (sip.exe / sip, local single-file)
        │
        ▼
   Your subscribed trusted RSS sources (readwithhotsoup/ data dir)
```

**Core**: `sip-web.py` is a "translation layer" — every request from the browser is translated into one `sip` CLI command, and the JSON output is passed back unchanged. It does not re-implement sip's logic; it is just a Web skin over the sip CLI.

## Prep: put sip-web next to sip

sip-web needs to find the `sip` executable — **copy the files into the folder that contains `sip.exe` (or `sip`)**:

```text
sip.exe          ← your sip program
readwithhotsoup/ ← your data dir (created by sip)
sip-web.py       ← this program (web server + translation layer)
index.html       ← the web UI
start-sip-web.bat / start-sip-web.sh   ← optional launchers
```

> Why together? sip's data lives in `readwithhotsoup/` (next to the exe); the translation layer invokes sip with that directory as the working directory, so both read and write the same data.

## Start

```bash
# Windows: double-click start-sip-web.bat, or from a terminal
python sip-web.py

# macOS / Linux
./start-sip-web.sh

# Custom port / sip path
python sip-web.py --port 9000 --sip /path/to/sip
```

Open **http://127.0.0.1:8777** in your browser.

### CLI options

| Option | Description |
|--------|-------------|
| `--port 9000` | Listen port (default 8777) |
| `--host 0.0.0.0` | Listen address (default 127.0.0.1, local-first) |
| `--sip /path/to/sip` | Path to the sip executable (default: same dir as the script) |
| `--timeout 300` | Per-call CLI timeout in seconds |

## What the Web UI can do

| UI | Translated sip command |
|----|------------------------|
| 🏠 Overview (stats + Today's Hotsoup) | `sip -l` / `sip --today` |
| 📡 Feed list / article list | `sip -l` / `sip -l <id>` |
| 📖 Article reading (HTML body / fulltext first) | `sip --show <id> --json` |
| 📄 Full-text search (no AI needed) | `sip --grep <term> --json` |
| 🧠 Semantic search (needs AI config) | `sip --search <term> --json` |
| 🍵 Today's Hotsoup (with change digest) | `sip --today [--refresh] --json` |
| ➕ Add a feed | `sip -d <url>` |
| 🔄 Sync / update all | `sip --sync` / `sip --update-all` |
| 🗄 Archive / unarchive / delete | `sip -a` / `sip -una` / `sip -r --yes` |
| ♥ Like / likes list | `sip --like <id>` / `sip --likes` |
| 📥 Fetch fulltext | `sip --fulltext <id> --yes --json` |
| 📜 Versions / ⇄ diff | `sip --versions <id>` / `sip --diff <id> --json` |
| ✨ Summary (needs AI config) | `sip --summary <id> --json` |

## HTTP API (the translation layer)

All endpoints return sip's original JSON shape (`{"success":true,"data":{...}}` or `{"success":false,"error":{...}}`), so other tools (scripts, agents, automation) can integrate directly.

```
GET    /api/status                     sip version & connectivity
GET    /api/feeds                      list feeds
POST   /api/feeds            {url}     add a feed
GET    /api/feeds/{id}                 articles of a feed (?limit=N)
GET    /api/feeds/{id}/info            feed health info
POST   /api/feeds/{id}/update          update a feed
POST   /api/feeds/{id}/archive         archive
POST   /api/feeds/{id}/unarchive       unarchive
DELETE /api/feeds/{id}                 remove feed (--yes)
POST   /api/feeds/sync                 update only due feeds
POST   /api/feeds/update-all           force-update everything
GET    /api/articles/{id}              article detail (with body)
GET    /api/articles/{id}/versions     version history
GET    /api/articles/{id}/diff         diff (?from=v&to=v)
POST   /api/articles/{id}/fulltext     fetch fulltext
DELETE /api/articles/{id}/fulltext     purge fulltext cache
POST   /api/articles/{id}/like         like / unlike
POST   /api/articles/{id}/summary      generate summary
GET    /api/likes                      liked articles
GET    /api/search/grep?q=…            full-text search (?feed=N&limit=N)
GET    /api/search/semantic?q=…        semantic search (?feed=N&threshold=0.7)
GET    /api/today?refresh=1            Today's Hotsoup
GET    /api/config                     AI config status
```

## Security

- **Local-first**: listens on `127.0.0.1` by default — data never leaves your machine
- **Injection-proof**: arguments go to the child process as a list (no shell), commands are whitelisted
- **Timeouts**: every CLI call has a timeout so nothing hangs forever
- **Respects sip's safety boundaries**: `sip --init` (API key entry) still requires a real terminal; the Web UI never runs it. Fulltext fetching inherits sip's SSRF protection.

## FAQ

- **"Cannot find sip" on startup**: put `sip-web.py` next to `sip.exe`, or pass `--sip` with the full path.
- **Search reports "AI not configured"**: semantic search needs an Embedding provider configured via `sip --init` (run manually in a real terminal); full-text search (`--grep`) needs no AI and always works.
- **Cross-platform?** The backend uses only the Python standard library (3.10+); works on Windows / macOS / Linux. The frontend is a single HTML page with no build step.
