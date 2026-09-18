import DefaultTheme from 'vitepress/theme'
import { h, type App } from 'vue'
import './style.css'
// 统一职业排行组件（档位排行 + PVP/PVE/平民 三分类合并）
// @ts-expect-error: Vite resolves this .vue component at build time.
import RankChart from './components/RankChart.vue'
// 武器资料库组件（全武器属性表）
// @ts-expect-error: Vite resolves this .vue component at build time.
import WeaponCatalog from './components/WeaponCatalog.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }: { app: App }) {
    app.component('RankChart', RankChart)
    app.component('WeaponCatalog', WeaponCatalog)
  }
}
