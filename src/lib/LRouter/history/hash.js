import { History } from './base'

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
    // window.addEventListener('load', () => {
    //   // 页面加载完成初始化
    //   this.transitionTo(getHash(), () => {

    //   })
    // })
  }

  // 注册完路由立即触发更新
  getCurrentLocation () {
    return getHash()
  }
}

// 获取 hash值
function getHash () {
  const href = window.location.href

  let index = href.indexOf('#')

  if (index > -1) {
    return href.slice(index + 1)
  } else {
    return '/'
  }
}
