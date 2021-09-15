<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class='picker' v-show="show" @touchmove.prevent>
    <div class="mask j-full-fixed" :style="csscontroll ? 'opacity: 1;' : 'opacity: 0;'"></div>
    <div class="contont j-full-fixed j-flex-col" style="z-index:666" :style="csscontroll?'transform: translateY(0);opacity: 1;' : 'transform: translateY(100%);opacity: 0;'">
      <!-- 点击阴影部分 -->
      <div style="flex:1;"  @click="hide = true"></div>

       
      <div class="slot">
        <!-- 头部确认 -->
        <slot name="header">
          <div class="header j-flex">
            <p @click="hide = true" style="color:#5A5B5C;">取消</p>
            <p>请选择</p>
            <p @click="confirm">确定</p>
          </div>
        </slot>
    
        <!-- 内容区 -->
        <slot name="container">
          <div class="region">
            <region-column :column="region" @change="changeProvince"></region-column>

            <region-column v-if="isHaveCity" :column="region[province].childs" @change="changeCity"></region-column>

            <region-column v-if="isHaveArea" :column="region[province].childs[city].childs" @change="changeArea"></region-column>
          </div>
          
        </slot>
      </div>
    </div>
  </div>

</template>

<script>
import city_code from "@common/json/city_code.json"
import regionColumn from "./region-column"
export default {
  components:{
    regionColumn
  },
  data () {
    return {
      show:false,

      // 控制css隐藏
      hide:false,

      // 控制css变量
      csscontroll:false,

      // 地区数据
      region:[],

      // 默认选中 
      // 省
      province:0,
      // 市
      city:0,
      // 区
      area:0
    };
  },

  created(){
    this.region = city_code;
    console.log("this.region",this.region);
  },

  computed:{
    isHaveCity(){
      if(this.region[this.province].childs){
        return true;
      }
      return false;
    },

    isHaveArea(){
      console.log("isHaveArea",this.province,this.city,this.area);
      if(this.region[this.province].childs && this.region[this.province].childs[this.city].childs){
        return true;
      }
      return false;
    }
  },

  methods: {
    //子组件监听 省份变更  关联的市 / 县 变更
    changeProvince(value){
      this.province = value;
      this.city = 0;
      this.area = 0;
    },

    //子组件监听 市区变更 关联的 县 变更
    changeCity(value){
      this.city = value;
      this.area = 0;
    }, 
    
    //子组件监听 县区变更
    changeArea(value){
      this.area = value;
    },


    // 确认
    confirm(){
      let common = this.region[this.province];
      // 省
      let province = common.value;
      // 市

      let city = this.isHaveCity?common.childs[this.city].value:'';
      // 区
      let area = this.isHaveArea?common.childs[this.city].childs[this.area].value:'';

      var r = [province,city,area].filter(function (s) {
        return s && s.trim();
      });
      console.log("queren",r);

      this.$emit("confirm",r.join('/'));

      this.hide = true;
    }
  },

  watch:{
    show(newV,oldV){
      if(newV){
        setTimeout(()=>{
          this.csscontroll = true;
        },100);
        
        setTimeout(()=>{
          this.hide = false;
        },600);
      }
    },
    
    hide(newV,oldV){
      if(newV){
        setTimeout(()=>{
          this.csscontroll = false;
        },100)
        
        setTimeout(()=>{
          this.show = false;
        },600);
      }
    }
  },
}
</script>
<style lang='scss' scoped>
  .picker{
    .mask{
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;	
      transition: all .6s ease-in-out;	
    }
    .contont{
      justify-content: space-between;
      transform: translateY(100%);
      transition: all .5s linear;
      .slot{
        background: #fff;
        .header{
          padding:.1rem .2rem;
          border-bottom:1px solid rgba(200,200,200, .2);
        }
      }
    }
  }

  .region{
    display: flex;
    justify-content: space-around;
    height: 3rem;
    padding: .2rem 0;
    overflow: hidden;
  }
</style>