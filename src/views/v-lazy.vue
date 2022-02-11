<template>
  <div class='j-full-curbox j-flex-col'>

    <main>
      <section v-for="(item,index) in imgList" :key="index">
        <img v-lazy="item.img" alt="" style="width:200px;height:200px;">
      </section>
    </main>

  </div>

</template>

<script>
export default {
  data () {
    return {
      imgList:[
        {name:"1",menuId:'1',img:require('@/static/images/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/static/images/nodata.png')},
      ]
    };
  },

  created(){},

  methods: {
  }
}
</script>
<style lang='scss' scoped>
  header{}

  main{}

  footer{}

</style>