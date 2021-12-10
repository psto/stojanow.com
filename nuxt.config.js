export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Piotr Stojanow',
    titleTemplate: '%s - Piotr Stojanow',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Piotr Stojanow's essays, blog, tweetstorms and book notes. A personal site.",
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: 'https://stojanow.com',
      },
    ],
  },

  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    },
  },

  // Customize the progress-bar color
  loading: { color: '#cc3535' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/format-date.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-analytics',
  ],

  googleAnalytics: {
    id: 'UA-97630657-2'
  },

  // Image Property
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  /*
   ** Modules: https://go.nuxtjs.dev/config-modules
   ** @nuxtjs/sitemap should be last
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Sitemap Property
  sitemap: {
    hostname: 'https://stojanow.com',
    gzip: true,
    exclude: [],
  },

  /*
   ** Feed module configuration
   ** See https://github.com/nuxt-community/feed-module
   */
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        const { $content } = require('@nuxt/content')
        const files = await $content('essays').fetch()

        feed.options = {
          title: 'Piotr Stojanow',
          link: 'https://www.stojanow.com/feed.xml',
          description: 'Get the latest essays from Stojanow.com',
        }

        files.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.path,
            link: `https://www.stojanow.com{post.path}`,
            description: post.description,
          })
        })

        feed.addContributor({
          name: 'Piotr Stojanow',
          email: 'piotrstojanow@gmail.com',
          link: 'https://www.stojanow.com',
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      theme_color: '#cc3535',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  colorMode: {
    classSuffix: '',
  },
}
