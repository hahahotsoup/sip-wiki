# TUI Mode

Run `sip` directly (no arguments) to enter the folder-style TUI. On startup it shows the **start screen** (slogan + Dashboard data panel); press Enter to enter, `Q` to quit.

The left side is a **tree view merging feeds and articles**: feeds are parent nodes (`▶`/`▼` to expand/collapse); expanding a feed shows all its articles, like browsing folders. **Feeds are all collapsed by default** (press `l`/`Enter`/`Space` to expand; expanded feeds stay expanded after a refresh). **Overlong titles auto-wrap** (never truncated) so you can see them at a glance. Each article shows only its **latest version**; if the author edited it and older versions exist, the title shows a **`✎`** mark — select it and press **`V`** to view all versions. When an article is selected, the right side **renders its body in Markdown**.

## Shortcuts

| Action | Description |
|------|------|
| `j` / `k` (or `↑` / `↓`) | Move up/down in the sidebar (overlong titles auto-wrap) |
| `l` / `Enter` / `Space` | On a feed: collapse/expand; on an article: jump to the body page |
| `←` | Return to the sidebar from the body pane |
| `b` (or `PageUp`) | Page the sidebar (`Space` only "opens" in the sidebar) |
| `Space` / `PageDown` | Page within the body pane (with saved progress, `Space` jumps back to the last position) |
| `Ctrl+D` / `Ctrl+U` | Half page down / half page up in the body pane (vim habit) |
| `i` | Immersive reading: hides sidebar/status bar/status line, body fills the screen (press `i` again to restore) |
| `U` | Download & update the current feed (same as CLI `-u`) |
| `F6` | Update all feeds |
| `A` | Archive the current feed (title gets a timestamp, same as CLI `-a`) |
| `R` | Unarchive (same as CLI `-una`) |
| `X` | Delete the selected feed / single article (same as CLI `-r`) |
| `D` | Add a new feed (same as CLI `-d`) |
| `S` | Semantic search (same as CLI `--search`) |
| `Y` | Generate a summary for the current article (same as CLI `--summary`) |
| `G` | Toggle "full body / article summary" |
| `V` | View article versions/change history (only for articles marked `✎`; enter an ID to view an old version's body) |
| `M` (or the `manage` command) | Open the "feed management page": lists all feeds full-screen, `j/k` to move, `u` update, `a` archive, `r` unarchive, `x` delete, `s` schedule, `d` add feed |
| `P` (or the `report` / `insights` command) | Reading insights page (per-feed reading facts; requires telemetry enabled) |
| `C` | Collapse/expand the left sidebar |
| `H` | Shortcut help |
| `F2` | About page |
| `Esc` | Open the bottom command line; type a command and press `Enter` to run, press `Esc` again to close |
| `Ctrl+O` | Link navigation mode |
| `Q` | Quit the program |

> **Reading progress memory**: each article's scroll position is remembered (stored in `readwithhotsoup/reading_progress.json`, does not touch the database) — when you reopen an article with saved progress, the bottom status line shows "▷ Press Space to jump back to the last position"; press **`Space`** to jump straight back (with boundary validation, so it won't jump to a negative value or beyond the body).

## Bottom Command Line

Press `Esc` to bring it up (hidden by default). You can type commands identical to the CLI, for example:

```
u 2             # update feed 2
d https://xxx   # download and add a new feed
a 2             # archive feed 2
r 2             # unarchive feed 2
s keywords      # semantic search
g keywords      # full-text search (no AI dependency)
fetch           # fetch the current article's full text (consent phrase needed first time; prompts when summary is too short)
manage          # open the feed management page (same as M)
y               # generate a summary for the currently selected article
init            # AI config wizard (dialog version)
index           # vectorize the currently selected feed
reindex         # clear all vectors and re-vectorize
dedup           # cross-source dedup (no arg = interactive pick; or dedup scan|list|undo)
insights        # reading insights (same as P / report)
insights-interval <7d|30d|off>  # scheduled insights reminder
telemetry ...   # telemetry management (status/show/enable/disable/clear/export)
config          # view AI config
q               # quit
```
