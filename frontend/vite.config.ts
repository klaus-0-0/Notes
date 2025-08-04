import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // No need for historyApiFallback, Vite handles SPA fallback by default
  },
})
