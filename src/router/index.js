import Vue from 'vue'
import KRouter from '../lib/LRouter'
// import VueRouter from 'vue-router'

import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'

Vue.use(KRouter)

export default new KRouter({
  mode: 'hash',

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
