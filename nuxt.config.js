const {join} = require('path')

const dev = !(process.env.NODE_ENV === 'production')
const label = dev ? '(local) ' : ''

module.exports = {
  dev,

  /*
   ** Headers of the page
   */
  head: {
    title: `${label}Roleando`,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Roleando!'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      {rel: 'manifest', href: '/manifest.json'}
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
    '~plugins/api/index.js',
//    '~plugins/vuex-router-sync.js'
  ],
  css: [
    {src: join(__dirname, 'css/app.styl'), lang: 'styl'}
  ],
  build: {
    vendor: ['vue-awesome', 'vuetify', 'axios'],
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (false && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
