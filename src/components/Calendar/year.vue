<template>
  <div>
    <!-- 头部年月日星期显示区域 -->
    <div class="calendar-header j-flex">
      
      <!-- <div class="arrow arrow-year iconfont icon-shuangjiantouxia" @click="prev('year')" style="transform:rotate(-135deg) scale(.5);"></div> -->
      <div class="arrow-year iconfont icon-shuangjiantouxia mr-10" @click="prev('year')" ></div>
        <div class="date">{{currentYear}}</div>
      <div class="arrow-year iconfont icon-arrow-right-double ml-10" @click="next('year')"></div>
    </div>



    <!--月份展示区域 -->
    <div class="calendar-content">
      <div class="row content">
        <span :class="{active:currentIndex == currentYear + item-2}" v-for='item in 10' :key="'cur'+item" @click="change(currentYear + item-2)">{{currentYear + item-2}}</span>
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
        currentIndex:new Date().getFullYear(),

        currentYear:new Date().getFullYear(),

			};
		},

    created(){
      console.log("type",this.type);
    },

		methods:{
      prev(){
        this.currentYear -=10;
      },

      next(){
        this.currentYear+=10;
      },

      // 选择日期
      change(item){
        this.currentIndex = item;
      },

      cancel(){
        this.$emit("cancel")
      },

      // 确定选中日期  
      confirm(){
        let date = this.currentIndex
        this.$emit('confirm',date)
      }
		},
	}
</script>

<style scoped lang="scss">
  .arrow{display: inline-block; width: .2rem;height: .2rem;border-top: 2px solid #000;border-right: 2px solid #000;transform:rotate(45deg) scale(.5);}  
  
  .calendar{
    .calendar-box{
      .calendar-header{
        padding: .1rem .2rem;
        background: #029688;
        .arrow-year{
          padding: .05rem;
          color: #ddd;
        }
        .date{
          font-size: .24rem;
          color: #fff;
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
            width: calc(100%/3);
            height: .5rem;
            line-height: .5rem;
          }
          &.title{
            color: #a9abaa;
          }
          &.content{
            padding: .1rem;
            span.active{
              &::after{
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: .5rem;
                height: .35rem;
                opacity: .8;
                border-radius: .03rem;
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

      
      .calendar-footer{
        display: flex;
        justify-content:space-between;
        padding:0 .2rem;
        background-color: #fff;
        color: #02958b;
        text-align: right;
        padding-bottom: .1rem;
        p.action span{
          padding: .1rem .05rem;
          margin-left: .2rem;
        }
      }
    }
	}
	
</style>

