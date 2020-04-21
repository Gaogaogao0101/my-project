<template>
    <div id="map">
        <router-link to="/life">
         <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
            <div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div> 
            <div class="top-right">{{lifename}}</div>
        </div>
        </router-link>
        <div class="map">
            {{arrive}}
        </div>
    </div>
</template>
<script>
var map,marker;
export default {
    data(){
        return{
           lifename:this.$route.params.name, 
            arriveCoor:[108.947025,34.2613255],//坐标点
            arrive:"",//位置信息
        }
    },
    mounted() {   
    mapDraw(this.arriveCoor),
    mapCoor(this.arriveCoor)
  },
  methods:{
     mapDraw(arriveCoor){
     map = new AMap.Map('map-location', {  //map-location是嵌地图div的id
       resizeEnable: true, //是否监控地图容器尺寸变化
       zoom:16, //初始化地图层级
       center: arriveCoor //初始化地图中心点
     });
     // 定位点
     this.addMarker(arriveCoor);
  },
  // 实例化点标记
  addMarker(arriveCoor) {
    var _this = this;
    marker = new AMap.Marker({
      icon: "", //图片ip
      imageSize: "20px",
      position: arriveCoor,
      offset: new AMap.Pixel(-13, -30),
      // 设置是否可以拖拽
      draggable: true,
      cursor: 'move',
      // 设置拖拽效果
      raiseOnDrag: true
    });
    marker.setMap(map);
  },
　 // 查询坐标
　 mapCoor(lnglatXY){
　　　　var _this = this;
　　　　AMap.service('AMap.Geocoder',function() {//回调函数
　　　　　　var geocoder = new AMap.Geocoder({});
　　　　　　geocoder.getAddress(lnglatXY, function (status, result) {
　　　　　　　　if (status === 'complete' && result.info === 'OK') {
　　　　　　　　　　//获得了有效的地址信息:
　　　　　　　　　　_this.arrive = result.regeocode.formattedAddress;
　　　　　　　　}else {
　　　　　　　　　　_this.arrive = "暂无位置";
　　　　　　　　}
　　　　　　});
　　　　})
}
　　},
}
</script>

<style scoped>
   @import '../../lib/css/top.css'; 
   #map{
       width: 100%;
       height: 100%;
       position: absolute;
       background: #fff;
   }
   .map{
       width: 96%;
       height: 10rem;
       margin:1rem auto;
       background: beige;
   }
</style>