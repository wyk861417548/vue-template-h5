<template>
  <div class="swiper">
    <ul>
      <li class="swiper-slide">1</li>
      <li class="swiper-slide">2</li>
      <li class="swiper-slide">3</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  created(){},


  methods: {
    get(){}
  }
}
</script>
<style lang='scss' scoped>
  .swiper{
    width: 300px;
    height: 200px;
    background: #108ee9;
    margin: 50px auto;
    // overflow: hidden;
    .swiper-slide{
      width: 100%;
      height: 100%;
      background: #ff6700;
      float: left;
    }
    .swiper-slide-active{

    }
  }

</style>