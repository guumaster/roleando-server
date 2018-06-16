<template>
  <div>
    LOGIN PAGE
  </div>
</template>

<script>
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

      webAuth.authorize()
    }
  }
</script>
