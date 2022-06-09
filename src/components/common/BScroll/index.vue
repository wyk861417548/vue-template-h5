<template>
  <div ref="scroll" class="pullup-wrapper">
    <div class="pullup-content">

      <slot></slot>

      <div class="pullup-tips">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <div v-show="status==1" style="height:100vh;display: flex;justify-content: center;align-items: center;">
            <div style="margin-top:-60%">
              <img src="@/static/images/nodata.png" alt="图片">
              <div style="color:#5A5B5C;">暂无数据</div>
            </div>
          </div>
          <span v-show="status!=1" class="pullup-txt">{{status==2?"已经到底了":'上拉加载更多数据'}}</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(Pullup);
BScroll.use(MouseWheel)

export default {
  props:{
    options:{
      type:Object,
      default:()=>{
        return {
          // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
          // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
          // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
          // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
          probeType: 3,

          // 手指滑动滚动
          pullUpLoad: true,

          // 鼠标拖拽滚动
          mouseWheel: true,

          // 允许触发点击事件
          click: true,
        }
      }
    },
    // 配置
    props:{
      type:Object,
      default:()=>{
        return {multiple:false}
      }
    },
  },
  data() {
    return {
      isPullUpLoad: true,

      //上拉加载默认状态 0：可加载 1：无数据 2已结束
      status:0
    };
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.scroll,this.options);

      this.scroll.on("pullingUp", this.pullingUpHandler);
    },

    // 触发上拉加载
    pullingUpHandler() {
      // 上拉加载完毕
      if(this.status != 0)return;

      this.isPullUpLoad = true;

      this.$emit("change");

      // 注意一定要保证  数据渲染完成
      // this.$nextTick(()=>{
      //   this.$refs.scroll.finishPullUp();
      // })
    },

    // keep-alive  重新加载  
    reload(){
      // 数据加载完成
      this.scroll.scrollTo(0,0);
      this.scroll.finishPullUp()
      this.scroll.refresh();
      this.isPullUpLoad = true;
      
    },

    // 容器刷新
    finishPullUp() {
      // 数据加载完成
      this.scroll.finishPullUp()
      // 重新计算容器高度
      this.scroll.refresh();
      this.isPullUpLoad = false
      this.status = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.pullup-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>