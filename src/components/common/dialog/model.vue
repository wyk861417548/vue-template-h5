<template>
	<div class="modal" v-show="show">
		<div class="j-full-curbox mask" :style="scale?(csscontroll?'opacity: 1;' : 'opacity: 0;'):''"></div>
		<div class="j-full-center content"   :class="[scale?(csscontroll?'content-normal':'content-scale'):'']">
			<slot name="container">
				<button class="el-button" @click="hide = true">关闭</button>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 遮罩是否显示
				show:false,

        // 是否开启缩放动画
        scale:false,

				// 控制css变量
				csscontroll:false,
	
				// 控制css隐藏
				hide:false
			};
		},
		
		methods:{
			close(){
				this.hide = false;
			},
			
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

<style scoped lang="scss">
	.modal{
		min-width: 60vw;
    background: #ff6700;
		.mask{
			transition: all .3s ease-in-out;
			background: rgba(0, 0, 0, 0.3);
			z-index: 680;
		}
		.content{
			transition: all .3s ease-in-out;
			background-color: #fff;
			overflow: hidden;
			width:80%;
			border-radius:10rpx;
			z-index: 680;
		}
		.content-scale{
			transform:translate(-50%,-50%) scale(0);
		}
		.content-normal{
			transform:translate(-50%,-50%) scale(1);
		}
		
	}
	
</style>
