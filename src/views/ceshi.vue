<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div >

    <header>
      <button @click="handler">点击我</button>

      <slot :user="info">
        jjj
      </slot>
    </header>

  </div>

</template>

<script>
export default {
  props:{
    xxx:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    },
    content:Object
  },
  data () {
    return {
      info:{
        name:"你大爷",

        age:"999"
      }
    };
  },

  created(){
    this.content.name = "xxx";
  },

  methods: {
    handler(){
      this.$emit("myEvent")
    }
  }
}
</script>
<style lang='scss' scoped>
  header{}

  main{}

  footer{}

</style>