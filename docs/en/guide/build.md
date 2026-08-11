# Building from Source

```bash
git clone https://github.com/hahahotsoup/sipintui.git
cd sipintui
dotnet publish -c Release -r win-x64 --self-contained false \
  -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:DebugSymbols=false -o publish/win-x64
./publish/win-x64/sip.exe          # enter TUI (Windows)
./publish/win-x64/sip.exe --help   # or use the CLI directly
```

> **Language files are embedded**: official translations like `zh-CN.json` / `en-US.json` are baked into the exe — even if you copy only a single exe out of the whole publish directory, it auto-restores the default language on first launch (or whenever the data directory is missing), and the UI is still in Chinese. The external `languages/` folder in the publish directory is **for user-customized translations** (edits take effect immediately; the embedded copies never overwrite your changes).

Replace `-r win-x64` with your target platform. Common RIDs:

| Platform | RID |
|------|-----|
| Windows x64 / ARM64 | `win-x64` / `win-arm64` |
| Linux x64 / ARM64 | `linux-x64` / `linux-arm64` |
| macOS Intel / Apple Silicon | `osx-x64` / `osx-arm64` |

> **No-runtime-required build (self-contained)**: if you want to distribute a "copy and run" build that doesn't require the recipient to install the .NET runtime, change `--self-contained false` to `--self-contained true` and publish again (a few dozen MB in size, more self-contained).

> **Publish all platforms at once**: run `powershell -ExecutionPolicy Bypass -File publish.ps1`, which produces a single-file executable for Windows x64 / Linux x64 / macOS Intel / macOS Apple Silicon into `publish/<platform>/`.

## Tech Stack

- C# / .NET 10.0
- [Microsoft.Data.Sqlite](https://learn.microsoft.com/dotnet/standard/data/sqlite)
- [CodeHollow.FeedReader](https://github.com/arminreiter/FeedReader) (RSS/Atom parsing)
- [DiffPlex](https://github.com/mmanela/diffplex) (text diff)
- [Terminal.Gui](https://github.com/gui-cs/Terminal.Gui) (folder-view TUI)
- [HtmlAgilityPack](https://html-agility-pack.net/) (article HTML → plain text / full-text extraction)
- [ktsu.CredentialCache](https://www.nuget.org/packages/ktsu.CredentialCache) (native OS credential store for API keys)
- Embedding / LLM: OpenAI-compatible interfaces (local Ollama, DeepSeek, OpenAI, etc.)
