<template>
	<div class="calendar" v-show="show">
    <div class="calendar-box" >
      <date  :type='type' v-if="calType.indexOf(type) == -1" @cancel="cancel" @confirm="confirm"></date>
      <month :type='type' v-if="type=='month'" @cancel="cancel" @confirm="confirm"></month>
      <year :type='type' v-if="type=='year'" @cancel="cancel" @confirm="confirm"></year>
      <datenone :type='type' v-if="type=='datenone'" @cancel="cancel" @confirm="confirm"></datenone>
    </div>
  </div>
</template>

<script>
  import date from "./date.vue";
  import month from "./month.vue";
  import year from "./year.vue";
  import datenone from "./datenone.vue";
	export default {
    components:{
      date,
      month,
      year,
      datenone
    },
    // 是否显示时间
    props:['type'],
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

    created(){
      // console.log("created",this.type);
    },

    computed:{
     
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
      }
		},
	}
</script>

<style scoped lang="less">
  
  .calendar{
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
   
    .calendar-box{
      width: 80%;
      margin: auto;
      border-radius: .02rem;
      overflow: hidden;
    }
	}
	
</style>
