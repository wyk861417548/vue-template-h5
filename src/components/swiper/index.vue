<template>
  <swiper
    class="swiper-container"
    :options="swiperOption"
    ref="mySwiper"
    @click-slide="handleClickSlide"
    @mouseenter.native="on_bot_enter" 
    @mouseleave.native="on_bot_leave"
  >
    <slot>
      <swiper-slide>
        <div style="height: 100px">I'm Slide 1</div>
      </swiper-slide>
      <swiper-slide>
        <div style="height: 100px">I'm Slide 2</div>
      </swiper-slide>
      <swiper-slide>
        <div style="height: 100px">I'm Slide 3</div>
      </swiper-slide>
    </slot>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  props: ["option"],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        // loop: true,

        // 自动播放
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },

        //初始化显示
        initialSlide: 0,

        // 设定为true时，active slide会居中，而不是默认状态下的居左。
        // centeredSlides: true,

        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 1,

        // 显示分页小圆点
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true //允许分页点击跳转
        // },

        // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        // on: {
        //   slideChangeTransitionEnd: ()=> { //切换结束时，告诉我现在是第几个slide
        //     if(!this.swiper)return;
        //     this.$emit("change",this.swiper.activeIndex)
        //   },
        // },
      },
    };
  },
  created() {
    this.merge(this.option);
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    handleClickSlide(index) {
      console.log("clie", index);
    },

    //通过获得的swiper对象来暂停自动播放
    on_bot_enter() {
      this.swiper.autoplay.stop()
    },
    on_bot_leave() {
      this.swiper.autoplay.start()
    },

    merge(option) {
      if (option) {
        for (const key in option) {
          this.swiperOption[key] = option[key];
        }
      }
      return this.swiperOption;
    },
  },

  mounted() {},
  watch: {
    option: {
      handler(newVal) {
        for (const key in newVal) {
          this.swiperOption[key] = newVal[key];
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
.swiper-slide {
  /* height: auto; */
  /*font-size: 16px;*/
  transition: all 0.3s;
  /* transform: scale(0.5) */
}
.swiper-slide-active {
  /* z-index: 999 !important; */
  /* transform: scale(1) */
}
/* 小圆球 */
.swiper-pagination-bullet-active {
  background: #24f1b6 !important;
}
</style>