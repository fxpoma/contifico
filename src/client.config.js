import axios from 'axios'

// Constantes para configuración
const CONFIG = {
  BASE_URL: 'https://api.contifico.com/sistema/api/v1',
  TIMEOUT: 1000000, // Timeout de 1000 segundos
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

// Mensajes de estado en un objeto congelado para prevenir modificaciones
const STATUS_MESSAGES = Object.freeze({
  200: 'Ejecución Correcta: Devuelto al ejecutar correctamente una consulta',
  201: 'Objeto Creado: Devuelto al crear un objeto nuevo',
  400: 'Solicitud Incorrecta: El requerimiento es incorrecto',
  401: 'No Autorizado: No se ha proporcionado las credenciales o son incorrectas',
  403: 'Acceso Denegado: No se tiene permiso para entrar al recurso',
  404: 'No Encontrado: El objeto que se trata de consultar no existe',
  500: 'Error Interno: Error interno del sistema'
})

// Clase para manejar errores personalizados
class ApiError extends Error {
  constructor (status, message) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

// Crear instancia de axios con configuración
const createApi = ({ apiKey }) => {
  const api = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: CONFIG.TIMEOUT,
    headers: {
      ...CONFIG.HEADERS,
      Authorization: apiKey
    }
  })

  // Función para manejar errores
  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status
      const message = `⛔ ${STATUS_MESSAGES[status] || 'Error desconocido'}`
      throw new ApiError(status, message)
    }
    throw new ApiError(0, 'Error de red o problema al conectar con el servidor')
  }

  // Función para manejar respuestas exitosas
  const handleSuccess = (response) => {
    const message = STATUS_MESSAGES[response.status]
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${message}`)
    }
    return response
  }

  // Interceptores
  api.interceptors.request.use(
    (config) => {
      // Validar token antes de hacer la petición
      if (!config.headers.Authorization) {
        throw new ApiError(401, STATUS_MESSAGES[401])
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(handleSuccess, handleError)

  // Función de reintento automático
  api.retry = async (request, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await request()
      } catch (error) {
        if (i === maxRetries - 1) throw error
        if (error.status === 429) { // Too Many Requests
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))) // Espera exponencial
          continue
        }
        throw error
      }
    }
  }
  return api
}

export default createApi
