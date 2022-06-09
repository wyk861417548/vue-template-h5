<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class="j-full-curbox">
    <Scroll ref="scroll" @load="onLoad">
      <p class="list" v-for="item in list" :key="item" :title="item" @click="$skip" data-url="/BScrollDetail">{{item}}</p>
    </Scroll>
  </div>

</template>

<script>
import keepAlive from '@/mixins/keepAlive.js'
export default {
  mixins:[keepAlive],
  data(){
    return{
      list: [],
    }
  },
  activated(){
    // 如果不是从详情页进入
    if(!this.$route.meta.isBack){
      // 加载状态结束
      this.$refs.scroll.refreshing= true;
      this.$refs.scroll.onRefresh();
    }

    this.$route.meta.isBack = false;
  },

  methods:{
    async onLoad(){
      // 下拉刷新
      if (this.$refs.scroll.refreshing) {
        this.list = [];
        this.$refs.scroll.refreshing = false;
      }
    },


    getData(){
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }

        this.isScroll(this.list,80);
      }, 1000)
      
    },


    isScroll(list,total){
      // 加载状态结束
      this.$refs.scroll.loading = false;

      // 数据全部加载完成
      if (list.length >= total) {
        this.$refs.scroll.finished = true;
      }
    }
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