<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// 关闭状态仅存内存：本次浏览会话内保持关闭，刷新后重新显示
const closed = ref(false)

// 关键联动：横条占用的 --vp-layout-top-height 在关闭时必须收回，
// 否则导航栏/侧边栏/正文仍会为横条让位，顶部留白。
function syncLayoutTop() {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(
    '--vp-layout-top-height',
    closed.value ? '0px' : 'var(--sip-banner-h)',
  )
}

onMounted(syncLayoutTop)
watch(closed, syncLayoutTop)
</script>

<template>
  <div v-if="!closed" class="sip-notice-bar" role="note">
    <span class="sip-notice-text">
      ⚡ 鉴于近期 DeepSeek 涨价等一系列因素，<strong>开发活动将较大放缓</strong>——更新节奏会变慢，敬请理解。
    </span>
    <button
      class="sip-notice-close"
      type="button"
      aria-label="关闭公告"
      title="关闭"
      @click="closed = true"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z"
        />
      </svg>
    </button>
  </div>
</template>
