<template>
  <div id="app" class="page-bg">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default{
  created(){
    window.addEventListener('beforeunload',this.beforeunloadFn);
  },

  methods:{
    beforeunloadFn(){
      alert(1)
      this.$store.commit('updateState');
    },

  }
}
</script>

<style lang="less">
@import url('~@/static/css/common.css');
</style>
