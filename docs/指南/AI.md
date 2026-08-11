# AI 相关

- 使用 AI（deepseek / opencode / chatgpt）生成部分代码和注释
- 内置 Embedding 语义搜索与 LLM 摘要（详见 [AI 命令](/使用说明/AI命令) 小节）

## 给 AI Agent / 脚本的初始化提醒

默认**未配置模型、未做向量化**——直接用 `--search` 会报「AI 未配置」或「尚无向量索引」。AI 应先 `sip --config` 确认已初始化，缺配置跑 `sip --init`、缺索引跑 `sip --index`、换过模型跑 `sip --reindex`。输出一律 **UTF-8**。

## 检索策略（Agent 使用建议）

1. **先用全文搜索确认命中**：`--grep` 是精确关键字匹配（标题/正文/摘要），不依赖 AI、无阈值问题。默认就是安全的片段模式（每篇只出「编号+标题+出现次数+±50 字符片段」，上限 20 篇 × 10 段），不会把大源正文灌进上下文；命中太多加 `--limit N`，要结构化结果用 `--json`，要某篇完整正文用 `--show <编号> --json`。
2. **再用语义搜索扩展**：`--search` 按语义相似度找「意思相近但字面不同」的文章；跨全源是向量全量扫描，数据量大时会明显变慢——优先 `--grep`，确需语义扩展再用 `--search`，并配合 `--feed 编号` 限源、`--threshold` 调阈值。
3. **多次换关键词**：围绕主题拆出 3~6 个不同的关键词/短语/同义词/英文原文，逐个检索，合并去重。
4. **留意阈值**：默认 0.7。0~2 条结果 → 降到 0.5~0.6；噪声多 → 升到 0.75~0.8；本地 bge-m3 常落在 0.5~0.6，建议 0.5；命中来自抓取全文的文章时，分普遍比标题向量低 0.1~0.2，可降阈值重试。
5. **读全文**：用 `sip --show <编号> --json`（AI 一律带 `--json`，裸跑会进全屏阅读界面）；有全文缓存时 JSON 带 `fulltext` 字段，优先用它。

## ai skill

代码里的 [.opencode/skills/sip-rss](https://github.com/hahahotsoup/sipintui/tree/main/.opencode/skills/sip-rss) 内含一份 skill，直接喂给 AI 即可。也可以直接从 [Releases](https://github.com/hahahotsoup/sipintui/releases) 下载 `sip-skill.zip`（与各平台单文件一起提供）。
