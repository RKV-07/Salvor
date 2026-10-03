import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Salvor',
  description:
    'Research log and architectural decision record for an inference-routing system that reuses prior computation and routes queries to the right model.',
  base: process.env.DOCS_BASE ?? '/',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Architecture', link: '/architecture' },
      { text: 'Progress', link: '/progress' },
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'Progress', link: '/progress' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    footer: {
      message: 'Status markers distinguish proposal from measurement. Nothing here is validated without evidence.',
    },
  },
})
