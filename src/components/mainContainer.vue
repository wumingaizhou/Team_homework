<template>
  <div id="cesiumContainer" style="width: 100%; height: 100%;"></div>
</template>

<script type="module">
import imageBus from '@/utils/imageEvent';
export default{
  mounted(){
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGQ2OTY0OS05OWNiLTRmZDctYTcwNi1lYTY1NTVhODBhNDYiLCJpZCI6MjM5MTExLCJpYXQiOjE3MjU0NTU0ODZ9.JbglzGJ8dBc1tbZbb9GTKEuRlxyE6mXZKIWJ7E_diW4';
      const viewer = new Cesium.Viewer('cesiumContainer',{
        // 禁用以下控件
        animation: false,        // 时间轴控件
        timeline: false,         // 时间线控件
        fullscreenButton: false, // 全屏按钮
        homeButton: false,       // 主页按钮
        sceneModePicker: false,  // 场景模式选择器
        baseLayerPicker: false,  // 图层选择器
        geocoder: false,         // 地址搜索
        navigationHelpButton: false, // 导航帮助按钮
        infoBox: false,          // 信息框
        selectionIndicator: false // 选择指示器
      });
      viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(112.9, 28.2, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      }
    });

      // 获取Cesium Viewer的影像图层
      const imageLayers = viewer.imageryLayers;
      //console.log(imageLayers);
      // 移除Cesium默认加载的影像地图数据 (默认是Bing地图)
      //imageLayers.remove(imageLayers.get(0));

      //监听事件，监听影像更改事件
      imageBus.$on('changeBaseMap',(image)=>{
        console.log(image);
        imageLayers.removeAll();
        imageLayers.addImageryProvider(image);
      })
  }
}
</script>
<style scoped>

</style>