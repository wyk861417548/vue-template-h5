<template>
  <div>
    <!-- 头部年月日星期显示区域 -->
    <div class="calendar-header">
      <div class="year">{{currentYear}}年</div>
      <div class="date">{{currentMonthChinese}}</div>
    </div>

    <!-- 日历日期部分 -->
    <div v-show="!defalutShow">
        <!-- 左右切换月份 -->
      <div class="calendar-title">
        <!-- <div class="arrow arrow-year iconfont icon-shuangjiantouxia" @click="prev('year')" style="transform:rotate(-135deg) scale(.5);"></div> -->
        <div class="arrow-year iconfont icon-shuangjiantouxia mr-10" @click="prev('year')" ></div>
        <div class="arrow" @click="prev" style="transform:rotate(-135deg) scale(.5);"></div>
        <div class="date">{{currentYear}}年{{currentMonth + 1}}月</div>
        <div class="arrow" @click="next" style="transform:rotate(45deg) scale(.5);"></div>
        <div class="arrow-year iconfont icon-arrow-right-double ml-10" @click="next('year')"></div>
      </div>

      <!-- 日期展示区域 -->
      <div class="calendar-content">
        <div class="row title">
          <span v-for='(item,index) in title' :key='index'>{{item}}</span>
        </div>
        <div class="row content">
          <span class="gray" v-for='item in preDays' :key="'prev'+item"></span>
          <span :class="{active:currentIndex == item}" v-for='item in currentDays' :key="'cur'+item" @click="change(item)">{{item}}</span>
          <span class="gray" v-for='item in nextDays' :key="'next'+item"></span>
        </div>
      </div>
    </div>

    <!-- 时间展示区域 -->
    <div  class="calendar-date" v-show="defalutShow">
      <div class="calendar-date-column">
        <p v-for='item in hh' :key="'h'+item" :class="{active:item == time[0]}" @click="$set(time,0,item)">
          {{item}}
        </p>
      </div>

      <div class="calendar-date-column">
        <p v-for='item in min' :key="'min'+item" :class="{active:item-1 == time[1]}" @click="$set(time,1,item-1)">
          {{item-1}}
        </p>
      </div>
    </div>

    <!-- 底部 按钮区域 -->
    <div class="calendar-footer">
      <p v-if="type == 'datetime'">
        <span class="pt-10 pb-10" v-show="defalutShow" @click="defalutShow = false">选择日期</span>
        <span class="pt-10 pb-10" v-show="!defalutShow" @click="defalutShow = true">选择时间</span>
      </p>
      <p></p>
      <p class="action">
        <span @click="cancel">取消</span>
        <span @click="confirm">确定</span>
      </p>
    </div>
  </div>
</template>

<script>
	export default {
    // 是否显示时间
    props:['type'],
		data() {
			return {
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
      console.log("type",this.type);
    },

    computed:{
      // 月份 中文显示
      currentMonthChinese(){
        return new Date(this.currentYear,this.currentMonth,this.currentDay).toLocaleString('defalut',{month:'short',day:'2-digit',weekday:'short'});
      },

      // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
        // 计算当前月有多少天  月份加一  变成下个月   day设置0变成当前月的最后一天
      currentDays(){
        return new Date(this.currentYear,this.currentMonth+1,0).getDate();
      },

      //上个月占位 计算当前月一号是星期几   从而空出几个格子
      preDays(){
        return new Date(this.currentYear,this.currentMonth,1).getDay();
      },

      nextDays(){
        return 42 - this.currentDays - this.preDays;
      }
    },
		
		methods:{
      prev(name){
        if(name == 'year'){
          this.currentYear--;
        }else{
          if(this.currentMonth === 0){
            this.currentYear--;
            this.currentMonth = 11;
          }else{
            this.currentMonth--;
          }
        }
        
        this.handle();
      },

     

      next(name){
         if(name == 'year'){
          this.currentYear++;
        }else{
          if(this.currentMonth === 11){
            this.currentYear++;
            this.currentMonth = 0;
          }else{
            this.currentMonth++;
          }
        }
        
        this.handle();
      },

      // 为了解决选择了最后一天 切换时 其他月份日期自动选择最后一天
      handle(){
        if(this.currentDays < this.currentDay){
          this.currentDay = this.currentDays;
          this.currentIndex =  this.currentDays;
        }
      },

      // 选择日期
      change(item){
        this.currentIndex = item;
        this.currentDay = item;
      },

      cancel(){
        this.$emit("cancel")
      },

      // 确定选中日期  
      confirm(){
        let time = '';
        let selTime = this.time;

        let month = this.currentMonth+1;

        if(this.currentMonth+1 < 10){
          let curMon = this.currentMonth+1
          month = "0" + curMon;
        }
    
        let date = [this.currentYear,month,this.currentDay].join('-');

        if(this.type == 'datetime'){
          let hh = selTime[0]<10?'0'+selTime[0]:selTime[0];
          let mm = selTime[1]<10?'0'+selTime[1]:selTime[1];
         
          time =  hh+':'+mm;

          date = date + ' ' +time
        }

        this.$emit('confirm',date)
      }
		},
	}
</script>

<style scoped lang="scss">
  .arrow{display: inline-block; width: .2rem;height: .2rem;border-top: 2px solid #000;border-right: 2px solid #000;transform:rotate(45deg) scale(.5);}  
  
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
      .calendar-header{
        padding: .1rem .2rem;
        background: #029688;
        .year{
          color: #48beb0;
        }
        .date{
          font-size: .24rem;
          color: #fff;
        }
      }
      .calendar-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .3rem;
        padding:.2rem .1rem .1rem .1rem;
        background-color: #fff;
        font-size: .14rem;
        .date{
          text-align: center;
          flex: 1;
        }
        .arrow-year{
          color: #029688;
          font-size: .22rem;
          border-color: #029688;
        }
      }

      .calendar-content{
        background-color: #fff;
        padding:0 .15rem;
        .row{
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          &>span{
            position: relative;
            width: calc(100%/7);
            height: .5rem;
            line-height: .5rem;
          }
          &.title{
            color: #a9abaa;
          }
          &.content{
            span.active{
              border-radius: 50%;
              &::after{
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: .3rem;
                height: .3rem;
                opacity: .8;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                background: #029688;
              }
            }
	
            .gray{
              color: #a1a1aa;
            }
          }
        }
      }

      .calendar-date{
        display: flex;
        justify-content: space-around;
        height: 3rem;
        padding: .2rem 0;
        background-color: #fff;
        .calendar-date-column{
          overflow: auto;
          p{
            width: 40px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            &.active{
              color: #02958b;
              background: rgba(220,220,220,0.3);
            }
          }
        }
      }
      
      .calendar-footer{
        display: flex;
        justify-content:space-between;
        padding:0 .2rem;
        background-color: #fff;
        color: #02958b;
        text-align: right;
        line-height: .5rem;
        p.action span{
          margin-left: .2rem;
        }
      }
    }
	}
	
</style>
