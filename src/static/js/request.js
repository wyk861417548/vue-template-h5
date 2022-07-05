import axios from 'axios';
import F from "@/utils/config.js";

// 环境的切换
axios.defaults.baseURL =process.env.VUE_APP_URL;
// 请求超时时间10000
axios.defaults.timeout = 10000;
//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';


// loading加载动画计数器
var count = 0;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    loading(true);
    return config;
  },
  error => {
    loading(true);
    return Promise.error(error);
  }
)

// 响应拦截器
axios.interceptors.response.use(res => {
    loading(false);
    return Promise.resolve(res);
  },
  // 服务器状态码不是200的情况    
  error => {
    loading(false)
    console.log('err',error.response);
    if (error.response) {
      switch (error.response.status) {       
        case 401: 
          break;          
        case 403:
          break;   
        case 404:
          F.tip('网络请求不存在');
          break;
        default:
          F.tip("请稍后再试");
      }
      return Promise.reject(error.response);
    }
    F.tip(error.msg ? error.msg : "请稍后再试");
  }
);

/** 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} opt 用于自定义处理配置
 */
 export function get(url, params,opt={}) {
  return new Promise((resolve) => {
    axios.get(url,{params}).then(res => {
      return requestHandle(res,opt,resolve);
    }).catch(()=>{})
  })
  
}

export function post(url, params,opt={}) {
  return new Promise((resolve) => {
    axios.post(url,{params}).then(res => {
      return requestHandle(res,opt,resolve);
    }).catch(()=>{})
  })
}

export function postmult(url, params, opt={}){
  return new Promise((resolve) => {
    axios.post(url,{params},{'Content-Type': 'multipart/form-data'}).then(res => {
      return requestHandle(res,opt,resolve);
    }).catch(()=>{})
  })
}

// 统一请求动画计数
function loading(boolean){
  if(boolean){
    ++count == 1 ? F.loading() : "";
  }else{
    --count == 0 ? F.loading(false) : "";
  }
}

// 请求返回处理
function requestHandle(res,opt,resolve){
  if (res && res.data.code == 200 || opt.back) {
    resolve(res.data)
  }
  res && handle(res.data)
}

//错误统一处理
function handle(res) {
  //  未登录处理
  if (res.code == "401" || res.code == '-9001') {
    F.tip(res.msg ? res.msg : "请稍后再试");
    return;
  }
  F.tip(res.msg ? res.msg : "请稍后再试");
}




