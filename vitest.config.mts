import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'tests/*', 'cucumber.js', 'swagger.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['cucumber.js', 'swagger.ts', 'tests/*']
    },
  }
})