# Update Scheduling (per-feed auto-update, no wasted resources)

Each feed can have its own **update schedule**; the program only fetches when the feed is "due". Expressions: interval type `5m` / `30m` / `1h` / `7d`, fixed time `daily@10:00`, `weekly@Mon 08:00`, manual `manual`.

```bash
sip --schedule 1 30m            # update feed 1 every 30 minutes
sip --schedule 2 daily@10:00    # update feed 2 at 10:00 daily
sip --schedule 3 manual         # set feed 3 to manual
sip -l                          # each feed shows "frequency · last · next"
```

- **When the program opens**: silently syncs all due feeds
- **While the program is running**: checks every 15 minutes in the background, updating only what's due
- **In CLI mode there's no auto-sync**, but it reminds you when feeds are due (`--ignoresafeannouncement` doesn't suppress this reminder; `--json` mode auto-suppresses it to avoid polluting structured output)
- **Due determination**: `now >= last fetch time + schedule due point`; each successful fetch rewrites the "last fetch time"
