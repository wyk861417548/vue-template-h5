/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
 import axios from 'axios';
 import F from "@common/js/config.js";
 import api from "@common/js/api.js";
 import app from '@src/main.js'
 import { Modal } from 'view-design';
 
 // 不做限制的code，3007订单交易轮询中 3009订单交易失败
 const CODE = ["-3007",'-3009']
 
 // 环境的切换
 console.log('process.env.VUE_APP_URL',process.env.VUE_APP_URL);
 if (process.env.NODE_ENV == 'dev') {
   axios.defaults.baseURL = 'api/';
 } else{
   axios.defaults.baseURL = process.env.VUE_APP_URL;
 }
 
 // 请求超时时间
 axios.defaults.timeout = 10000;
 //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
 axios.defaults.withCredentials=true;
 
 // post请求头
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
 
 // loading加载动画第一次
 var count = 0;
 // 请求拦截器
 axios.interceptors.request.use(
  
   config => {
     // alert(++count);
     ++count==1?F.loading():"";
     return config;
   },
   error => {
     ++count==1?F.loading():"";
     return Promise.error(error);
   }
 )
  
 // 响应拦截器
 axios.interceptors.response.use(
   response => {
     --count==0?F.loading(false):"";
     // console.log("响应拦截response",response);
     if (response.status === 200) {
       return Promise.resolve(response);
     } else {
       return Promise.reject(response);
     }
   },
   // 服务器状态码不是200的情况    
   error => {
     --count==0?F.loading(false):"";
     // if(!error.response || error.response == undefined){
     //   location.href = "/main/index.html#/error";
     //   return;
     // }
     if (error.response) {
       switch (error.response.status) {
         // 401: 未登录                             
         case 401:
           break;
           // 403 token过期                            
         case 403:
           break;
           // 404请求不存在                
         case 404:
           F.tip('网络请求不存在');
           break;
           // 其他错误，直接抛出错误提示                
         default:
           F.tip(error.msg?error.msg:"请稍后再试");
           F.loading(false);
           
       }
       return Promise.reject(error.response);
     }
   }
 );
  
 //错误统一处理
 function handle(res){
   console.log("handle",res);
   // zlb
   if(res && (res.code == "401"  || res.code == '-9001')){
     sessionStorage.AUTHORIZE = false;
      // 线上测试环境地址
     let callback_url = process.env.VUE_APP_MODE != 'production'?api.callback_test:api.callback_online;
     console.log("api.callback_url--------",callback_url);
   
     location.href =process.env.VUE_APP_URL + api.common.person + "?callback_url="+callback_url;
     
     return;
   }
 
   // 如果老人没有去认证信息的话
   if(res && res.code == "-2006"){
     Modal.confirm({
       title:"您还没有认证请前往认证",
       onOk:()=>{ 
         app.$router.push({path:"/my/authentication"});
       }
     })
     return;
   }
   if(res && res.code == "-2008"){
     Modal.confirm({
       title:"您还没有完成健康自测",
       onOk:()=>{ 
         app.$router.push({path:"/my/healthy",query:{type:true}});
       }
     })
     return;
   }
 
   F.tip(res.msg?res.msg:"请稍后再试");
 }
 
 /** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} opt 用于自定义处理配置
 */
 export function get(url,params) {
   F.loading(false);
   F.loading();
   
   
 
   return new Promise((resolve, reject) => {
 
     axios.get(url,{params: params})
       .then(res => {
         F.loading(false);
        
         if(res && res.data.code == "200" || CODE.includes(res.data.code)){
           resolve(res.data);
         }else{
           handle(res.data)
         }
       })
       .catch(err => {
         console.log("err",err);
         F.loading(false);
         reject(err)
       })
   });
 }
 /** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
   F.loading(false);
   F.loading();
 
 
   return new Promise((resolve, reject) => {
 
     // if(!opt){url =api.baseUrl+url;}
     
     axios.post(url, params)
       .then(res => {
         
         F.loading(false);
 
         if(res && res.data.code == "200" || CODE.includes(res.data.code)){
           resolve(res.data);
         }else{
           handle(res.data)
         }
       })
       .catch(err => {
         F.loading(false);
         reject(err)
       })
   });
 }
 
 
 /** 
 * postmult方法，对应post请求  提交图片
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function postmult(url, params,opt,headers) {
   F.loading(false);
   F.loading();
 
   return new Promise((resolve, reject) => {
 
     
     axios.post(url, params,headers)
       .then(res => {
 
         F.loading(false);
 
         if(res.data.code == "200"){
           resolve(res.data);
         }else{
           handle(res.data)
         }
       })
       .catch(err => {
         F.loading(false);
         reject(err.data)
       })
   });
 }
 
 