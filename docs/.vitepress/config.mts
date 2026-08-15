import { defineConfig } from 'vitepress'
import { teekConfig } from './teek-config.mts'
import { generateSitemap } from './sitemap.mts'

export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: 'sip',
  description: '本地优先的透明信息过滤器与阅读辅助器——只读你信任的内容',
  head: [
    ['meta', { name: 'theme-color', content: '#16a34a' }],
  ],

  buildEnd: generateSitemap,

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
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Quick Start', link: '/en/guide/quick-start' },
                { text: 'Practical Scenarios', link: '/en/guide/practical-scenarios' },
                { text: 'Competitors', link: '/en/guide/competitors' },
                { text: 'Introduction', link: '/en/guide/introduction' },
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
                { text: 'Web UI', link: '/en/usage/web' },
                { text: 'Multi-language', link: '/en/usage/multi-language' },
                { text: 'AI Commands', link: '/en/usage/ai-commands' },
                { text: 'Article Archiving', link: '/en/usage/archive' },
                { text: 'Full-Text Fetch', link: '/en/usage/full-text-fetch' },
                { text: 'Bot Integration', link: '/en/usage/bot-integration' },
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
          '/en/': [
            {
              text: 'Reference',
              items: [
                { text: 'Project Structure', link: '/en/project-structure' },
                { text: 'Second-Round Test Report (2026-08-12)', link: '/en/sip-second-round-test-report-2026-08-12' },
                { text: 'Test Report', link: '/en/test-report' },
                { text: 'About', link: '/en/about' },
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
      { text: '了解', link: '/了解/介绍', activeMatch: '^/了解/' },
      { text: '上手', link: '/上手/快速开始', activeMatch: '^/上手/' },
      { text: '使用', link: '/使用/CLI', activeMatch: '^/使用/' },
      { text: '参考', link: '/参考/功能', activeMatch: '^/参考/' },
      { text: '项目结构', link: '/项目结构' },
      { text: '测试报告', link: '/测试报告' },
      { text: '梗百科', link: '/梗百科' },
      { text: '关于', link: '/关于' },
    ],
    sidebar: {
      '/了解/': [
        {
          text: '了解',
          items: [
            { text: '介绍', link: '/了解/介绍' },
            { text: '竞品对比', link: '/了解/竞品对比' },
            { text: '概念', link: '/了解/概念' },
          ],
        },
      ],
      '/上手/': [
        {
          text: '上手',
          items: [
            { text: '快速开始', link: '/上手/快速开始' },
            { text: '实战场景', link: '/上手/实战场景' },
            { text: '高级用法', link: '/上手/高级' },
            { text: '从源码构建', link: '/参考/构建' },
          ],
        },
      ],
      '/使用/': [
        {
          text: '使用',
          items: [
            { text: 'CLI', link: '/使用/CLI' },
            { text: 'TUI', link: '/使用/TUI' },
            { text: 'AI 命令', link: '/使用/AI' },
            { text: 'Bot 接入', link: '/使用/Bot' },
            { text: '更新调度', link: '/使用/调度' },
            { text: '全文抓取', link: '/使用/全文' },
            { text: 'Web 界面', link: '/使用/Web' },
            { text: '多语言', link: '/使用/多语言' },
          ],
        },
      ],
      '/参考/': [
        {
          text: '参考',
          items: [
            { text: '功能总览', link: '/参考/功能' },
            { text: '遥测与隐私', link: '/参考/遥测' },
            { text: '规划中', link: '/参考/规划' },
            { text: '从源码构建', link: '/参考/构建' },
            { text: '更新日志', link: '/参考/更新日志' },
          ],
        },
      ],
      '/': [
        {
          text: '总览',
          items: [
            { text: '首页', link: '/' },
            { text: '第二轮测试报告（2026-08-12）', link: '/sip-第二轮测试报告-2026-08-12' },
            { text: '第一轮测试报告（2026-08-11）', link: '/sip-测试报告-2026-08-11' },
            { text: '项目结构', link: '/项目结构' },
            { text: '测试报告', link: '/测试报告' },
            { text: '梗百科', link: '/梗百科' },
            { text: '关于', link: '/关于' },
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
