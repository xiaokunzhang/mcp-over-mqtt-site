import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'
import { toRefs } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    router.onBeforeRouteChange = (to: string) => {
      // TODO: remove this when home page is ready
      const redirects = {
        '/': '/mcp/',
      }
      const path = to.replace(/\.html$/i, ''),
        toPath = redirects[path]

      if (toPath) {
        setTimeout(() => {
          router.go(toPath)
        })
        return false
      } else {
        return true
      }
    }
  },
  setup() {
    const { frontmatter } = toRefs(useData())
    const route = useRoute()

    giscusTalk(
      {
        repo: 'emqx/mcp-over-mqtt-site',
        repoId: 'R_kgDOOMOVMQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOOMOVMc4CoTsh',
        mapping: 'pathname',
        inputPosition: 'top',
        lang: 'en',
        theme: 'preferred_color_scheme',
        lightTheme: 'light',
        darkTheme: 'transparent_dark',
      },
      {
        frontmatter,
        route,
      },
      true
    )
  },
}
