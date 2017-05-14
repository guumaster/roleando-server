const {join} = require('path')
const config = require('./config/browser')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { IgnorePlugin } = require('webpack')

const dev = !(process.env.NODE_ENV === 'production')
const label = dev ? '(local) ' : ''

const TITLE = 'Roleando WebApp'
const DESC = 'Generadores aleatorios y herramientas para juegos de rol'

module.exports = {
  dev,
  env: config,
  /*
   ** Headers of the page
   */
  head: {
    title: `${label}Roleando`,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: DESC, hid: 'desc'},
      // Twitter
      { name: 'twitter:title', content: TITLE, hid: 'twd' },
      // Google+ / Schema.org
      { itemprop: 'name', content: TITLE, hid: 'gpt' },
      { itemprop: 'description', content: DESC, hid: 'gpd' },
      // Facebook / Open Graphd
      { property: 'og:title', content: TITLE, hid: 'ogt' },
      { property: 'og:description', content: DESC, hid: 'ogd' },
      { property: 'og:image', content: 'https://roleando.herokuapp.com/images/icons/icon-144x144.png' }
    ],
    script: [
      {src: 'https://cdn.auth0.com/js/lock/10.14/lock.min.js'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      {rel: 'manifest', href: '/manifest.json'}
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
       <link rel="manifest" href="/manifest.json">
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
    {src: '~plugins/quill-editor.js', ssr: false}
  ],
  css: [
    {src: join(__dirname, 'css/app.styl'), lang: 'styl'}
  ],
  build: {
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
}
