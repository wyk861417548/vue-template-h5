import Vue from 'vue'

// vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import Vconsole from 'vconsole'
if (process.env.NODE_ENV == 'dev') {
  let vConsole = new Vconsole()
  Vue.use(vConsole)
}


// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('@/static/images/lazy/error.png'),
  loading: require('@/static/images/lazy/default.png'),
  attempt: 2,
})