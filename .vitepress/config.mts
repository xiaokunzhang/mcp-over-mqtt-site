import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'MCP over MQTT',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'local',
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
          items: [],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/emqx/mcp-over-mqtt-site' },
      { icon: 'slack', link: 'https://emqx.slack.com/' },
    ],
  },
})
