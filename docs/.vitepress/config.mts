import { defineConfig } from 'vitepress'
import { teekConfig } from './teek-config.mts'

export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: 'sip',
  description: '本地优先的透明信息过滤器与阅读辅助器——只读你信任的内容',
  head: [
    ['meta', { name: 'theme-color', content: '#16a34a' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/', activeMatch: '^/en/$' },
          { text: 'Guide', link: '/en/guide/quick-start' },
          { text: 'Usage', link: '/en/usage/cli' },
          { text: 'Features', link: '/en/features/' },
          { text: 'Project Structure', link: '/en/project-structure' },
          { text: 'Test Report', link: '/en/test-report' },
          { text: 'About', link: '/en/about' },
          {
            text: '🌐',
            items: [
              { text: '简体中文', link: '/' },
              { text: 'English', link: '/en/' },
            ],
          },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Introduction', link: '/en/guide/introduction' },
                { text: 'Quick Start', link: '/en/guide/quick-start' },
                { text: 'Build from Source', link: '/en/guide/build' },
                { text: 'AI Related', link: '/en/guide/ai' },
              ],
            },
          ],
          '/en/usage/': [
            {
              text: 'Usage',
              items: [
                { text: 'CLI Mode', link: '/en/usage/cli' },
                { text: 'TUI Mode', link: '/en/usage/tui' },
                { text: 'Update Scheduling', link: '/en/usage/update-scheduler' },
                { text: 'Multi-language', link: '/en/usage/multi-language' },
                { text: 'AI Commands', link: '/en/usage/ai-commands' },
                { text: 'Article Archiving', link: '/en/usage/archive' },
                { text: 'Full-Text Fetch', link: '/en/usage/full-text-fetch' },
              ],
            },
          ],
          '/en/features/': [
            {
              text: 'Features',
              items: [
                { text: 'Overview', link: '/en/features/' },
                { text: 'Smart Archiving', link: '/en/features/archive' },
                { text: 'Assisted Reading', link: '/en/features/reading' },
                { text: 'AI Friendly', link: '/en/features/ai' },
                { text: 'Telemetry & Privacy', link: '/en/features/telemetry' },
                { text: 'Roadmap', link: '/en/features/roadmap' },
              ],
            },
          ],
        },
        outline: {
          level: [2, 3],
          label: 'On this page',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        lastUpdated: {
          text: 'Last updated on',
          formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
        },
        editLink: {
          pattern: 'https://github.com/hahahotsoup/sip-wiki/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'Released under the GNU General Public License v3.0 (GPL-3.0)',
          copyright: '© 2026 hahahotsoup with <3',
        },
      },
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search conditions',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      { text: '指南', link: '/指南/快速开始' },
      { text: '使用说明', link: '/使用说明/命令行' },
      { text: '功能', link: '/功能/' },
      { text: '项目结构', link: '/项目结构' },
      { text: '测试报告', link: '/测试报告' },
      { text: '关于', link: '/关于' },
      {
        text: '🌐',
        items: [
          { text: '简体中文', link: '/' },
          { text: 'English', link: '/en/' },
        ],
      },
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
            { text: 'Bot 接入', link: '/使用说明/Bot接入' },
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
