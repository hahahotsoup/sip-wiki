# AI 命令（语义搜索 / 智能摘要）

内置 AI 能力：**Embedding 向量化 + 语义搜索**（RAG）与 **LLM 文章摘要**，供 AI Agent 或人类通过同一套 CLI 使用。

```bash
sip --init                          # 首次配置 AI（模型 + API Key，交互式）
sip --config                        # 查看/修改 AI 配置
sip --index                         # 对文章做 Embedding 向量化（交互式选择源）
sip --reindex                       # 更换 Embedding 模型后重新向量化
sip --search "LLM Agent"            # 语义搜索（返回命中文章 + 相似度）
sip --search "RAG" --feed 1 --json  # 限定订阅源搜索，JSON 输出
sip --grep "关键词"                  # 全文搜索（标题/正文/摘要，不依赖 AI）
sip --summary 12                    # 为文章 12 生成摘要（保存到数据库）
sip --summary feed:3                # 为订阅源 3 的全部文章生成摘要
sip --summary-all                   # 为所有未生成摘要的文章生成摘要
```

## 命令总表

| 命令 | 说明 |
|------|------|
| `--init` | 交互式首次配置：选择 Embedding 提供方、LLM 提供方，并录入 API Key（stdin 被重定向时自动降级为普通输入，不崩溃） |
| `--config` | 打印当前 AI 配置（不含密钥）及配置文件路径 |
| `--index` | 为选中订阅源的文章批量生成 Embedding 向量 |
| `--reindex` | 更换 Embedding 模型（维度变化）后，清除旧向量并全量重建 |
| `--search <查询>` | 语义搜索；可选 `--feed 编号`、`--threshold 0.7`、`--json`。⚠️ 性能提示：跨全源搜索是向量全量扫描，优先用 `--grep`（SQL LIKE 精确匹配）；需要语义扩展时用 `--feed 编号` 限定单源，或调 `--threshold` 减少候选。⚠️ 全文向量命中分通常比标题向量低 0.1~0.2，搜「正文独有概念」时结果偏少可适当降阈值 |
| `--grep <关键词>` | 全文搜索（SQL LIKE，不依赖 AI）；默认输出「编号+标题+出现次数+±50 字符片段」，有上限（`--limit N` / `--max-snippets N` / `--json` / `--full`） |
| `--summary <编号>` | 为单篇文章调用 LLM 生成摘要（`--json` 结构化）；`feed:<编号>` 为该源全部文章逐个生成 |
| `--summary-all` | 为所有 `Summary` 为空的文章生成摘要 |

**API Key** 存操作系统原生凭据库（Windows 凭据管理器 / macOS 钥匙串 / Linux Secret Service），不写入任何文件；非敏感配置存 `readwithhotsoup/ai_config.json`（键名大小写不敏感，端点缺 `http(s)://` 协议头时自动补全；`"allowPrivateNet": true` 可放行内网全文抓取）。

## 错误码说明

AI 命令失败时统一上报结构化错误码，`--json` 模式下错误以 `{"error": {"code": "...", ...}}` 形式返回：`MODEL_UNAVAILABLE` / `INVALID_RESPONSE` / `INVALID_JSON` / `EMPTY_RESPONSE` / `API_KEY_INVALID` / `NETWORK_ERROR` / `NO_INDEX` / `FEED_NOT_FOUND` / `ITEM_NOT_FOUND` / `EMPTY_QUERY`。
