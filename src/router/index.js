import Vue from 'vue'
import LRouter from '../lib/LRouter'

import Index from '../pages/Index'
import Detail from '../pages/Detail'

Vue.use(LRouter)

export default new LRouter({
  model: 'hash',

  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
