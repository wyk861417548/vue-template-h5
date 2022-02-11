<template>
  <div id="app">
     <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss">
  @import url('~@/static/css/common.css');
</style>
