<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class="j-full-curbox" id="map" ref="map"></div>
</template>

<script>
export default {
  props:['name'],
  data () {
    return {
      namexx:'jdoiawjd(dawdwa)',
      map:null,
    };
  },

  created(){
  },

  mounted(){
    this.init();
  },

  methods: {
    init(){
      // 创建地图实例
      this.map = new AMap.Map('map', {
        zoom: 17,
        resizeEnable: true
      });
      
      this.geoCode()

    },
    
    // 根据名称获取地理位置
    geoCode() {
      let geocoder =  new AMap.Geocoder();
      geocoder.getLocation(this.name, (status, result)=>{

        if (status === 'complete'&&result.geocodes.length) {
          var lnglat = result.geocodes[0].location
          
          this.setMarker(lnglat);
          
        }else{
          console.log('根据地址查询位置失败');
        }
      });
    },

    // 设置标注
    setMarker(lnglat){
      let marker = new AMap.Marker({
        position:lnglat,
      });
     
      marker.setLabel({
        content: `<div class='info'><span class="iconfont icon-address colec6 mr-5"></span>${this.name.split('（')[0]}</div>`, //设置文本标注内容
        offset: new AMap.Pixel(-20, 40),
        direction: 'right' //设置文本标注方位
      });
      this.map.add(marker);
      this.map.setFitView(marker);
    }
  }
}
</script>

// 注意一定不要加scoped 不然会导致设置label样式设置无效
<style lang='scss'>
  .amap-marker-label{
    border: 0;
    background-color: transparent;
    .info{
      position: relative;
      left: 0%;
      top: 0;
      padding:.15rem .2rem;
      font-size: .18rem;
      font-weight: bold;
      border-radius: .05rem;
      transform: translate(-50%,-100%);
      background: rgba(255,255,255,.8);
      box-shadow: 0 0 5px rgba(0,0,0,.2);
    }
  }
</style>
