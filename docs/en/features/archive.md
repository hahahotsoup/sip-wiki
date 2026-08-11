# 📚 Smart Archiving

- **Version tracking**: automatically detects every modification to an article, saving v1, v2, v3…
- **Content diff**: `sip --diff 123 v1 v3` clearly shows the changes
- **Snapshot archiving**: timestamped snapshots of a whole feed, permanently preserving the complete state at a moment in time
- **Reading progress memory**: exit the TUI and come back, resume from where you left off
- **Feed identity & health**: `sip --feed-info <id>` shows a feed's name/type/author/website/last update/latest article/status; `-l` auto-marks "⚠ not updated for a long time" and "✗ failed N times"
- **Content quality marking**: `-l <id>` marks articles that are summary-only (`[summary]`) or have no body (`[no body]`); JSON output carries a `quality` field (`full` / `short` / `empty`)
