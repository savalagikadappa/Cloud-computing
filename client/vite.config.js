import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicitly set (already the default, just for clarity)
    sourcemap: true // Optional: generates sourcemaps for debugging
  }
})