import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import { defineClientConfig } from 'vuepress/client'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

import ElementMasterRate from './theme/components/ElementMasterRate.vue'
import LunarBloomElementMasterRate from './theme/components/LunarBloomElementMasterRate.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    app.component('NpmBadge', NpmBadge)
    app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    app.component('ElementMasterRate', ElementMasterRate)
    app.component('LunarBloomElementMasterRate', LunarBloomElementMasterRate)
  },
  layouts: {
    Layout: h(Layout, null, {
      // 将 PageContextMenu 添加到 doc-title-after 插槽，即文章标题的右侧
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
})
