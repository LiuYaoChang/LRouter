
export class History {
  current = {
    path: '/'
  }
  router = null

  constructor (router, START) {
    this.router = router
  }

  listen (cb) {
    this.cb = cb
  }
  transitionTo (location, onComplete) {
    const route = this.router.match(location)
    this.confirRoute(() => {
      this.updateRoute(route)
    })
  }

  confirRoute (cb) {
    cb()
  }
  // 更新路由变化
  updateRoute (route) {
    const preRoute = this.current
    console.log(preRoute)
    this.current = route
    this.cb(route)
  }
}
