import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  ...defineConfig({
    title: 'MCP over MQTT',
    srcExclude: ['huog/**/*'],
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config

      search: {
        provider: 'local',
      },

      editLink: {
        pattern: 'https://github.com/emqx/mcp-over-mqtt-site/edit/main/:path',
      },

      // nav: [
      //   { text: 'Home', link: '/' },
      //   { text: 'Examples', link: '/markdown-examples' },
      // ],

      sidebar: {
        '/mcp/': [
          {
            text: 'Overview',
            link: '/mcp/',
          },
          {
            text: 'Python SDK',
            link: '/mcp/sdk/python/',
          },
          {
            text: 'Specification',
            link: '/mcp/specification/',
            collapsed: false,
            items: [
              {
                text: 'Architecture',
                link: '/mcp/specification/2025-03-26/basic/architecture/',
              },
              {
                text: 'MQTT Transport',
                link: '/mcp/specification/2025-03-26/basic/mqtt_transport/',
              },
            ],
          },
        ],
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/emqx/mcp-over-mqtt-site' },
        { icon: 'slack', link: 'https://emqx.slack.com/' },
      ],
    },
  }),
})
