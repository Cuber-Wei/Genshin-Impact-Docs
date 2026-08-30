# Genshin Impact Docs

This project is a Genshin Impact knowledge site built with [VuePress](https://vuepress.vuejs.org/) and [vuepress-theme-plume](https://theme-plume.vuejs.press/). It focuses on character progression guides, mechanics analysis, and general documentation for players.

## Main features

- Blog and analysis articles: includes detailed notes on combat mechanics, calculations, and gameplay theory.
- Formula and algorithm explanations: covers topics such as crit ratio, elemental mastery efficiency, and other numerical derivations.

## Project structure

- `docs/blog/`: blog posts and analysis articles
- `docs/characterGuide/`: character growth and guide series
- `docs/.vuepress/`: site configuration, theme, and static assets

## Local development

```sh
# install dependencies
pnpm i

# start the dev server
pnpm docs:dev

# build production output
pnpm docs:build

# preview the generated site locally
pnpm docs:preview

# update VuePress and the theme
pnpm vp-update

# project code format
pnpm lint
```

## Deploy to GitHub Pages

The project already includes a GitHub Actions workflow at `.github/workflows/docs-deploy.yml`. To publish it through GitHub Pages, configure the repository as follows:

- `Settings > Actions > General`: enable `Read and write permissions` under `Workflow permissions`
- `Settings > Pages`: set `Source` to `Deploy from a branch` and choose the `gh-pages` branch
- If deploying to `https://<USERNAME>.github.io/<REPO>/`, set `base` to `"/<REPO>/"` in `docs/.vuepress/config.ts`

For custom domain setup, see the [GitHub Pages documentation](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

## Related documentation

- [VuePress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
