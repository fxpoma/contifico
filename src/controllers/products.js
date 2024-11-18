// Constantes
const ENDPOINTS = {
  PRODUCTS: '/product/'
}

export const Products = function (client) {
  return {
    get: async (query = {}) => {
      const response = await client.get(ENDPOINTS.PRODUCTS, { params: query })
      return response.data
    },
    getOne: async (query = {}) => {
      const response = await client.get(ENDPOINTS.PRODUCTS, { params: { ...query, result_size: 1 } })
      return response.data[0]
    },
    create: async (documento) => {
      const response = await client.post(ENDPOINTS.PRODUCTS, documento)
      return response.data
    }
  }
}
