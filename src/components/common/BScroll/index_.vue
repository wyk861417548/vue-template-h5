<template>
  <div class="my-scroll j-full-curbox" ref="scroll" id="scroll" @scroll="onScroll">

    <slot></slot>

    <div v-show="state.state_==1" class="j-full-curbox">
      <div class="j-full-center" style="top:40%;text-align:center;">
        <img src="@/static/images/nodata.png" alt="图片">
        <div style="color:#5A5B5C;">暂无数据</div>
      </div>
    </div>
    <div v-show="state.state_==2"  style="text-align:center;line-height:1;padding:.1rem;font-size:.14rem;color:#c5c5c5;">
      已经到底了
    </div>
  </div>
  
</template>
<script>
export default {
  //上拉加载默认状态 0：可加载 1：无数据 2已结束
  props:['state'],
  data () {
    return {
      position:{
        scrollHeight:"",
        scrollTop:0,
        clientHeight:""
      },
      // 距离底部还有多远触发
      bottom:10,
    };
  },
  created(){
    
  },

  activated(){
    // 设置离开前的位置距离
    this.$nextTick(()=>{
      this.$refs.scroll.scrollTop = this.position.scrollTop;
    })
    
  },

  mounted(){
  
  },
  methods:{
    // 监听滚动  上拉加载默认状态 state.state_ 0：可加载 1：无数据 2已结束
    onScroll(e){
      // 当前1滚动盒子
      var aim = e.target;

      this.position ={
        scrollHeight:aim.scrollHeight,
        scrollTop:aim.scrollTop,
        clientHeight:aim.clientHeight
      }

      if(this.state.state_ !=0)return;
      
      // 如果当前盒子总滚动高度减去距离底部距离 不大于 滚动距离 + 盒子默认占据高度  可以加载数据
      var site = (aim.scrollHeight-this.bottom) <= Math.ceil(aim.scrollTop+aim.clientHeight);


      // 传递给父组件可以加载数据
      if(site){
        this.$emit("scroll",{site:site})
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .my-scroll{
    width:100%;
    height:100%;
    overflow: auto;
  }
</style>