import Vue from 'vue'
import Router from 'vue-router'
import GoodLists from '@/view/GoodLists'
import Cart from '@/view/Cart'
import Address from '@/view/Address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodLists',
      component: GoodLists
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    }
  ]
})
