<template>
  <div id="qrCode" ref="qrCodeDiv" ></div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  props:["code"],

  data () {
    return {
      qrcode:"",

      text:"https://www.baidu.com"
    };
  },

  mounted(){
    this.setCode();
  },


  methods: {
    setCode(){
      this.qrcode = new QRCode(this.$refs.qrCodeDiv, {
        text: this.text,
        width:200,
        height:200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    }
  },

  watch:{
    code(newVal){
      this.text = newVal;
      this.qrcode.makeCode(newVal);
    }
  }
}
</script>

<style scoped>
  /* 注意这里别写lang='scss'或者其他  不然>>>不生效 */
  #qrCode >>> canvas{
    width: 100% !important;
    height: 100% !important;
  }
  #qrCode >>> img{
    width: 100% !important;
    height: 100% !important;
  }
</style>