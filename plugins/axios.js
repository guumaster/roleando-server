import axios from 'axios'

const options = {}
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  options.baseURL = `http://localhost:${process.env.PORT}`
}

export default axios.create(options)
