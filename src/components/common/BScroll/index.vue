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
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 3,
        pullUpLoad: true,
        mouseWheel: true
      });

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

    // 容器刷新
    finishPullUp() {
      // 数据加载完成
      this.scroll.finishPullUp()
      // 重新计算容器高度
      this.scroll.refresh();
      this.isPullUpLoad = false
    },
  },
};
</script>

<style lang="scss" scoped>
.pullup-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .list {
    margin-top: .2rem;
    height: 0.5rem;
    background: #ddd;
    line-height: 0.5rem;
    text-align: center;
  }
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>