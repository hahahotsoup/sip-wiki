# Article Archiving Mechanism

The program maintains a status for each article: `active` (currently valid) / `archived` (older version after the author edited it). When updating RSS:

- Compares old and new Content, **archiving only triggers on body changes**
- Edited articles: old version → `archived`, new version → `active`; newly added articles are written directly as `active`
- **Deletion is no longer detected** (many sites only push the latest N items in RSS; an old article disappearing doesn't mean it was deleted)
