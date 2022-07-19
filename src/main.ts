import { createApp } from 'vue'
import '@/theme/index.css'
// import 'ant-design-vue/dist/antd.css'
// import Antd from 'ant-design-vue'
import { registerModule } from '@/global/index'
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

  // 引入antDesignVue
  // app.use(Antd)

  // 引入组件库和icon
  app.use(registerModule)

  app.mount('#app')
}
bootstrap()
