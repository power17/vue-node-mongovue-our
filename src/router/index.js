import Vue from 'vue'
import Router from 'vue-router'
import GoodLists from '@/view/GoodLists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodLists',
      component: GoodLists
    }
  ]
})
