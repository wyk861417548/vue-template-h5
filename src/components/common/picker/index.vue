<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class='picker' v-show="show">
    <div class="mask j-full-fixed" :style="csscontroll ? 'opacity: 1;' : 'opacity: 0;'"></div>
    <div class="contont j-full-fixed j-flex-col" style="z-index:666" :style="csscontroll?'transform: translateY(0);opacity: 1;' : 'transform: translateY(100%);opacity: 0;'">
      <!-- 点击阴影部分 -->
      <div style="flex:1;"  @click="hide = true"></div>

       
      <div class="slot">
        <!-- 头部确认 -->
        <slot name="header">
          <div class="header j-flex">
            <p @click="hide = true" style="color:#5A5B5C;">取消</p>
            <p>请选择</p>
            <p @click="confirm">确定</p>
          </div>
        </slot>

        <!-- 内容区 -->
        <slot name="container"></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      show:false,

      // 控制css变量
      csscontroll:false,

      // 控制css隐藏
      hide:false
    };
  },

  created(){},

  methods: {
    close(){
      this.show = false;
    },

    confirm(){
      this.show = false;
    }
  },

  watch:{
    show(newV){
      if(newV){
        setTimeout(()=>{
          this.csscontroll = true;
        },100);
        
        setTimeout(()=>{
          this.hide = false;
        },600);
      }
    },
    
    hide(newV){
      if(newV){
        setTimeout(()=>{
          this.csscontroll = false;
        },100)
        
        setTimeout(()=>{
          this.show = false;
        },600);
      }
    }
  },
}
</script>
<style lang='scss' scoped>
  .picker{
    .mask{
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;	
      transition: all .6s ease-in-out;	
    }
    .contont{
      justify-content: space-between;
      transform: translateY(100%);
      transition: all .5s linear;
      .slot{
        background: #fff;
        .header{
          padding:10px 20px;
          border-bottom:1px solid rgba(200,200,200, .2);
        }
      }
    }
  }
</style>