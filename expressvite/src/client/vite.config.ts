import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  plugins: [react()],
  build: { outDir: './../../dist/client' },
  clearScreen: false,
  css: {
    postcss: {},
    modules: {},
    preprocessorOptions: {},
  },
  server: {
    // open: '/'  /** Opens the app in the browser on start */
    proxy: {},
    
  }
})
