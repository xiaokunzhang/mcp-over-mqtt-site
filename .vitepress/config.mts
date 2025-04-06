import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'

// Check if test environment
const isTestEnv = process.env.TEST_ENV === 'true'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  ...defineConfig({
    title: 'MCP over MQTT',
    description:
      'Specification and SDK implementations for MCP over MQTT - a transport layer enabling the Model Context Protocol for edge computing, IoT, and cloud services.',

    sitemap: {
      hostname: 'https://mqtt.ai',
    },

    buildEnd: ({ outDir }) => {
      // Generate robots.txt only in test environment
      if (isTestEnv) {
        const testRobotsContent = 'User-agent: *\nDisallow: /\n'
        fs.writeFileSync(path.resolve(outDir, 'robots.txt'), testRobotsContent)
        console.log('✓ Generated robots.txt for test environment (disallow indexing)')
      } else {
        console.log('✓ Using production robots.txt (allow indexing)')
      }
    },

    srcExclude: ['**/README.md'],

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
            text: 'Use Cases',
            link: '/mcp/use-cases/',
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
                link: '/mcp/specification/2025-03-26/basic/architecture',
              },
              {
                text: 'MQTT Transport',
                link: '/mcp/specification/2025-03-26/basic/mqtt_transport',
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
