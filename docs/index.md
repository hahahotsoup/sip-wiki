---
layout: home

hero:
  name: sip
  text: 一堵信息防火墙
  tagline: 读文如喝汤，眼睛别总是往碗里瞟，闭上眼睛享受为先。——「品，你细品。」
  actions:
    - theme: brand
      text: 快速开始
      link: /指南/快速开始
    - theme: alt
      text: 功能总览
      link: /功能/
    - theme: alt
      text: 下载 Releases
      link: https://github.com/hahahotsoup/sipintui/releases

features:
  - icon: 📚
    title: 智能归档
    details: 版本追踪每次修改，内容 Diff 展示变化，快照归档永久保存某一时刻的完整状态。
    link: /功能/归档
  - icon: 📖
    title: 辅助阅读
    details: TUI 文件夹视图、沉浸阅读模式、全文抓取、Markdown 渲染，读得更舒服。
    link: /功能/阅读
  - icon: 🤖
    title: AI 友好
    details: 全功能 CLI、统一 JSON 输出、Embedding 语义搜索、LLM 摘要、结构化退出码。
    link: /功能/AI
  - icon: 🛡️
    title: 本地优先
    details: 数据在你自己手里（SQLite + 文件缓存），不需要账号，不上传阅读记录。
    link: /指南/介绍
  - icon: 🔍
    title: 透明决策
    details: 只看你订阅的源，没有算法黑箱；过滤规则就是你维护的订阅源列表。
    link: /指南/介绍
  - icon: 🕊️
    title: 隐私与遥测
    details: 本地阅读遥测苏暖泉（Sumenia），默认关闭、仅本地保存、绝不自动上传。
    link: /功能/遥测
---

## 📋 欢迎阅读测试报告

[sip 全面测试报告（2026-08-11）](/sip-测试报告-2026-08-11) —— 51 项功能测试 + 30+ 项边界/异常注入 + 安全渗透 + 数据量压测 + 并发测试，报告中的 11 项缺陷已在 **v1.0** 全部修复并逐项复测（详见 [测试报告](/测试报告)）。

## 快速上手

```bash
# 下载 Releases 中的单文件可执行程序，直接运行
./sip.exe            # Windows：进入 TUI（首次启动自动创建 readwithhotsoup/ 数据目录）
./sip.exe --help     # 或直接用 CLI
```

> sip 不是一个追求"日活"和"停留时长"的产品。它追求的是：
>
> **当你打开 sip 时，你知道你今天读到的东西是可信的；当你的 AI 调用 sip 时，你知道它引用的来源是可靠的。**
