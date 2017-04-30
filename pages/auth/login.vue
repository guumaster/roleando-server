<template>
  <div>
    LOGIN PAGE
  </div>
</template>

<script>
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
        theme: {
          primaryColor: '#e81815',
          logo: '/images/icons/icon-72x72.png'
        },
        auth: {
          redirectUrl: AUTH0_CALLBACK_URL,
          responseType: 'token'
        }
      })
      lock.on('hide', () => {
        this.$router.replace('/')
      })
      lock.show()
    }
  }
</script>
