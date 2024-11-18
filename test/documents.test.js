import { getDocuments } from '../src/documents.js'
import { test, expect } from 'vitest'

import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode = 'development' }) => ({
  test: {
    // mode defines what ".env.{mode}" file to choose if exists
    env: loadEnv(mode, process.cwd(), '')
  }
}))

test('Variables de entorno', () => {
  expect(typeof process.env.VITE_API_KEY).toBe('string')
})

// test('prueba', async () => {
//   const response = await getDocuments()
//   expect(response.data).toHaveLength(10)
// })
