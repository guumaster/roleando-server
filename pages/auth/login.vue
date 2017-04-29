<template>
  <div>
    LOGIN PAGE
  </div>
</template>

<script>
  export default {
    created () {
      if (!process.browser) {
        return
      }
      const AUTH0_CALBACK_URL = 'http://localhost:8080/auth/callback'
      const AUTH0_CLIENT_ID = 'svPGoiyOL7nFhSf4UnjZu6v2YBid26t4'
      const AUTH0_DOMAIN = 'guumaster.eu.auth0.com'

      const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, { // eslint-disable-line no-undef
        auth: {
          redirectUrl: AUTH0_CALBACK_URL,
          responseType: 'token'
        }
      })

      lock.show()
    }
  }
</script>
