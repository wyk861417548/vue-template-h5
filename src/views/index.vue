<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div>
    <!-- <p @click="$skip" data-url="/index2">我是父級-{{data.title}}--{{data.content}}-----{{data.age}}</p> -->
    <BScroll ref="scroll" @change="change" :vdata="dataList">
      <div class="list"  v-for='(item,index) in dataList' :key='index' @click="$skip" data-url="/index2">
        {{item.name}} -- {{item.age}}
      </div>
    </BScroll>
    

    <!-- <Ceshi v-bind="data" @myEvent="handler">
      <template v-slot="{user}">
        <p>获取子组件数据{{user.name}}</p>
      </template>
    </Ceshi> -->
  </div>

</template>

<script>
import Ceshi from "./ceshi.vue"
export default {
  components:{
    Ceshi
  },
  data () {
    return {
      data:{
        xxx:"20",
        title:"大傻逼",
        content:{
          name:"你好",
          age:30
        }
      },

      dataList:[],

      count:1,

    };
  },

  created(){
    
  },

  mounted(){
    this.getData()
  },

  methods: {
    handler(){
      console.log("点击我");
    },

    skip(){
      console.log("你好");
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

    change(){
      this.getData();
    }
  }
}
</script>
<style lang='scss' scoped>
  .list {
    margin-top: 20px;
    height: 50px;
    background: #ddd;
    line-height: 50px;
    text-align: center;
  }

</style>