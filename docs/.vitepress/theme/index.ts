import { h } from 'vue'
import Teek from 'vitepress-theme-teek'
import 'vitepress-theme-teek/index.css'
import './notice-bar.css'
import NoticeBar from './NoticeBar.vue'

if (typeof window !== 'undefined') {
  const _pushState = history.pushState.bind(history)
  history.pushState = function (state: any, title: string, url?: string | URL | null) {
    if (url) {
      const cur = new URL(location.href)
      const next = new URL(url, location.href)
      if (cur.pathname === next.pathname && cur.search === next.search) {
        history.replaceState(state, title, url)
        return
      }
    }
    _pushState(state, title, url)
  }
}

export default {
  extends: Teek,
  // 全站公告大横条：挂在 layout-top 插槽（导航栏正上方）
  // 高度通过 --vp-layout-top-height 通知布局（导航/侧边栏自动让位）
  Layout: () =>
    h(Teek.Layout, null, {
      'layout-top': () => h(NoticeBar),
    }),
}
