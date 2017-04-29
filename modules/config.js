
const config = {
  api: {
    baseUrl: ''
  },
  auth0: {

  }
}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  config.api.baseUrl = `http://localhost:${process.env.PORT}`
}

export default config
