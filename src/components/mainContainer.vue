<template>
  <div v-loading="loading" id="cesiumContainer" style="width: 100%; height: 100%;">
    <div class="weather-tools" v-show="weatherTool">
      <el-select
        v-model="weatherVal"
        placeholder="请选择天气"
        @change="weatherChange">
        <el-option
          v-for="item in weatherOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="mini" @click="weatherClose" class="close-btn">关闭</el-button>
    </div>
  </div>
</template>

<script type="module">
import imageBus from '@/utils/imageEvent'; // 用于与其他组件通信
import eventAsideMain from '@/utils/eventAsideMain'; // 另一个事件总线，用于场景和实体切换
import WeatherRain from "../../public/Cesium/CesiumWeather/WeatherRain"; // 导入雨效果
import WeatherSnow from "../../public/Cesium/CesiumWeather/WeatherSnow"; // 导入雪效果
import WeatherFog from "../../public/Cesium/CesiumWeather/WeatherFog";   // 导入雾效果

// 全局存储天气对象，避免重复实例化
let weatherObjs = {
  rain: undefined,
  snow: undefined,
  fog: undefined,
};

export default {
  data(){
    return {
      loading: false,  // 用于地形切换时的加载状态
      weatherTool: true, // 控制天气工具的显示与隐藏
      weatherVal: "请选择天气", // 当前选择的天气值
      weatherOpts: [
        { value: "rain", label: "雨" },
        { value: "snow", label: "雪" },
        { value: "fog", label: "雾" },
      ], // 天气选项数组
    }
  },
  async mounted() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGQ2OTY0OS05OWNiLTRmZDctYTcwNi1lYTY1NTVhODBhNDYiLCJpZCI6MjM5MTExLCJpYXQiOjE3MjU0NTU0ODZ9.JbglzGJ8dBc1tbZbb9GTKEuRlxyE6mXZKIWJ7E_diW4'; // 替换为实际 Cesium 令牌
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      timeline: false,
      fullscreenButton: true,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      geocoder: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      terrainProvider: new Cesium.EllipsoidTerrainProvider(), // 默认使用椭球地形
    });
    this.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏 Cesium 的版权信息
    this.imageLayers = this.viewer.imageryLayers; // 图层管理
    this.scene = this.viewer.scene;
    this.scene.globe.depthTestAgainstTerrain = true; // 启用深度测试

    // 添加一个3D实体模型
    const entity = this.viewer.entities.add({
      name: '3D Model with Multiple Materials',
      position: Cesium.Cartesian3.fromDegrees(112.94572462738567, 28.187290962027645, 40),
      model: {
        uri: '3Dmodels/model.glb', // 替换为实际模型路径
        scale: 50.0,
        minimumPixelSize: 128,
        maximumScale: 20000
      }
    });
    this.Entity = entity;
    this.viewer.flyTo(entity, { duration: 1.65 }); // 相机飞向实体位置

    // 事件监听器：用于与其他组件通信，处理地图/天气/地形的切换
    imageBus.$on('changeBaseMap', this.changeMap);
    imageBus.$on('toggle-terrain', this.toggleTerrain);
    imageBus.$on('toggle-weather', this.toggleWeather);
    eventAsideMain.$on('toggle-entitys', this.toggleEntitys);
    eventAsideMain.$on('toggle-scene', this.toggleScene);
    this.weatherChange(''); // 初次加载时重置天气
  },
  beforeDestroy() {
    // 销毁组件时取消事件监听器，防止内存泄漏
    imageBus.$off('changeBaseMap', this.changeMap);
    imageBus.$off('toggle-terrain', this.toggleTerrain);
    imageBus.$off('toggle-weather', this.toggleWeather);
    eventAsideMain.$off('toggle-entitys', this.toggleEntitys);
    eventAsideMain.$off('toggle-scene', this.toggleScene);
  },
  methods: {
    // 切换地形：根据选择的值切换 2D 或 3D 地形
    async toggleTerrain(value) {
      this.loading = true;
      const terrainProvider = value ? await Cesium.createWorldTerrainAsync() : new Cesium.EllipsoidTerrainProvider();
      this.viewer.terrainProvider = terrainProvider;
      this.$message({ message: `已切换到 ${value ? '3D' : '2D'} 地形`, type: 'success' });
      this.loading = false;
    },
    // 切换底图：更换地图图层
    changeMap(image) {
      this.imageLayers.removeAll();
      this.imageLayers.addImageryProvider(image);
    },
    // 控制天气工具的显示与隐藏
    toggleWeather(value) {
      this.weatherTool = value;
    },
    // 切换天气特效：根据选择的天气应用特效
    weatherChange(val) {
      this.clearWeatherEffects(); // 每次切换时先清除现有天气效果
      if (val && !weatherObjs[val]) {
        switch (val) {
          case "rain":
            weatherObjs.rain = new WeatherRain(this.viewer, { tiltAngle: -0.2, rainSize: 0.5, rainSpeed: 380.0 });
            break;
          case "snow":
            weatherObjs.snow = new WeatherSnow(this.viewer, { snowSize: 0.02, snowSpeed: 80.0 });
            break;
          case "fog":
            weatherObjs.fog = new WeatherFog(this.viewer, { visibility: 0.25, color: new Cesium.Color(0.8, 0.8, 0.8, 0.3) });
            break;
        }
      }
      if (weatherObjs[val]) weatherObjs[val].show(true); // 显示选择的天气特效
    },
    // 清除当前的所有天气效果
    clearWeatherEffects() {
      Object.values(weatherObjs).forEach(obj => obj && obj.show(false));
    },
    // 关闭天气特效
    weatherClose() {
      this.clearWeatherEffects();
    },
    // 切换实体的显示与隐藏
    toggleEntitys(value) {
      this.Entity.show = value;
    },
    // 切换场景的显示与隐藏
    toggleScene(value) {
      this.viewer.scene.globe.show = value;
    }
  },
}
</script>

<style lang="less" scoped>
.weather-tools {
    position: absolute;
    z-index: 10;
    margin-left: 70vw;
    margin-top: 20px;
    :deep(.el-input) {
      .el-input__inner {
        height: 30px;
        width: 120px;
      }
      .el-input__suffix {
        top: 5px;
      }
    }
    .close-btn {
      margin-left: 15px;
      cursor: pointer;
    }
  }
</style>
