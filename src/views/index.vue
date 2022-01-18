<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div>
    <BScroll ref="scroll" @change="change" >
      <div class="list" style="pointer-events: auto;" v-for='(item,index) in dataList' :key='index'>
        {{item.name}} -- {{item.age}}
      </div>
    </BScroll>
  </div>

</template>

<script>
export default {
  data () {
    return {
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
    getData(){
      
      setTimeout(()=>{
        this.count++;
        console.log("this.",this.count,this.dataList);
        // for (let i = 0; i < 20; i++) {
        //   this.dataList.push({name:this.count+"---i---"+i,age:i})

        //   console.log("正在填充数据");
        // }
        // 注意一定要保证  数据渲染完成
        this.$nextTick(()=>{
          this.$refs.scroll.finishPullUp();
          this.$refs.scroll.status = 1;
          return;
          if(this.count == 4){
            //上拉加载默认状态 0：可加载 1：无数据 2已结束
            this.$refs.scroll.status = 2;
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
  .list{
    height: .5rem;
    background: #ddd;
    line-height: .5rem;
    text-align: center;
    
  }

</style>