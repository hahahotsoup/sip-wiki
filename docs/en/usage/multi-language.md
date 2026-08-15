# Multi-language (language files)

All user-visible text is read from `readwithhotsoup/languages/<code>.json`. **The source-of-truth strings are English**; a language file is "English key → translation", falling back to the English original when missing. Files support **nested group structures** (`Lang.Init` flattens automatically, compatible with the old flat format).

- Selection order: `--lang <code>` argument > `LANG` environment variable > default `zh-CN`
- On first launch, default translations are auto-copied/merged into the data directory; **edit the files there directly**, changes take effect immediately
- New translation keys are auto-merged into existing files, **without overwriting keys you've modified**
- Custom translations: copy `en-US.json` to `your-code.json`, change the values, then load it with `--lang your-code`

Three built-in packs ship with sip:

| Code | What it is |
|------|-----------|
| `zh-CN` | Simplified Chinese (default) |
| `en-US` | English |
| `zh-Moe` | A tsundere cat-girl flavored Chinese pack (591 lines) — the whole CLI turns into a bossy catgirl who insults you while getting things done ("useless fish~", "can't even do this? trash!"). Officially positioned for masochistic users with special needs. Try `--lang zh-Moe` if you dare ~~(you masochist)~~. Its meme lore lives in the [Meme Encyclopedia (梗百科)](/梗百科) — Chinese only. |
