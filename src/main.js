import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from "@common/js/config.js";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import {get,post,postmult} from "@common/js/request.js";
import api from "@common/js/api.js";
import validator from "@common/js/validator.js";


// 全局公共组件
import component from "@common/js/index.js";

Vue.config.productionTip = false

// 公共方法
Vue.prototype.$config = config;

// 请求方式
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;

// 接口文件
Vue.prototype.$api = api;

Vue.prototype.$validator = validator;


/** 
   * 页面跳转  
   *    如果设置data-url 使用路由地址跳转 （this.$route.query接受参数，地址栏上可见参数）
   *     params 是可以
   * */
 Vue.prototype.$skip = (e,params)=>{
  var dataset = e.target.dataset;
  var url = dataset.url;
  if(!url)return;
  app.$router.push({path:url,query:params?params:''});
}

Vue.prototype.$replace = (e,params)=>{
  var dataset = e.target.dataset;
  var url = dataset.url;
  if(!url)return;
  app.$router.replace({path:url,query:params?params:''});
}

Vue.use(ViewUI);
Vue.use(component);

var app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


export default app
