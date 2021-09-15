<template>
  <div class="slider" ref="slider">
    <div class="progress" ref="progress" :style="{width:touch.percent+'%'}"></div>
    <div class="progressBtn" ref="progressBtn"  :style="{left:touch.percent+'%'}" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove"></div>
  </div>
</template>

<script>
export default {
  props:['name',"status"],
  data(){
    return{
      sliderVal:{// 传给父组件的值
        name:this.name.name,
        value:'',
        id:this.name.id
      },
      //默认滑块位置 设置默认百分比
      touch:{left:15,percent:this.name.percentage?this.name.percentage:"0"}
    }
  },
  mounted(){
    this.status!=1?this.$refs.progress.style.backgroundColor = "#999":"";
    this._triggerPercent();
  },
  methods:{
    //开始触碰小圆点
    progressTouchStart(e) {
      this.touch.initiated = true;
      // this.touch.left  偏移量
      if(this.touch.left > 0){
        this.touch.startX = e.touches[0].pageX - this.touch.left;  //记录当前点击位置
        return;
      }
      this.touch.startX = e.touches[0].pageX;

    },
    //移动小圆点
    progressTouchMove(e) {
      if (!this.touch.initiated) {return;}
      //差值
      var delateX = e.touches[0].pageX - this.touch.startX;
      //进度条不能小于0 最大不能超过进度条的整个宽度
      var offsetWidth = Math.min(this.$refs.slider.clientWidth,Math.max(0,delateX))
      this._offset(offsetWidth);
      this._triggerPercent();
    },
    // 计算百分比
    _triggerPercent() {
      this.sliderVal.value = Math.round((this.$refs.progress.clientWidth / this.$refs.slider.clientWidth).toFixed(3)*100);
      //mounted初始化设置百分比  在此把left设置对应的值
      this.touch.left  = this.$refs.progress.clientWidth;
      this.$emit("getpercent", this.sliderVal);
    },
    // 设置进度和小圆点的位置
    _offset(offsetWidth){
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style.left =  `${offsetWidth}px`;
    }
  }
}
</script>

<style scoped lang="scss">
  .slider{
    position: relative;
    width: 60%;
    height: .12rem;
    border-radius: .03rem;
    background: #d9d9d9;
    
  }
  .progress{
    height: .12rem;
    border-radius: .03rem;
    background: #409eff;
  }
  .progressBtn{
    position:absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%,-50%);
    display: inline-block;
    width: .16rem;
    height: .16rem;
    padding:.05rem;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    border-radius: 50%;
  }

  .el-none{
    pointer-events: none;
    color: #000 !important;
    border:none !important;
    background: #d9d9d9 !important;
  }

  .section::after{
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
  }
</style>