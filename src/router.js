import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')
    },
    {
      path: '/index',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue'),meta: {title:"滚动页面",keepAlive:true}
    },
    {
      path: '/index2',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index2.vue')
    },
    {
      path: '/v-lazy',
      component: () => import(/* webpackChunkName: "about" */ '@/views/v-lazy.vue')
    }
  ]
})

// 全局路由守卫
router.beforeEach((to,path,next)=>{
  console.log("to",to);
  document.title = to.meta.title?to.meta.title:"xxx"
  next();
})

export default router;
