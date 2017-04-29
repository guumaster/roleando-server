const {join} = require('path')
const config = require('./config/browser')

const dev = !(process.env.NODE_ENV === 'production')
const label = dev ? '(local) ' : ''

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
      {hid: 'description', name: 'description', content: 'Roleando!'}
    ],
    script: [
      {src: 'https://cdn.auth0.com/js/lock/10.14/lock.min.js'}
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
    '~plugins/config.js',
    // '~plugins/api/index.js',
//    '~plugins/vuex-router-sync.js'
  ],
  css: [
    {src: join(__dirname, 'css/app.styl'), lang: 'styl'}
  ],
  build: {
    vendor: ['localforage', 'vue-awesome', 'vuetify', 'axios', '@guumaster/rpgen']

  }
}
