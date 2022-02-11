
1.懒加载图片组件使用
<section v-for="(item,index) in imgList" :key="index">
  <img v-lazy="item.img" alt="" style="width:200px;height:200px;">
</section>

imgList:[
  {name:"1",menuId:'1',img:require('@/static/images/nodata.png')},
  {name:"2",menuId:'10013',img:require('@/static/images/nodata.png')},
]

2.滚动组件使用
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
},

