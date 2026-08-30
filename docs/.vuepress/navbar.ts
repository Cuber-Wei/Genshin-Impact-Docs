/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  // {
  //   text: '攻略',
  //   items: [{ text: '角色攻略', link: '/characterGuide/README.md' }],
  // },
  {
    text: '站点导航',
    items: [
      {
        text: 'wiki',
        icon: 'hugeicons:wikipedia',
        items: [
          {
            text: '观测枢',
            link: 'https://baike.mihoyo.com/ys/strategy/',
          },
          {
            text: 'bilibili wiki',
            link: 'https://wiki.biligame.com/ys/',
          },
          {
            text: '原神中英日辞典',
            link: 'https://genshin-dictionary.com/zh-CN',
          },
        ],
      },
      {
        text: '深渊数据(鸣谢92老师)',
        icon: 'icon-park-outline:data-sheet',
        items: [
          {
            text: '深境螺旋',
            link: 'https://www.bilibili.com/opus/1223805546132406352',
          },
          {
            text: '幻想真境剧诗',
            link: 'https://www.bilibili.com/opus/1224449073962024984',
          },
          {
            text: '幽境危战',
            link: 'https://www.bilibili.com/opus/1223738205328637976',
          },
        ],
      },
      {
        text: '原神数据库',
        icon: 'bi:database',
        items: [
          {
            text: 'nanoka',
            link: 'https://gi.nanoka.cc/',
          },
          {
            text: 'lunaris',
            link: 'https://lunaris.moe/',
          },
          {
            text: 'gachabase',
            link: 'https://gi.gachabase.net/',
          },
          {
            text: '原神DPS数据库',
            link: 'https://www.mhydps.cn/',
          },
        ],
      },
      {
        text: '梅洛彼得堡信息处理中心',
        link: 'https://meropide.cn/',
      },
      {
        text: '梦境',
        link: 'https://www.reddit.com/r/Genshin_Impact_Leaks/new/',
      },
    ],
  },
])
