import createApi from './src/client.config.js'
import { Documents } from './src/controllers/documents.js'

const Contifico = function ({
  apiKey,
  apiToken
}) {
  const client = createApi({ apiKey })
  this.documents = new Documents(client)
}

export default Contifico
