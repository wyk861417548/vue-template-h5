export default {
   
  // 默认请求地址
  // baseUrl:"http://192.168.0.246:8253/",
  // baseUrl:"http://192.168.0.243:8253/",

  // 本地配置代理
  baseUrl:'api/',

  // 线上
  // baseUrl:"https://amyserver.anji.gov.cn/",


  // 是否模拟登陆  false 真实登录  true 模拟登陆
  mock:false,
  
  
  // 授权会前端地址
  // callback_url:'http://192.168.0.244:8080',
  // callback_url:'http://yima.dev.vihost.cn/web/project_n/h5/axy/login/index.html',
  // 线上
  callback_url:"https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001820465/reserved/index.html",

  common:{
    // 是否登录
    isLogin:'auth/isLogin',

     // 个人登录
    person:'zheliban/login',

    // 获取用户信息
    info:"member/info",

    // 模拟个人登录
    personMock:"internal/zlb/p/login",
    
    // 模拟登陆
    mockLogin:"internal/mockLogin",

    // 获取菜单模块
    plugin:"menu/category/details/",

    //上传图片
    file:"file/comm/upload",

  },
  
  // 安养码
  code:{
    // 申领安养码
    apply:"code/applyBind",

    // 获取安养码
    refresh:"code/refresh/"
  },
  
  // 老人
  elderly:{
    // 获取已绑定的老人列表
    list:"oldMan/list",

    // 解绑
    unbound:'oldMan/relieve',
    
    // 上传头像
    avatar:"oldMan/head"
  },

  // 推送消息
  msg:{
    // 推送消息列表
    list:"msg/list"
  },

  // 验证码
  verificat:{
    // 发送验证码
    send:"sms/send"
  },

  // 养老机构
  pension:{
    // 列表
    list:"org/list",

    // 机构详情
    detail:"org/detail",

    
    // 申请入住
    apply:"live/apply",

    // 入住申请进度
    process:"live/apply/progress"
  },

  // 护士
  nurse:{
    // 列表
    list:'nurseInformation/org/list',

    // 详情
    detail:'nurseInformation/org/detail',

    // 优秀员工
    excellent:"nurseInformation/org/excellent"
  },

  // 房间
  room:{
    // 列表
    list:"room/org/list",

    // 详情
    detail:"room/org/detail",

    // 预约房间
    appointment:"room/org/roomAbout",

    // 房间预约记录
    appointmentList:"/room/org/roomAboutList"
  },

  // 用户点评
  user:{
    // 列表
    list:'evaluate/org/list'
  },

  // 探视预约
  visit:{
    // 预约
    appointment:"visitingAppointment/visit",
    
    // 预约信息
    info:"visitingAppointment/visit/list",

    // 取消预约
    delete:"/visitingAppointment/visit/delete"
  },

  // 在线缴费
  bill:{
    // 查询缴费记录
    list:"moneyDetails/org/list"
  },

  // 服务记录
  service:{
    // 服务记录
    list:"ser/org/list",
    
    // 取消服务
    cancel:"/ser/org/delete"
  },

  // 我的  功能模块
  my:{
    // 联系人管理
    contacts:{
      // 联系人列表
      list:"contacts/list",
      
      // 新增 
      add:"contacts/post",

      // 删除
      delete:"contacts/delete"
    },
    
    // 身份信息
    identity:{
      // 提交认证信息
      authentication:"information/authentication",

      // 获取认证老人信息
      info:"information/detail",
      
      // 是否已认证
      isCertificat:"/information/certification"
    },

    
    check:{
      // 健康自测
      healthy:"healthyCheck/healthy",
      
      // 失能评估
      disability:"information/disability"
    }
  }
}