import { defineTeekConfig } from 'vitepress-theme-teek/config'

// Teek 主题配置
// 所有 Teek 配置都放到这里，通过 config.mts 的 extends 注册
//
// 本站为「纯文档站」，刻意关闭博客化首页：
//  - teekHome: false  关闭 Teek 博客风格首页（Banner / 文章列表 / 卡片栏）
//  - vpHome:   true   启用 VitePress 原生文档首页（hero + feature）
// 其余结构化能力（自动侧边栏 / 永久链接 / 目录页 / 文档分析）保持开启。
export const teekConfig = defineTeekConfig({
  teekHome: false,
  vpHome: true,
  pageStyle: 'default',

  author: {
    name: 'sip',
  },

  comment: {
    provider: 'giscus',
    options: {
      repo: 'hahahotsoup/sip-wiki',
      repoId: 'R_kgDOT0yLsA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOT0yLsM4DDIwu',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'preferred_color_scheme',
      lang: 'zh-CN',
      loading: 'lazy',
      useOnline: true,
      link: 'https://giscus.app/client.js',
    },
  },
})
