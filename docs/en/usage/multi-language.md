# Multi-language (language files)

All user-visible text is read from `readwithhotsoup/languages/<code>.json`. **The source-of-truth strings are English**; a language file is "English key → translation", falling back to the English original when missing. Files support **nested group structures** (`Lang.Init` flattens automatically, compatible with the old flat format).

- Selection order: `--lang <code>` argument > `LANG` environment variable > default `zh-CN`
- On first launch, default translations are auto-copied/merged into the data directory; **edit the files there directly**, changes take effect immediately
- New translation keys are auto-merged into existing files, **without overwriting keys you've modified**
- Custom translations: copy `en-US.json` to `your-code.json`, change the values, then load it with `--lang your-code`
