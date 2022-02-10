<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class='j-full-curbox j-flex-col'>

    <header></header>

    <main class="j-full-center">
      <p>你</p>
    </main>
    
    <footer></footer>

  </div>

</template>

<script>
export default {
  data () {
    return {};
  },

  created(){},

  methods: {
  }
}
</script>
<style lang='scss' scoped>
  header{}

  main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: #f33;
  }

  footer{}

</style>