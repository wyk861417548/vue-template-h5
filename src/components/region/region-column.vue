<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class="region-column">
    <!-- 时间展示区域 -->
    <div class="list_ column" ref="list" :style="style" @touchstart="touchStart" @touchmove.prevent="touchMove"  @touchend="touchEnd">
      <p v-for='(item,index) in dataList' :key="'province'+index" :class="{active:index == activeIndex}" >
        <span :style="{opacity:index == activeIndex?1:'.8'}">{{item.value}}</span>
      </p>
    </div>
  </div>

</template>

<script>
const a = -0.003; // 加速度
export default {
  props:['column'],
  data () {
    return {
      style: {
        transform: 'translate3d(0px,0px,0px)',
        transition: 'transform .2s',
      },
      dataList:[],
      // 当前所选中
      activeIndex:0,

      // 元素位置
      offsetTop:0,
      
      startTime:0,

      startY: 0, // 触碰开始距离

      moveTime:0, //移动时间

      endY: 0, // 触碰结束距离

      endTime: 0,  // 结束时间

      prevY: 0, // 上一次移动的距离

      distance:0,

      lineHeight:56, // 每一个选项的高度
      
    };
  },

  created(){
    this.dataList = this.column;
  },


  methods: {
    // 触碰开始
    touchStart(e) {
      // 保存触碰开始的位置
      this.startY = e.touches[0].pageY;

      this.startTime = e.timeStamp;
    },
    // 触碰移动
    touchMove(e) {
      this.moveTime = e.timeStamp;

      // 保存当前移动的位置
      let moveY = e.changedTouches[0].pageY;
      // 保存当前移动的方向，往下拉的话，moveY - this.startY为正，往上拉的话为负
      this.distance = this.prevY + moveY - this.startY;

      console.log("this.dis",this.distance);
      // 设置拖拽移动
      this.set(this.distance)
      
    },

    // 触碰结束
    touchEnd(e) {
      // 当前元素偏移位置
      console.log("e",e,e.target.offsetTop);
      this.offsetTop = e.target.offsetTop;

      // // 保存结束位置
      this.endY = e.changedTouches[0].pageY;
     
      // // 保存上一次移动的距离
      // this.prevY = this.style.transform.split(',')[1].slice(0, -2) * 1;
      
      // 保存结束时间
      this.endTime = e.timeStamp;
      // 执行判断并赋值索引
  
      // this.set(-this.activeIndex * this.lineHeight)
      this.getInertiaDistance();
      
    },


   

    // 设置位移
    set(y) {
      this.style.transform = `translate3d(0,${y}px,0)`
    },

    getInertiaDistance(){
      // 移动距离
      let s = this.startY - this.endY;

      // 当移动距离特别小判断为点击事件
      if(Math.abs(s)  <= 1){
        var u = navigator.userAgent;
        var isAndroid  = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ;

        // 如果是安卓  点击事件生效
        if(isAndroid){
          this.handler();
        }
        return;
      }

      // 移动时间
      const t = this.endTime - this.startTime;
      console.log("res-------------s",s);
      // 移动速度
      const v = s / t;
      const absV = Math.abs(v);

      console.log("v-----------",v,Math.floor(absV / v));

      this.inertia(absV, Math.floor(absV / v), 0);
    },
    
    // 点击事件
    handler(){
      // 计算当前移动到的位置索引
      let activeIndex = Math.round((this.offsetTop - this.lineHeight * 2) / this.lineHeight);

      console.log("activce",activeIndex);

      // 对activeIndex值进行进一步处理，保证其不会超出选项范围
      this.activeIndex = activeIndex < 0 ? 0 : activeIndex > this.dataList.length - 1 ? this.dataList.length - 1 : activeIndex;

      this.prevY = -this.activeIndex * this.lineHeight;

      this.set(-this.activeIndex * this.lineHeight);
      
      this.$emit("change",this.activeIndex);
    },

    /**
     * 用户结束滑动，应该慢慢放慢，最终停止。从而需要 a(加速度)
     * @param start 开始速度
     * @param position 速度方向，值: 正负1
     * @param target 结束速度
     */
    inertia(start, position, target){
      // 这段时间走的位移 S = vt + 1/2at^2;
      // const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.distance;
      const move = this.distance;
      console.log("move",move);

      // 根据求末速度公式： v末 = v初 + at
      const newStart = (position * start) + (a * (1000 / 60));

      this.activeIndex = -Math.round(move / (this.lineHeight));

      this.activeIndex = this.activeIndex < 0 ? 0 : this.activeIndex > this.dataList.length - 1 ? this.dataList.length - 1 : this.activeIndex;
      
      // 设置上次位移距离
      this.prevY = -this.activeIndex * this.lineHeight;

      // 设置拖拽移动
      this.set(-this.activeIndex * this.lineHeight);

      this.$emit("change",this.activeIndex)
    },  

    
  },
  watch:{
    column:{
      handler(newVal){
        this.dataList = newVal;
        this.activeIndex = 0;
        this.style.transform = `translate3d(0px,0px,0px)`;
        this.style.transition = 'transform .5s';
      },
      deep: true
    }
  }


}
</script>
<style lang='scss' scoped>
  .region-column{
    .list_{
      padding: 0;
    }
    width:31%;
    overflow: hidden;
    .column{
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