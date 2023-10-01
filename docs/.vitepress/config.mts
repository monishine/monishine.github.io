import { defineConfig } from 'vitepress'
import { themeConfig } from './settings'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "芝士宝库",
  description: "一块美味芝士",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  lastUpdated: true,
  themeConfig // 主题配置
})
