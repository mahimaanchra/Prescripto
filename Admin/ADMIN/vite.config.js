import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  theme:{
    extend : {
      colors:{
        'primary' : "#5F6FFF"
      }
    }
  }
})
