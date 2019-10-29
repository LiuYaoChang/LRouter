import View from './components/view'
import Link from './components/link'
// 1. mixnis 一个钩子函数， beforeCreate

var _Vue
export function install (Vue) {
  if (install.installed && Vue === _Vue) return
  _Vue = Vue
  install.installed = true

  const isDef = v => v !== undefined

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)

        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // Vue.component()
  Vue.component('LRouterView', View)
  Vue.component('LRouterLink', Link)
}
