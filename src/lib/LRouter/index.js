// const name: string = 'test'
import { createMatcher } from './create-matcher'
import { HashHistory } from './history/hash'
import { install } from './install'
// export { name }
export default class LRouter {
  matcher = null
  history = null
  app = null
  apps = []


  constructor(options) {
    const routes = options.routes
    this.matcher = createMatcher(routes)
    this.history = new HashHistory(this, '/')
  }

  match (raw, current, redirectFrom) {
    return this.matcher.match(raw, current, redirectFrom)
  }
  // 1. 记录当前VM实例，
  // 2. 添加VM在注销的钩子
  // 3. 给history 添加回调处理
  init (app) {
    // this.app = app

    this.apps.push(app)

    app.$once('hook:destroyed', () => {
      let index = this.apps.indexOf(app)

      if (index > -1) this.apps.slice(index, 1)

      if (this.app === app) this.app = this.apps[0] || null
    })


    if (this.app) return

    this.app = app

    const history = this.history

    history.setListener()

    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route
      })
    })
  }
}

LRouter.install = install
LRouter.version = '__VERSION__'
