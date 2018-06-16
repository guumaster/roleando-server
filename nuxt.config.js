const {join} = require('path')
const config = require('./config/browser')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const {IgnorePlugin} = require('webpack')

const dev = !(process.env.NODE_ENV === 'production') // eslint-disable-line no-process-env
const label = dev ? '(local) ' : ''

const TITLE = 'Rolodromo.com'
const DESC = 'Herramientas digitales para tus juegos de rol'

module.exports = require('nuxt-modules')({
  dev,
  env: config,
  /*
   ** Extend nuxt using nuxt modules system (Alpha)
   ** Learn more: https://github.com/nuxt/nuxt-modules
   */
  modules: [
    '@nuxtjs/optimize',
    // '@nuxtjs/offline',
    '@nuxtjs/manifest',
    '@nuxtjs/meta'
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: `${label}Roleando`,
    meta: [
      // {charset: 'utf-8'},
      // {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: DESC, hid: 'desc'},
      // Twitter
      {name: 'twitter:title', content: TITLE, hid: 'twd'},
      // Google+ / Schema.org
      {itemprop: 'name', content: TITLE, hid: 'gpt'},
      {itemprop: 'description', content: DESC, hid: 'gpd'},
      // Facebook / Open Graphd
      {property: 'og:title', content: TITLE, hid: 'ogt'},
      {property: 'og:description', content: DESC, hid: 'ogd'},
      {property: 'og:image', content: 'https://roleando.herokuapp.com/images/icons/icon-144x144.png'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      /*
       http://www.favicon-generator.org/
       https://makeappicon.com
       <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
       <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
       <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
       <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
       <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
       <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
       <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
       <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
       <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
       <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
       <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
       <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
       <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
       <meta name="msapplication-TileColor" content="#ffffff">
       <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
       <meta name="theme-color" content="#ffffff">
       */
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#e81815',
    height: '3px'
  },
  manifest: {
    'name': `${label}Roleando`,
    'short_name': 'Roleando',
    'theme_color': '#524671',
    'background_color': '#7f7c8a',
    'display': 'standalone',
    'scope': '/',
    'start_url': '/',
    'icons': [
      {
        'src': 'images/icons/icon-72x72.png',
        'sizes': '72x72',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-96x96.png',
        'sizes': '96x96',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-128x128.png',
        'sizes': '128x128',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-144x144.png',
        'sizes': '144x144',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-152x152.png',
        'sizes': '152x152',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-384x384.png',
        'sizes': '384x384',
        'type': 'image/png'
      },
      {
        'src': 'images/icons/icon-512x512.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
    ],
    'splash_pages': null
  },
  // router: {
  //   linkActiveClass: 'nuxt-link-active test'
  // },
  /*
   ** Build configuration
   */
  plugins: [
    '~plugins/axios.js',
    '~plugins/vuetify.js',
    '~plugins/vueawesome.js',
    '~plugins/components.js',
    '~plugins/config.js',
    {src: '~plugins/fonts.js', ssr: false},
    {src: '~plugins/vuex-router-sync.js', ssr: false},
    {src: '~plugins/animate-number.js', ssr: false},
    {src: '~plugins/quill-editor.js', ssr: false},
    {src: '~plugins/offline.js', ssr: false}
  ],
  css: [
    {src: join(__dirname, 'css/app.styl'), lang: 'styl'}
  ],
  offline: true,
  build: {
    extractCSS: true,
    plugins: [
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      new LodashModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: false,
        logLevel: 'info'
      })
    ],
    vendor: [
      'localforage',
      'axios',
      '@guumaster/rpgen',
      'vue-awesome',
      'vuetify',
      'vue-quill-editor',
      'moment',
      'lodash'
    ]
  }
})
