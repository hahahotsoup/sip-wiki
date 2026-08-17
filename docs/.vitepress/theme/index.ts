import { h } from 'vue'
import Teek from 'vitepress-theme-teek'
import 'vitepress-theme-teek/index.css'
import './notice-bar.css'

export default {
  extends: Teek,
  // 全站公告大横条：挂在 layout-top 插槽（导航栏正上方），纯静态、无 JS、SSR 安全
  Layout: () =>
    h(Teek.Layout, null, {
      'layout-top': () =>
        h('div', { class: 'sip-notice-bar', role: 'note' }, [
          h('span', null, '⚡ 鉴于近期 DeepSeek 涨价等一系列因素，'),
          h('strong', null, '开发活动将较大放缓'),
          h('span', null, '——更新节奏会变慢，敬请理解。'),
        ]),
    }),
}
