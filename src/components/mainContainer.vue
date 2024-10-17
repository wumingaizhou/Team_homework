<template>
  <div id="cesiumContainer" style="width: 100%; height: 100%;"></div>
</template>

<script type="module">
import imageBus from '@/utils/imageEvent';
export default {
  async mounted() {
    // 设置 Cesium Ion Token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGQ2OTY0OS05OWNiLTRmZDctYTcwNi1lYTY1NTVhODBhNDYiLCJpZCI6MjM5MTExLCJpYXQiOjE3MjU0NTU0ODZ9.JbglzGJ8dBc1tbZbb9GTKEuRlxyE6mXZKIWJ7E_diW4';
    // 初始化 Cesium Viewer
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,           // 时间轴控件
      timeline: false,            // 时间线控件
      fullscreenButton: true,     // 全屏按钮
      homeButton: false,          // 主页按钮
      sceneModePicker: false,     // 场景模式选择器
      baseLayerPicker: false,     // 图层选择器
      geocoder: false,            // 地址搜索
      navigationHelpButton: false,// 导航帮助按钮
      infoBox: false,             // 信息框
      selectionIndicator: false,  // 选择指示器
      terrainProvider: new Cesium.EllipsoidTerrainProvider()// 默认不开启 3D 地形
    });
    // 获取 Cesium Viewer 的影像图层
    this.imageLayers = this.viewer.imageryLayers;

    // 添加一个实体并加载 gltf 模型
    const entity = this.viewer.entities.add({
      name: '3D Model with Multiple Materials',
      position: Cesium.Cartesian3.fromDegrees(112.94572462738567, 28.187290962027645, 40), // 模型的经纬度和高度
      model: {
        uri: '/3Dmodels/3dtest.gltf',  // 模型文件路径
        scale: 1.0,
        minimumPixelSize: 128,
        maximumScale: 20000
      }
    });
    // 将视角聚焦到实体
    this.viewer.zoomTo(entity);

    // 监听事件
    imageBus.$on('changeBaseMap', this.changeMap);
    imageBus.$on('toggle-terrain', this.toggleTerrain);
  },
  beforeDestroy() {
    // 移除事件监听器
    imageBus.$off('changeBaseMap', this.changeMap);
    imageBus.$off('toggle-terrain', this.toggleTerrain);
  },
  methods: {
    // 切换地形
    async toggleTerrain(value) {
      if (value) {
        this.viewer.terrainProvider = await Cesium.createWorldTerrainAsync(); // 启用 3D 地形
        this.$message({
          message: '已切换到 3D 地形',
          type: 'success'
        });
      } else {
        this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider(); // 使用平滑的椭球模型
        this.$message({
          message: '已切换到 2D 地形',
          type: 'success'
        });
      }
    },
    // 更改底图
    changeMap(image) {
      this.imageLayers.removeAll();
      this.imageLayers.addImageryProvider(image);
    }
  }
}
</script>

<style scoped>
</style>
