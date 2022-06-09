<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset='offset'
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot>
        
      </slot>
    </van-list>
</van-pull-refresh>
</template>

<script>
export default {
  props:{
    // 滚动条与底部距离小于 offset 时触发load事件
    offset:{
      type:Number,
      default:50
    }
  },
  data(){
    return {
      loading: false,
      finished: false,
      refreshing: false,
    }
  },

  methods: {
    // 上拉加载
    onLoad() {
      this.$emit('load')
    },

    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>

<style lang='less' scoped>
  .list {
    margin-top: 20px;
    height: 50px;
    background: #ddd;
    line-height: 50px;
    text-align: center;
    padding: 0;
  }
</style>