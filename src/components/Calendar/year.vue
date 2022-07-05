<template>
  <div class="calendar-month">
    <!-- 头部年月日星期显示区域 -->
    <div class="header j-flex">
      <van-icon class="iconfont" name="arrow-left" @click="prev('year')" />
      <div class="year">{{currentYear}}</div>
      <van-icon class="iconfont" name="arrow" @click="next('year')" />
    </div>

    <!--月份展示区域 -->
    <div class="content">
      <span :class="{active:currentIndex == item}" v-for='item in 12' :key="'cur'+item" @click="change(item)">{{item}}月</span>
    </div>

    <!-- 底部 按钮区域 -->
    <div class="footer">
      <p v-if="type == 'datetime'">
        <span class="pt-10 pb-10" v-show="defalutShow" @click="defalutShow = false">选择日期</span>
        <span class="pt-10 pb-10" v-show="!defalutShow" @click="defalutShow = true">选择时间</span>
      </p>
      <p></p>
      <p class="action">
        <span @click="$emit('cancel')">取消</span>
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
				// 是否显示日期组件
				show:true,

        // 当前选择时期还是时间 
        defalutShow:false,

        // 当前所选日期
        currentIndex:new Date().getMonth()+1,

        currentYear:new Date().getFullYear(),

        currentMonth:new Date().getMonth(),
        
        currentDay:new Date().getDate(),

			};
		},

		methods:{
      prev(){
        this.currentYear--;
      },

      next(){
        this.currentYear++;
      },


      // 选择日期
      change(item){
        this.currentIndex = item;
      },

      // 确定选中日期  
      confirm(){
        let month = this.currentIndex;

        if(month < 10){
          month = "0" + month;
        }
        let date = [this.currentYear,month].join('-');
        this.$emit('confirm',date)
      }
		},
	}
</script>

<style scoped lang="less">
  .calendar-month{
    .header{
      padding: 10px 20px;
      background: #029688;
      .year{
        font-size: 24px;
        color: #fff;
      }
      .iconfont{
        color: #ddd;
        font-size: 20px;
      }
    }
    .content{
      background-color: #fff;
      padding:0 15px;
      border-bottom:1px solid rgba(200, 200, 200, .1);
      span{
        position: relative;
        display: inline-block;
        position: relative;
        width: calc(100%/3);
        height: 50px;
        text-align: center;
        line-height: 50px;
        z-index: 10;
        &.active{
          &::after{
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 40px;
            height: 35px;
            opacity: .8;
            z-index: 9;
            border-radius: 5px;
            transform: translate(-50%, -50%);
            background: #029688;
          }
        }
      }
    }
    .footer{
      display: flex;
      justify-content:space-between;
      padding:10px 20px;
      background-color: #fff;
      color: #02958b;
      text-align: right;
      padding-bottom: 10px;
      p.action span{
        padding: 10px 5px;
        margin-left: 20px;
      }
    }
  }

	
</style>
