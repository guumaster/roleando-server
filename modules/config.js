
const config = {
  api: {
    baseUrl: 'https://api.rolodromo.com'
  },
  auth0: {

  }
}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  config.api.baseUrl = `http://localhost:${process.env.PORT}` // eslint-disable-line no-process-env
}

export default config
