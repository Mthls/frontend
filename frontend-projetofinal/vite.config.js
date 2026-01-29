import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicionado: proxy para desenvolver com o backend e saída de build para o Spring Boot
  server: {
    proxy: {
      // requisicoes para /api serão encaminhadas ao backend Spring Boot em localhost:8080
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // gera o build dentro do backend para o Spring Boot servir (ajuste se desejar outro caminho)
    outDir: path.resolve(__dirname, '../../Backend/biblioteca/src/main/resources/static'),
    emptyOutDir: true,
  },
})
