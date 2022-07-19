import { App } from 'vue'
import { registerElement } from './regiseterd-element'

export function registerModule(app: App) {
  app.use(registerElement)
}
