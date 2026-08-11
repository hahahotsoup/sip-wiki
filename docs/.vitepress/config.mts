import { defineConfig } from 'vitepress'
import { teekConfig } from './teek-config.mts'

export default defineConfig({
  extends: teekConfig,
  cleanUrls: true,
  lang: 'zh-CN',
  title: 'sip',
  description: '本地优先的透明信息过滤器与阅读辅助器——只读你信任的内容',
  head: [
    ['meta', { name: 'theme-color', content: '#16a34a' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/指南/快速开始' },
      { text: '使用说明', link: '/使用说明/命令行' },
      { text: '功能', link: '/功能/' },
      { text: '项目结构', link: '/项目结构' },
      { text: '测试报告', link: '/测试报告' },
      { text: '关于', link: '/关于' },
    ],
    sidebar: {
      '/指南/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/指南/介绍' },
            { text: '快速开始', link: '/指南/快速开始' },
            { text: '从源码构建', link: '/指南/构建' },
            { text: 'AI 相关', link: '/指南/AI' },
          ],
        },
      ],
      '/使用说明/': [
        {
          text: '使用说明',
          items: [
            { text: 'CLI 模式', link: '/使用说明/命令行' },
            { text: 'TUI 模式', link: '/使用说明/TUI' },
            { text: '更新调度', link: '/使用说明/更新调度' },
            { text: '多语言', link: '/使用说明/多语言' },
            { text: 'AI 命令', link: '/使用说明/AI命令' },
            { text: '文章归档', link: '/使用说明/归档' },
            { text: '全文抓取', link: '/使用说明/全文抓取' },
          ],
        },
      ],
      '/功能/': [
        {
          text: '功能',
          items: [
            { text: '功能总览', link: '/功能/' },
            { text: '智能归档', link: '/功能/归档' },
            { text: '辅助阅读', link: '/功能/阅读' },
            { text: 'AI 友好', link: '/功能/AI' },
            { text: 'Telemetry 与隐私', link: '/功能/遥测' },
            { text: '规划中', link: '/功能/规划' },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
    },

    editLink: {
      pattern: 'https://github.com/hahahotsoup/sip-wiki/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '遵循 GNU General Public License v3.0 (GPL-3.0)',
      copyright: '© 2026 hahahotsoup with <3',
    },
  },
})
