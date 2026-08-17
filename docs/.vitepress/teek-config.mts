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

  // 全局公告：鉴于近期 DeepSeek 涨价等一系列因素，开发活动将较大放缓
  // useStorage: false —— 公告组件在 SSR 阶段访问 localStorage 会报 ReferenceError，且公告本就该每次访问都可见
  notice: {
    enabled: true,
    title: '⚡ 鉴于近期 DeepSeek 涨价等一系列因素，开发活动将较大放缓——更新节奏会变慢，敬请理解',
    initOpen: true,
    duration: 0,
    reopen: true,
    useStorage: false,
    twinkle: true,
    position: 'top',
    noticeStyle: `
.tk-notice {
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}
.tk-notice .title {
  font-weight: 600;
}
`,
  },

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
