import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AnimateTile from './components/AnimateTitle.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info': () => h(AnimateTile)
    })
  }
}