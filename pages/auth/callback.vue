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

      const AUTH0_CALLBACK_URL = config.auth0.callbackUrl
      const AUTH0_CLIENT_ID = config.auth0.clientId
      const AUTH0_DOMAIN = config.auth0.domain

      const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, { // eslint-disable-line no-undef
        auth: {
          redirectUrl: AUTH0_CALLBACK_URL,
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
        login: 'auth/login'
      }),
      ...mapGetters(['auth/isLogged'])
    }
  }
</script>
