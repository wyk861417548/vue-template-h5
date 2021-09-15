<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    //微信授权登录  判断是否登录
    login(name){
      this.$get(this.$api[name].login).then((res)=>{
        sessionStorage.AUTHORIZE = true;
        if(name == "zlb"){
          this.init();
        }
      })
    },
    // 初始化浙里办以及获取登录后从后台拿取到的浙里办用户信息和用户id
    init(){
      var that = this;
      
      var params = this.$config.getParams()?this.$config.getParams().info:'';

      // 如果沒有重地址栏获取到浙里办数据
      if(!params) return;

      if(params && params.indexOf("#") != '-1'){
        params = params.slice(0,params.indexOf("#"));
      }

      var arr =  params?this.decode(params).split("-"):[];
 
      // 登录成功后后台回传埋点信息给前端埋点
      if(arr.length > 0 ){
        sessionStorage.AUTHORIZE = true;
        dd.ready({
          developer: 'jiangc@dtdream.com',
          usage: [
              'dd.device.location.get'
          ],
          remark: '获取位置信息（GPS）'
        }, function () {
          that.setbury(arr);
        })
      }
    },

    // 解码url参数
    decode(str){
      return decodeURIComponent(escape(window.atob(str)))
    },

    
    // 埋点
    setbury(arr){
      console.log("开始埋点");
      // 初始化
      (function(w, d, s, q, i) { w[q] = w[q] || []; var f = d.getElementsByTagName(s)[0],j = d.createElement(s); j.async = true; j.id = 'beacon-aplus'; j.src = 'https://d.alicdn.com/alilog/mlog/aplus.js?id=202951085'; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'aplus_queue');
      
      // 基础埋点
      aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn'] });
      aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn'] });
      aplus_queue.push({ action: 'aplus.setMetaInfo',arguments: ['appId', '60506758'] });
      
    
      // 获取地理位置以及PV日志 埋点
      dd.device.location.get ({
        onSuccess: function(data) {
          localStorage.site = JSON.stringify({long:data.longitude,lati:data.latitude})
          console.log("localStorage.site",localStorage.site);
          aplus_queue.push({ 
            action: 'aplus.sendPV', 
            arguments: [
              {is_auto: false, },
              {
                long:data.longitude, 
                lati:data.latitude,
                userType:"puser",
                miniAppId:'2001820465',
                miniAppName:'安民养'
              }
          ] 
          });
        },
        onFail: function(error) {
          console.log("onFail",error);
        }
      })

      aplus_queue.push({action: 'aplus.setMetaInfo', arguments: ['_user_id', arr[1]]});
      aplus_queue.push({action: 'aplus.setMetaInfo',  arguments: ['_user_nick',arr[2]]});

      // this.skip()
    },


    skip(){
      if(sessionStorage.AUTHORIZE == 'true' && sessionStorage.url != 'false'){
        var url = sessionStorage.url.slice(1);
        sessionStorage.url = false;
        setTimeout(()=>{
          this.$router.push({path:url});
        },500)
      }
    }
  }
}
</script>
<style lang='scss' scoped>

</style>