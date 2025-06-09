import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@components': path.resolve(__dirname, './app/components'),
      '@pages': path.resolve(__dirname, './app/pages'),
      '@hooks': path.resolve(__dirname, './app/hooks'),
      '@services': path.resolve(__dirname, './app/services'),
      '@store': path.resolve(__dirname, './app/store'),
      '@types': path.resolve(__dirname, './app/types'),
    }
  },
  server: {
    port: 5173,
    open: true
  }
})