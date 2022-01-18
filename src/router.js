import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')
    },
    {
      path: '/index',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')
    }
  ]
})
