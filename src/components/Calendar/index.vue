<template>
	<div class="calendar" v-show="show">
    <div class="calendar-box">
      <components :is='type' @cancel="cancel" @confirm="confirm"></components>
    </div>
  </div>
</template>

<script>
  import date from "./date.vue";
  import month from "./month.vue";
  import year from "./year.vue";
  import datatime from "./datatime.vue";
	export default {
    props:{
      type:{
        type:String,
        default:'year'
      }
    },
    components:{
      date,
      month,
      year,
      datatime
    },
		data() {
			return {
				// 是否显示日期组件
				show:false,

        calType:['month','year','datenone'],

        // 当前选择时期还是时间 
        defalutShow:false,

        // 当前所选日期
        currentIndex:new Date().getDate(),

        // 周
        title:["日", "一", "二", "三", "四", "五", "六"],

        currentYear:new Date().getFullYear(),

        currentMonth:new Date().getMonth(),
        
        currentDay:new Date().getDate(),


        hh:24,

        min:60,

        time:[8,0]

			};
		},
		
		methods:{
      // 取消
      cancel(){
        this.show =false;
      },

      // 確定
      confirm(date){
        this.show =false;
        this.$emit('confirm',date)
      },

      stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      },
      /***取消滑动限制***/
      move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
		},

    watch:{
      show:{
        handler(newVal){
          if(newVal){
            this.stop();
          }else{
            this.move();
          }
        }
      }
    }
	}
</script>

<style scoped lang="less">
  .calendar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    -webkit-transform:translateZ(0);
    .calendar-box{
      width: 80%;
      margin: auto;
      border-radius: 2px;
      overflow: hidden;
    }
	}
	
</style>
