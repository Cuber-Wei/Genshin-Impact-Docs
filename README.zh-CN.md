# Genshin Impact Docs

这是一个基于 [VuePress](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://theme-plume.vuejs.press/) 构建的原神知识站，聚焦于原神角色养成、数值分析、攻略笔记与公开文档展示。

## 项目主要功能

- 文章/博客内容：收录原神相关的数值分析、收益计算、机制推导等专题文章。
- 公式与算法说明：适合展示双暴配比、精通收益、伤害计算等解析内容。

## 站点结构

- `docs/blog/`：博客与分析文章
- `docs/characterGuide/`：角色养成系列
- `docs/.vuepress/`：站点配置、主题和静态资源

## 本地开发

```sh
# 安装依赖
pnpm i

# 启动开发服务器
pnpm docs:dev

# 构建生产包
pnpm docs:build

# 本地预览构建产物
pnpm docs:preview

# 更新 VuePress 与主题
pnpm vp-update

# 项目代码格式化
pnpm lint
```

## 部署到 GitHub Pages

项目已配置 GitHub Actions：`.github/workflows/docs-deploy.yml`。如需发布到 GitHub Pages，需在仓库中完成以下设置：

- `Settings > Actions > General`：开启 `Workflow permissions` 下的 `Read and write permissions`
- `Settings > Pages`：将 `Source` 设为 `Deploy from a branch`，并选择 `gh-pages` 分支
- 如需部署到 `https://<USERNAME>.github.io/<REPO>/`，请在 `docs/.vuepress/config.ts` 中设置 `base` 为 `"/<REPO>/"`

更多说明可参考 [GitHub Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)。

## 相关文档

- [VuePress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
