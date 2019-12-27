# LRouter

> implement the core about the vue-router

## 运行项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

<!-- <p align="center">
    <a href="https://weapp.iviewui.com">
        <img width="200" src="https://file.iviewui.com/weapp-logo.svg">
    </a>
</p> -->

# LRouter DEMO

### Vue-Router 核心原理解剖
## Vue 如何实现插件化
我们都知道Vue有一个全局API：use 可以安装插件，但其实现本质是什么？
```
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
```

从Vue.use的实现中可以发现核心就是我们在封装插件的时候，要在实例上挂载一个install 方法，只要调用use 的方法，你就可以在当前插件的install 方法中获取 到当前Vue引用，你就可以在install 方法中实现你想做的操作。

## 简述Vue-Router设计
- 根据用户传入的routes配置项生成匹配规则
- 监听路由变化
- 当路由变化触发视图刷新，将匹配的组件渲染到相应的Router-View中
- Vue-Router的插件化实现

### 由于时间因素，目前我只对VueRouter中的hash模式进行原理解析

#### 由单一职责原理我们将LRouter拆分如下几部分，这也是根据源码的目录进行讲解
- index 是我们创建LRouter实例的入口文件
   1. 初始化调用createMatcher生成路由匹配规则
   2. 通过HashHistory类生成 history对象，并注册hashChange事件，监听路由变化
   3. 当路由变化，调用回调修改根实例上的_route属性（响应式属性），触发视图重新渲染
- install 是我们实现LRouter插件化管理的文件
   1. 封装一个install 方法提供Vue.use使用，实现插件的入口
   2. install 方法中通过Vue.mixin方法为组件创建一个beforeCreate钩子
   3. 全局注册 LRouterView 和LRouterLink组件
   4. 实现响应式属性 _route
- create-matcher 主要是在创建LRouter实例的时候，生成macher对象，此对象是后面负责在路由变化 的时候进行规则匹配工作
- create-route-match 主要为create-macher生成匹配的规则
- components 我们定义LRouterView 和LRouterLink组件的目录
   1. link， 定义LRouterLink组件
   2. view, 定义LRouterView 组件

- history 是我们定义history类的目录
   1. base 类主要负责路由变化 后的匹配工作和，调用回调修改_route属性，触发渲染组件
   2. hash类主要是创建hashHistory对象，并监听hashchange事件


以上就是目录介绍，接下来我们就分别讲解具体代码的实现

# LRouter 类
- 构造函数，执行初始化工作获取LRouter实例
```
constructor (options) {
    const routes = options.routes
    // 生成匹配规则
    this.matcher = createMatcher(routes)
   // 创建history对象
    this.history = new HashHistory(this, '/')
  }
```
- 调用history监听hashchange事件，并注册路由变化 后的回调
```
  // 监听hashchange事件
    history.setListener()
  // 注册回调
    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route
      })
    })

```

# create-matcher
1. 调用createRouteMatcher生成匹配规则
2. 返回一个包含match方法的对象
下面是代码的实现
```
export function createMatcher (routes) {
  // 生成 匹配规则
  const { pathList, pathMap, nameMap } = createRouteMatcher(routes)
  // 获取 匹配的路由对象
  function match (location) {
    return pathMap[location]
  }

  return { match }
}
```

# HashHistory 类
1. 继承History类，并添加监听hashchange事件
2. 当路由变化执行继承的方法更新路由信息

```
export class HashHistory extends History {
  constructor (router, START) {
    super(router, START)
    console.log(START)
  }
  // 注册hashchange事件监听
  setListener () {
    window.addEventListener('hashchange', () => {
      // 路由变化 了
      this.transitionTo(getHash(), () => {

      })
    })

    window.addEventListener('load', () => {
      // 页面加载完成初始化
      // getHash 是一个辅助函数，获取 url 中#后面的路径
      this.transitionTo(getHash(), () => {

      })
    })
  }
}

// 从History 继承的方法
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

```

# 通过install 方法实现插件，可以通过Vue.use使用
```
// 避免重复注册
 if (install.installed && Vue === _Vue) return
  _Vue = Vue
  install.installed = true

// 通过混入给Vue实例和子组件添加一个beforeCreate钩子
 Vue.mixin({
    beforeCreate () {
      // 如果 是根组件就添加一个_routerRoot属性指向根实例
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        // 记录当前的Router实例
        this._router = this.$options.router
        // 执行LRouter的init方法监听路由变化事件
        this._router.init(this)
        //  给根实例添加_route的响应式属性
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

// 添加访问代理 
Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // 全局注册link, view 组件
  Vue.component('LRouterView', View)
  Vue.component('LRouterLink', Link)

```


## VueRouter 是如何实现路由变化触发组件的重新渲染的？

我们在这简单讲解下，Vue 实现数据驱动去更新视图的大体过程

![图片alt](./static/images/vue-step.jpg, '图片title')
