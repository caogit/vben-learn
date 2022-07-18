import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import requireTransform from 'vite-plugin-require-transform'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.ts$|.vue$/,
    }),
  ],
  resolve: {
    //设置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/@': path.resolve(__dirname, './src'),
      '/#': path.resolve(__dirname, './types'),
      '*': path.resolve(''),
    },
  },
  server: {
    proxy: {
      '/basic-api': {
        target: 'http://localhost:8080/jeecg-boot',
        changeOrigin: true,
        rewrite: (path) => path.replace('/basic-api', ''),
      },
    },
  },
})
