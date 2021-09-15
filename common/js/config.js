export default {
  /**
   * @param {*} bool 为真或不传 显示loading， false关闭loading
   * @returns 
   */
  loading: function (bool) {
    
    if (bool == undefined || bool) {
      if(document.querySelector("#Y_tip")){
        return;
      }
      var div = document.createElement("div");
      div.id = "Y_loading";
      div.innerHTML = `
      <div class="l-box j-full-curbox" style="position:fixed;z-index:999">
        <div class="l-circle">
          <div class="c1"></div>
          <div class="c2"></div>
          <div class="c3"></div>
          <div class="c4"></div>
        </div>
        <span>loading</span>
      </div>`;
      document.body.appendChild(div);
      return;
    }
    document.querySelector("#Y_loading") ? document.body.removeChild(document.querySelector("#Y_loading")) : "";
  },

  /**
   * @param {*} val 提示语
   * @param {*} col  颜色
   * @param {*} bool 时间
   * @returns 
   */
  tip: function (val, col, bool) {
    if(document.querySelector("#Y_tip")){
      return;
    }
    var div = document.createElement("span");
    div.id = "Y_tip";
    if (!val) {
      val = '暂无数据';
    }
    div.innerHTML = `<div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background:${col?col:'#999'};opacity:0.8;z-index:999;font-size:0.15rem;color:#fff;padding:0.07rem;border-radius:5px;">${val}</div>`;
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.removeChild(document.querySelector("#Y_tip"));
    }, bool ? bool : 2000)
  },

  // 语音播报
  reader:function(text){
   
    let u =window.navigator.userAgent;

    var isAndroid  = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ;

    if(isAndroid){
      let audio =  new Audio('http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + text);

      audio.pause();

      audio.play();

      return;
    }
    
    let audio =  window.speechSynthesis;

    audio.cancel();

    var msgAudio = new window.SpeechSynthesisUtterance();

    msgAudio.text = text;

    //用声音阅读文字， 语音播放
    audio.speak(msgAudio); 

                
  //  n.cancel();  //取消阅读
  //  n.pause();  //暂停阅读
  },

  // 浙里办拨打电话
  call:function(phone){
    dd.ready({
      developer: 'jiangc@dtdream.com',
      usage: [
        'dd.biz.telephone.call'
      ],
      remark: 'call'
    }, function () {
      dd.biz.telephone.call({
        corpId: phone,
        onSuccess: function (data) {
          console.log("success:" + JSON.stringify(data))
        },
        onFail: function (error) {
          console.error("error:" + JSON.stringify(error))
        }
      })
    })
  },

  /**
   * @param {*} arr  需要去重的对象
   * @param {*} key  根据对象中的某个值来去重
   * @returns 
   */
  distinct:function(arr,key) {
    var obj ={}
    var arrCl = arr.reduce(function (item,next) {
      //console.log("item",item)
      obj[next[key]]?"":obj[next[key]]=true&&item.push(next)
      return item;
    },[])
    return arrCl;
  },

  // 数组对象排序  若 a 小于 b 在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值
  /**
   * @param {*} arr  需要排序的数组
   * @param {*} key  根据数组中的某个值来去重
   * @param {*} type 默认升序
   * @returns 
   */
  sort:function(arr,key,type){
    return arr.sort(function(a,b){
      if(type){
        return -(a[key] - b[key])
      }
      return a[key] - b[key];
    })
  },

  /**
   * @param {*} str 需要操作的字符串
   * @param {*} key 通过什么进行切分
   * @returns 
   */
  split(str,key){
    return str.split(key?key:',')
  },

  // 字符串转数组  并返回传入arr对应的值拼接的字符串
  /**
   * @param {*} str 需要处理的字符串
   * @param {*} key 通过什么字符处理为str数组
   * @param {*} obj str数组的值所映射的值
   */
  strDraw:function(str,key,obj){
    return str.split(key).map(value=>{
      return obj[value]
    })
  },

  //地址参数 对象合成
  httprequestquery(list){
    let params = [];
    
    for(let i in list){
      params.push(i + "=" + list[i]);
    }
    return params.length>0 ? '?' + params.join("&") : '';
  },

  //地址参数 对象合成 加密 list 传参对象  boolen 如果不存在或者为真就加密  boolen false解密
  httprequestencode(list,boolen){
    let params = [];

    boolen?boolen:true;
   
    for(let i in list){
      let item =boolen?window.btoa(unescape(encodeURIComponent(list[i]))):decodeURIComponent(escape(window.atob(list[i])));
      params.push(i + "=" + item);
    }
    return params.length>0 ? '?' + params.join("&") : '';
  },


  //检测是微信还是支付宝 0:普通 1:微信 2:支付宝 3:浙里办
  checkBrowser: function () {
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      return 1;
    } else if (/AlipayClient/.test(window.navigator.userAgent)) {
      return 2;
    } else if (/ZLB/.test(window.navigator.userAgent)) {
      return 3;
    } else {
      return 0;
    }
  },

  getParams: function (search) {
    var r = {}
    if (search == undefined) {
      search = window.location.href.split('?')[1];
    } else {
      search = search.split('?')[1];
    }

    if (!search) return;
    var arr = search.split('&');

    if (!arr.length) {
      return;
    }

    for (var i = 0; i < arr.length; i++) {
      var s = arr[i].split('=');
      r[s[0]] = decodeURI(s[1]);
    }
    return r;
  },

  /**
   * 根据身份证号码获取性别，性别是根据身份证的倒数第二位来判断的，奇数为男，偶数为女
   *
   * @export
   * @param {*} idCard
   * @returns
  */
  getSexFromIdCard:function(idCard) {
    let sex = "";
    if (parseInt(idCard.slice(-2, -1) % 2) == 1) {
      sex = "male";
    } else {
      sex = "female";
    }
    return sex;
  },


  /**
   * 根据出生年月日获取年龄
   *
   * @export
   * @param {*} birthday
   * @returns
   */
  getAgeFromBirthday:function(birthday) {
    let birthDate = new Date(birthday)
    let nowDateTime = new Date()
    let age = nowDateTime.getFullYear() - birthDate.getFullYear()
    if (nowDateTime.getMonth() < birthDate.getMonth() ||
      (nowDateTime.getMonth() == birthDate.getMonth() &&
        nowDateTime.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  },

  /**
   * 根据身份证号码获取出生年月日
   *
   * @export
   * @param {*} idCard
   * @returns
   */
  getBirthdayFromIdCard:function (idCard) {
    let birthday = "";
    if (idCard != null && idCard != "") {
      if (idCard.length == 15) {
        birthday = "19" + idCard.substr(6, 6);
      } else if (idCard.length == 18) {
        birthday = idCard.substr(6, 8);
      }
      birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
  }
}


//移动端（iphone6,7,8）动态设置基于html fontSize 10px = 1rem;
!(function (doc, win) {
  var docEle = doc.documentElement,
    // evt = "onorientationchange" in window ? "orientationchange" : "resize",
    evt = 'resize',
    fn = function () {
      var width = docEle.clientWidth;
      // console.log(width);
      width = width < 320 ? 320 : width;
      width = width > 640 ? 640 : width;
      width && (docEle.style.fontSize = (width / 3.75) + "px");
    };

  win.addEventListener(evt, fn, false);
  fn();
  // doc.addEventListener("DOMContentLoaded", fn, false);

}(document, window))

Date.prototype.format = function (fmt) { //author: meizz 
  var cNumber = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒
    'w+': cNumber[this.getUTCDay()], //星期
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}