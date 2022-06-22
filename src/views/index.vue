<template>
  <div >
    <!-- class="j-full-curbox" -->
      <section class="box">
        <h2 class="box-title">测试上传图片压缩</h2>
        <upload path='fullUrl' :max='3' @change="changeUpload"></upload>
      </section>

      <section class="box">
        <h2 class="box-title">测试浙里办扫一扫</h2>
        <button class="el-button el-button-primary" @click="handleClick">扫一扫</button>
      </section>

      <section class="box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip" data-url='/BScroll'>BScroll</button>
      </section>

      <section class="box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip" data-url='/vant-scroll'>vant-scroll</button>
      </section>

      <section class="box">
        <h2 class="box-title">测试刷新页面vuex数据是否还是存在</h2>
        <p class="mb-5">vuex:{{$store.state.token}}</p>
        <button class="el-button el-button-primary" @click="reload">reload</button>
      </section>



  </div>

</template>

<script>
import upload from '@/components/upload/index.vue'
export default {
  components:{
    upload
  },

  data () {
    return {};
  },

  created(){
    console.log('--------------',this.$store.state.token);
  },

  methods: {
    handleClick(){
      console.log('$config.scan',this.$config.scan());
    },

    // 上传图片测试
    changeUpload(){

    },

    // 重新加载页面
    reload(){
      window.location.reload();
    }
  }
}
</script>
<style lang='less' scoped>
  header{}

  main{}

  footer{}

</style>