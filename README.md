# About

此项目是基于vue-cli3.x构建的,基于vant框架的h5模板。
## 技术栈
vue2 + vuex + vue-router +  + ES6/7 + sass + vant

## 目录结构
```
├── public                     # 静态资源
│   └── index.html             # html模板
├── src                        # 源代码
│   ├──static                  # 图片、字体等静态资源 (存放不会变动的文件，不会被webpack处理)
        ├──css                 # css
        ├──images              # 图片
        ├──js                  # 公共js
            ├──index           # 全局主动注册公共组件
            ├──config          # 公共方法
            ├──request         # 公共请求封装
            ├──validator       # 提交校验
    ├──assets                  # 图片、字体等资源  （存放会变动的文件，会被webpack处理）
        ├──images              # 图片
        ├──less                # 自定义全局less
│   ├── components             # 全局公用组件
        ├──common              # 全局公共组件（“自动注册” 遵循一个文件夹里面定义index.vue格式，文件夹名称作为全局组件使用名称）
        ├──code                # 发送验证码倒计时
        ├──qrcode              # 生产二维码
        ├──swiper              # 轮播图
        ├──upload              # 上传图片
        ├──webSocket           # webSocket链接
│   ├── router                 # 路由
│   ├── store                  # 全局store管理
│   ├── utils                  # 全局公用方法
        ├── api                # 请求接口配置
        ├── plugins            # 插件引入
│   ├── views                  # views所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── .borwserslistrc            # 浏览器兼容相关
├── .env.xxx                   # 环境变量配置（dev:本地环境，prod：生产环境，test：测试环境）;
├── .eslintrc.js               # eslint 配置项
├── .gitignore.js              # git忽略文件设置
├── .babelrc.config.js         # babel-loader 配置
├── package.json               # package.json
├── postcss.config.js          # postcss 配置
└── vue.config.js              # vue-cli 配置
```
# 1.懒加载图片组件使用
```
<section v-for="(item,index) in imgList" :key="index">
  <img v-lazy="item.img" alt="" style="width:200px;height:200px;">
</section>

imgList:[
  {name:"1",menuId:'1',img:require('@/static/images/nodata.png')},
  {name:"2",menuId:'10013',img:require('@/static/images/nodata.png')},
]
```

# 2.滚动组件使用
```
<BScroll ref="scroll" @change="change" :vdata="dataList">
  <div class="list"  v-for='(item,index) in dataList' :key='index' @click="$skip" data-url="/index2">
    {{item.name}} -- {{item.age}}
  </div>
</BScroll>

data () {
  return {
    dataList:[],

    count:1,
  };
},

getData(){
      
  setTimeout(()=>{
    this.count++;
    console.log("this.",this.count,this.dataList);
    for (let i = 0; i < 20; i++) {
      this.dataList.push({name:this.count+"---i---"+i,age:i})

      console.log("正在填充数据");
    }

    // 注意一定要保证  数据渲染完成
    this.$nextTick(()=>{
      this.$refs.scroll.finishPullUp();
      
      if(this.dataList.length < 1){
        this.$refs.scroll.status = 1;
        return;
      }

      if(this.count == 4){
        //上拉加载默认状态 0：可加载 1：无数据 2已结束
        this.$refs.scroll.status = 2;
        return;
      }
      
    })
    
  },2000)
}
```
