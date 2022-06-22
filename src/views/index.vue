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
    console.log(this.$config);
  },

  methods: {
    handleClick(){
      console.log('$config.scan',this.$config.scan());
    },

    // 上传图片测试
    changeUpload(){

    }
  }
}
</script>
<style lang='less' scoped>
  header{}

  main{}

  footer{}

</style>