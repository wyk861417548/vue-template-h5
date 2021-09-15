<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div  :style="style" @touchstart="touchStart" @touchmove.prevent="touchMove"  @touchend="touchEnd">
    <slot></slot>
  </div>


</template>

<script>
const a = -0.1; // 加速度
export default {
  props:["duration"],
  data () {
    return {
      style: {
        transform: 'translate3d(0px,0px,0px)',
        transition: 'transform .3s',
      },

      startX: 0, // 触碰开始距离

      endX: 0, // 触碰结束距离

      prevX: 0, // 上一次移动的距离

      distance:0,
    };
  },

  created(){
  },


  methods: {
    // 触碰开始
    touchStart(e) {
      // 保存触碰开始的位置
      this.startX = e.touches[0].pageX;
    },
    // 触碰移动
    touchMove(e) {
      // 保存当前移动的位置
      let moveX = e.changedTouches[0].pageX;
        
      // 保存当前移动的方向，往下拉的话，moveX - this.startX为正，往上拉的话为负
      this.distance = this.prevX + moveX - this.startX;

      //设置拖拽移动
      this.set(this.distance)
      
    },

    // 触碰结束
    touchEnd(e) {
      
      // 保存结束位置
      this.endX = e.changedTouches[0].pageX;
     
      this.getInertiaDistance();
      
    },

    // 设置位移
    set(x) {
      this.style.transform = `translate3d(${x}px,0,0)`
    },

    getInertiaDistance(){
      // 移动距离
      let s =this.endX - this.startX;

      if(Math.abs(s) < 1){
        return;
      }

      let st = s>0?0:-(this.duration*1);
      
      // 设置上次位置
      this.prevX = st*1;

      this.set(st);
      // this.inertia(absV, Math.floor(absV / v), 0);
    },

    
   

    /**
     * 用户结束滑动，应该慢慢放慢，最终停止。从而需要 a(加速度)
     * @param start 开始速度
     * @param position 速度方向，值: 正负1
     * @param target 结束速度
     */
    inertia(start, position, target){
      // 这段时间走的位移 S = vt + 1/2at^2;
      const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.distance;

      // 根据求末速度公式： v末 = v初 + at
      const newStart = (position * start) + (a * (1000 / 60));

      // 设置拖拽移动
      this.set();
    },  

    
  },


}
</script>
<style lang='scss' scoped>
  .region-column{
    width:30%;
    overflow: hidden;
    .list{
      padding-top: 100px;
      p{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 56px;
        text-align: center;
        color: #a1a1a1;
        &.active{
          color: #02958b;
        }
      }
    }
    
  }
</style>