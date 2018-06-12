import Vue from 'vue'
import Router from 'vue-router'
import Start from 'components/start/start'
import Home from 'components/home/home'
import Menu from 'components/menu/menu'
import Comment from 'components/comment/comment'
import Seller from 'components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/menu'
    },
    {
      path: '/home',
      redirect: '/home/menu'
    },
    {
      path: '/start',
      component: Start
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'menu',
          component: Menu,
        },
        {
          path: 'comment',
          component: Comment,
        },
        {
          path: 'seller',
          component: Seller,
        }
      ]
    }



  ]
})
