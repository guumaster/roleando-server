<template>
  <!--<button class="btn btn-primary" @click="login()">Log In</button>-->
  <div>
    Callback page
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import config from '~plugins/config'

  export default {
    created () {
      if (process.SERVER_BUILD) {
        return
      }

      const AUTH0_CALBACK_URL = config.auth0.callbackUrl // 'http://localhost:8080/auth/callback'
      const AUTH0_CLIENT_ID = config.auth0.clientId // 'svPGoiyOL7nFhSf4UnjZu6v2YBid26t4'
      const AUTH0_DOMAIN = config.auth0.domain // 'guumaster.eu.auth0.com'

      const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, { // eslint-disable-line no-undef
        auth: {
          redirectUrl: AUTH0_CALBACK_URL,
          responseType: 'token'
        }
      })
      lock.on('authenticated', async (authResult) => {
        console.log('Auth0 token: ', authResult.idToken)
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
        login: 'auth/login',
        loadUserInfo: 'auth/loadUserInfo',
        logout: 'auth/logout'
      }),
      ...mapGetters(['auth/isLogged']),
      doLogout () {
        this.logout()
        this.$router.push('/')
      }
    }
  }
</script>
