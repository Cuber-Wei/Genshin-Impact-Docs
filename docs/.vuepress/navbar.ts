/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '攻略',
    items: [{ text: '角色攻略', link: '/characterGuide/README.md' }],
  },
  {
    text: '站点导航',
    items: [{ text: '原神数据库', link: 'https://gi.nanoka.cc/' }, { text: 'bilibili wiki', link: 'https://wiki.biligame.com/ys/' }, { text: '原神DPS数据库', link: 'https://www.mhydps.cn/' }],
  },
])
