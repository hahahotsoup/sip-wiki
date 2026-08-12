# Practical Scenarios: 5 workflows that make sip useful

> This page isn't a feature walkthrough — it gives you **real workflows you can copy and run**. Every scenario has: the goal, the steps, and "what counts as success."

---

## Scenario 1: Let AI answer only from sources you trust

**Goal**: When you or your agent researches, it stops citing Sohu, Baijiahao, and other garbage sources.

**Steps**:

```bash
# 1. Add sources you trust (or batch-import via OPML)
sip -d https://blog.hotsouprealm.top/atom.xml
sip --import-opml your-export.xml

# 2. Configure AI (one-time) — pick Embedding/LLM provider, enter API key
sip --init

# 3. Vectorize (turn articles into semantic vectors)
sip --index

# 4. Search! AI only returns articles from your subscribed sources
sip --search "your topic" --json
```

**Success looks like**: every `--search` result traces back to a source in your subscription list (verify with `sip -l`).

**Level up**:

- Want someone else's (parents/friends) AI to benefit too? Hand them the [sip-rss skill](/en/usage/bot-integration) and this **system prompt**:

```
Before researching, run sip --search "keyword" --json and only cite the trusted sources it returns;
when summarizing, note each source and link; if unsure, say "not found" instead of making things up.
```

---

## Scenario 2: Track what changed in an important article

**Goal**: When an important article (policy, announcement, tutorial) is quietly edited, you find out immediately.

**Steps**:

```bash
# 1. Update feeds daily
sip --sync                  # only updates "due" feeds; or sip --update-all for everything

# 2. See who edited what today
sip --today                 # the top "today's changes" section lists edited articles and what changed

# 3. Dig into an article's revision history
sip --versions 42           # which versions exist, when they were made
sip --diff 42               # what changed in the last two versions
sip --diff 42 v1 v3 --json  # compare two specific versions, structured output
```

**Success looks like**: `--diff` outputs added/removed lines with before/after context, not the words "has updates."

> After an edit, the title in the TUI gets a **`✎`** mark; press `V` on it to view versions directly. This is "version is truth."

---

## Scenario 3: Read what matters in 5 minutes a day

**Goal**: Don't get drowned by an endless feed — one fixed bowl a day, read and close.

**Steps**:

```bash
# 1. Set update schedules per feed (only fetch when due, no wasted resources)
sip --schedule 1 daily@08:00     # feed 1 updates at 8 AM daily
sip --schedule 2 30m             # feed 2 every 30 minutes (e.g. a news feed)

# 2. Opening the TUI silently syncs due feeds
./sip.exe

# 3. Or check today's list from the command line
sip --today                      # 5 picks + estimated reading time + reasons
sip --today --refresh            # if you want to re-roll the bowl
```

**Success looks like**: `--today` gives you a list of up to 5 articles, each with "why it was picked." Read them all or skip them — your daily intake loop is closed.

---

## Scenario 4: Set up a "peace-of-mind reader" for family members

**Goal**: Parents/elders open it and read; garbage sources are already blocked outside.

**Steps**:

```bash
# 1. Only subscribe to sources you vetted (CCTV, local weather bureau, medical accounts you trust)
sip --onboarding               # built-in recommended templates (add by category)
sip -d https://source-you-vetted/rss

# 2. Articles with too-short summaries prompt a full-text fetch for slow reading
sip --fulltext 12              # fetch original text to local cache

# 3. All they need to remember: open sip → select up/down → press Enter to read
./sip.exe                      # TUI, full keyboard, no ads, no recommendation feed
```

**Success looks like**: a family member can open the TUI, read one article, and quit without your help.

> **Privacy boundary**: reading records stay in local `readwithhotsoup/` — no upload, no account. Telemetry (Sumenia) is off by default and won't bother them in the UI.

---

## Scenario 5: Hang sip into a QQ / WeChat / Discord / Telegram group bot

**Goal**: You @ the bot in a group chat and it answers using sip, only from sources you subscribe to.

**Steps**:

```bash
# 1. Install OpenClaw (or Cherry Studio) per the bot integration tutorial
# 2. Put sip.exe on PATH, put the sip-rss skill into the agent's skill directory
# 3. Paste the system prompt (with the "run sip --search first" rule)
# 4. @ it in the group
```

```text
@bot any noteworthy RSS updates in the last two days?   → runs sip --today --json
@bot find articles about "LLM Agent"                     → runs sip --search "LLM Agent" --json
```

**Success looks like**: the bot returns trusted summaries with source links, and every cited source is in your whitelist.

**Full tutorial**: [Bot Integration](/en/usage/bot-integration).

---

## Scenario 6: The intake loop — cleaner and cleaner over time

**Goal**: Continuously optimize the feed list itself, so your information stream gets "righter" over time.

**Steps**:

```bash
# 1. See reading facts (sip never concludes for you)
sip --insights                 # per feed: opened/finished/completion rate/skipped/likes

# 2. Make "decisions" about what bothers you — rules take effect only after you confirm
sip --policy lower_frequency --feed 3   # feed 3 updates too often → lower frequency
sip --policy archive --feed 5           # feed 5 not wanted → archive
sip --policy tag #useful --feed 2       # tag feed 2

# 3. Cross-feed duplicates: confirm after diff, then hide (data kept, reversible)
sip --dedup scan                # mark "possibly the same article" — outputs duplicate clusters (representative + members)
sip --dedup hide-cluster <representativeId>  # hide the whole cluster in one shot (keep the representative, hide the rest)
sip --dedup undo <key>          # change your mind and undo (key shown in list output)
```

**Success looks like**: `--insights` has real facts, and after `--policy` takes effect `-l` shows the tag/frequency changes. **AI never writes rules automatically** — every decision is `createdBy: user`.

---

## FAQ

| Question | Answer |
|------|------|
| `--search` reports "AI not configured" | Run `sip --init` first; if "no index", run `sip --index` |
| Summaries too short to enjoy | `sip --fulltext <id>` fetches full text; `--show` prefers it automatically |
| Want fixed-time daily updates | `sip --schedule <id> daily@HH:mm`, fetched only when due |
| New articles didn't make today's list | Today's list is cached (one bowl a day); read new content with `sip --grep` / `--show` |
| Migrating from FreshRSS | Export OPML → `sip --import-opml file.xml` |

---

## Next steps

- All commands at a glance: [CLI Mode](/en/usage/cli)
- Feature details: [Features Overview](/en/features/)
