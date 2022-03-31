<template>
  <div id="app" class="page-bg">
     <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="less">
  @import url('~@/static/css/common.css');
</style>
