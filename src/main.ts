import { createApp } from 'vue'
import '@/scss/index.less'
import App from './App.vue'
import { router, setupRouter } from '@/router/index'
import { setRouterGuard } from '@/router/guard/index'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)

  // use路由
  setupRouter(app)

  // 使用路由守卫
  setRouterGuard(router)

  // 使用pinia
  setupStore(app)

  app.mount('#app')
}
bootstrap()
