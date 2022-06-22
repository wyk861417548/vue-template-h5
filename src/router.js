import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {path: '/index',component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')},

    // 栗子
    {path: '/',component: () => import(/* webpackChunkName: "about" */ '@/views/example/tab/index.vue')},
    {path: '/vant',component: () => import(/* webpackChunkName: "about" */ '@/views/example/vant.vue'),meta: {title:"vant栗子",keepAlive:true}},
    {path: '/BScroll',component: () => import(/* webpackChunkName: "about" */ '@/views/example/BScroll.vue'),meta: {title:"滚动页面",keepAlive:true}},
    {path: '/BScrollDetail',component: () => import(/* webpackChunkName: "about" */ '@/views/example/BScrollDetail.vue'),meta:{title:"滚动详情",isBack:true}},
    {path: '/v-lazy',component: () => import(/* webpackChunkName: "about" */ '@/views/example/v-lazy.vue')},
    {path: '/vant-scroll',component: () => import(/* webpackChunkName: "about" */ '@/views/example/vant-scroll.vue'),meta: {title:"滚动页面",keepAlive:true}},
    {path: '/swiper',component: () => import(/* webpackChunkName: "about" */ '@/views/example/swiper.vue')}
  ]
})

// 全局路由守卫
router.beforeEach((to,path,next)=>{
  document.title = to.meta.title?to.meta.title:"安心查"
  next();
})

export default router;
