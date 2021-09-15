<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div>
    <!-- 设置一些自定义 -->
    <slot name="title" v-bind="{val:uploadList.length}"></slot>

    <div class="my-upload flex">
      <!-- 已上传图片展示区域 -->
      <div class="uploadList upBox" @click.stop="" v-for='(item,index) in uploadList' :key='index'>
        <slot name="container">
          <img :src="item.path" style="width:100%;height:100%;" alt="图片">
          <div class="mask j-full-curbox flex-align">
            <i type="ios-eye-outline" @click="handleView(item)">预</i>
            <i type="ios-trash-outline" @click="handleRemove(index)">删</i>
          </div>
        </slot>
      </div>

      <!-- 选择图片区域 -->
      <label v-if="max > uploadList.length" class="upload upBox">
        <i class="j-full-center">+</i>
        <input ref="inputer" type="file" accept="image/*" multiple style="display: none;" @change="change">
      </label>

      <!-- 预览图片区域 -->
      <div v-show="preview" @click="closeView" class="preview j-full-curbox ban-child">
        <div class="j-full-center">
          <img :src="previewImg" alt="图片">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {

  props:{
    // 最大上传数
    max:{
      type:Number,
      default:1
    },

    // 用于父组件接受已上传的图片名称
    name:{
      typeof:String,
      default:"upload"
    }
  },
  data () {
    return {

      // 预览图片
      preview:false,

      // 预览图片地址
      previewImg:'',

      // 已上传图片
      uploadList:[],
    };
  },

  created(){},

  methods: {
    // 上传图片
    change(){
      var inputDOM = this.$refs.inputer;

      var file = inputDOM.files;

      if(file.length < 1){
        this.$config.tip("请选择图片");
        return;
      }

      var param = new FormData();

      param.append('file', file[0]);


      if(['jpeg', 'jpg', 'png'].indexOf(file[0].type.split('/')[1]) == -1){
        // 每次选中结束后清空选中值  保证下次选中也能够触发change事件
        this.$refs.inputer.value = null;
        this.$config.tip("只支持jpeg','jpg','png格式图片");
        return;
      }

      this.upload(param);
    },


    // 上传图片
    upload(param){
      var config = {headers: {'Content-Type': 'multipart/form-data'}}

      this.$postmult(this.$api.common.file,param,false,config).then(res=>{
        this.$refs.inputer.value = null;
        this.uploadList.push(res.data);
      })
    },




    // 预览大图
    handleView(item){
      if(item && item.path){
        this.previewImg = item.path;
        this.preview = true;
      }
    },

    // 关闭大图
    closeView(){
      this.preview = false;
    },

    // 移除图片
    handleRemove(index){
      this.uploadList.splice(index,1)
    }
  },

  watch:{
    uploadList(newVal){
      var data = {
        name:this.name,
        value:newVal
      }
      this.$emit("change",data)
    }
  }
}
</script>
<style lang='scss' scoped>
  $bg-color-upload: rgba(0, 0, 0, 0.3);
  .my-upload{
    .upBox{
      position: relative;
      display:inline-block;
      width: .5rem;
      height: .5rem;
      margin:0 .1rem;
      border: 1px dashed #ddd;
      border-radius: .05rem;
    }

    .upload{
      position: relative;
      display:inline-block;
      width: .5rem;
      height: .5rem;
      margin:0 .1rem;
      border: 1px dashed #ddd;
      border-radius: .05rem;
      i{color: #ddd;}
      &:hover{
        border-color:#108ee9;
        i{color: #108ee9;}
      }
    }

    .uploadList{
      border: 1px solid $bg-color-upload;
      overflow: hidden;
      .mask{
        opacity: 0;
        i{
          flex:1;
          color: #000;
          text-align: center;
        }
        &:hover{
          opacity: 1;
          background: $bg-color-upload;
        }
      }
    }

    .preview{
      position:fixed;
      z-index: 999;
      background: $bg-color-upload;
    }
  }
  
</style>