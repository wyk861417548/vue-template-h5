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
        // {name:"我的报告单",menuId:'30',img:'@/static/images/big.jpg'},
        {name:"预约挂号",menuId:'1',img:require('@/static/images/big.jpg')},
        {name:"挂号记录",menuId:'5',img:'https://img.cdn.vihost.cn/vue_cli/hospital/registerList.png'},
        {name:"缴费记录",menuId:'4',img:'https://img.cdn.vihost.cn/vue_cli/hospital/paymentList.png'},
        {name:"就诊人管理",menuId:'13',img:'https://img.cdn.vihost.cn/vue_cli/hospital/user.png'},
        {name:"慢病管理",menuId:'10004',img:'https://img.cdn.vihost.cn/vue_cli/hospital/illness.png'},
        {name:"健康指数",menuId:'10008',img:'https://img.cdn.vihost.cn/vue_cli/hospital/health02.png'},
        {name:"商保快赔",menuId:'10013',img:require('@/static/images/big.jpg')},
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