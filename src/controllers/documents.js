/**
 * @typedef {Object} DocumentQuery
 * @property {string} [tipo_registro] - Tipo de registro: "CLI" para Cliente, "PRO" para Proveedor
 * @property {string} [tipo] - Tipo de documento: "FAC" para factura, "LQC" para liquidación de compra
 * @property {Date} [fecha_emision] - Fecha de emisión del documento
 * @property {Date} [fecha_vencimiento] - Fecha de vencimiento del documento
 * @property {Date} [fecha_creacion] - Fecha de creación del documento
 * @property {string} [persona_identificacion] - Identificación de la persona
 * @property {number} [result_size] - Cantidad de resultados por consulta
 * @property {number} [result_page] - Número de página
 * @property {Date} [fecha_inicial] - Fecha inicial de emisión
 * @property {Date} [fecha_final] - Fecha final de emisión
 * @property {string} [persona_id] - ID de la persona asociada
 * @property {string} [bodega_id] - ID de la bodega asociada
 */

// Constantes
const ENDPOINTS = {
  DOCUMENTS: '/registro/documento/',
  DOCUMENT: '/documento/'
}

/**
 * @typedef {Object} Documents
 * @property {Function} get - Obtiene múltiples documentos.
 * @property {Function} getOne - Obtiene un único documento.
 * @property {Function} create - Crea un nuevo documento.
 */

/**
 * Servicios para manejo de documentos
 * @type {Documents}
 */

export const Documents = function (client) {
  return {
    /**
       * Obtiene múltiples documentos según los parámetros de consulta
       * @param {DocumentQuery} [query={}]
       * @returns {Promise<Object>} Documentos encontrados
       */
    get: async (query = {}) => {
      const response = await client.get(ENDPOINTS.DOCUMENTS, { params: query })
      return response.data
    },

    /**
       * Obtiene un único documento según los parámetros de consulta
       * @param {DocumentQuery} [query={}]
       * @returns {Promise<Object>} Documento encontrado
       */
    getOne: async (query = {}) => {
      const response = await client.get(ENDPOINTS.DOCUMENTS, { params: { ...query, result_size: 1 } })
      return response.data[0]
    },

    /**
         * Crea un nuevo documento
         * @param {Object} documento - Datos del documento a crear
         * @returns {Promise<Object>} Documento creado
         */
    create: async (documento) => {
      const response = await client.post(ENDPOINTS.DOCUMENT, documento)
      return response.data
    }
  }
}
