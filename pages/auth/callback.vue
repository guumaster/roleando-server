<template>
  <!--<button class="btn btn-primary" @click="login()">Log In</button>-->
  <div>
    Callback page
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import config from '~plugins/config'
  import * as auth0 from 'auth0-js'

  export default {
    created () {
      if (process.SERVER_BUILD) {
        return
      }

      const AUTH0_CALLBACK_URL = config.auth0.callbackUrl
      const AUTH0_CLIENT_ID = config.auth0.clientId
      const AUTH0_DOMAIN = config.auth0.domain

      const webAuth = new auth0.WebAuth({
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        redirectUri: AUTH0_CALLBACK_URL,
        scope: 'openid profile email',
        responseType: 'token id_token'
      })

      webAuth.parseHash({ hash: window.location.hash }, async (err, authResult) => {
        if (err) {
          return console.log(err)
        }

        console.log('Auth0 token: ', authResult.accessToken)
        this.login(authResult)
          .then(() => {
            console.log('Login complete. Redirecting...')
            this.$router.push('/')
          })
          .catch(err => {
            console.log('Error!', err)
          })
      })
    },
    methods: {
      ...mapActions({
        login: 'auth/login'
      }),
      ...mapGetters(['auth/isLogged'])
    }
  }
</script>
