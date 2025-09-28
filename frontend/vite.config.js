import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server:{
    port:3000,
    host:true,
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
        secure:false,
      }
    }
  }
})