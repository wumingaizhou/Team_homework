<template>
  <div v-loading="loading" id="cesiumContainer" style="width: 100%; height: 100%;">
    <div class="weather-tools" v-show="weatherTool">
      <el-select
        v-model="weatherVal"
        placeholder="请选择天气"
        @change="weatherChange"
      >
        <el-option
          v-for="item in weatherOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button size="mini" @click="weatherClose" class="close-btn"
        >关闭</el-button
      >
    </div>
  </div>
</template>
<script type="module">
import imageBus from '@/utils/imageEvent';
import WeatherRain from "../../public/Cesium/CesiumWeather/WeatherRain";
import WeatherSnow from "../../public/Cesium/CesiumWeather/WeatherSnow";
import WeatherFog from "../../public/Cesium/CesiumWeather/WeatherFog";

let rainObj = undefined;
let snowObj = undefined;
let fogObj = undefined;
export default {
  data(){
    return {
      loading:false,
      weatherTool:true,
      weatherVal: "请选择天气",
      weatherOpts: [
        {
          value: "rain",
          label: "雨",
        },
        {
          value: "snow",
          label: "雪",
        },
        {
          value: "fog",
          label: "雾",
        },
      ],
    }
  },
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
    this.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权

    // 获取 Cesium Viewer 的影像图层
    this.imageLayers = this.viewer.imageryLayers;

    this.scene = this.viewer.scene;
    this.scene.globe.depthTestAgainstTerrain = true;

    // 添加一个实体并加载 gltf 模型
    const entity = this.viewer.entities.add({
      name: '3D Model with Multiple Materials',
      position: Cesium.Cartesian3.fromDegrees(112.94572462738567, 28.187290962027645, 40), // 模型的经纬度和高度
      model: {
        uri: '3Dmodels/3dtest.gltf',  // 模型文件路径
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
    imageBus.$on('toggle-weather', this.toggleWeather);
    this.weatherChange('');
  },
  beforeDestroy() {
    // 移除事件监听器
    imageBus.$off('changeBaseMap', this.changeMap);
    imageBus.$off('toggle-terrain', this.toggleTerrain);
    imageBus.$off('toggle-weather', this.toggleWeather);
  },
  methods: {
    // 切换地形
    async toggleTerrain(value) {
      if (value) {
        this.loading = true;
        this.viewer.terrainProvider = await Cesium.createWorldTerrainAsync(); // 启用 3D 地形
        this.$message({
          message: '已切换到 3D 地形',
          type: 'success'
        });
        this.loading = false;
      } else {
        this.loading = true;
        this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider(); // 使用平滑的椭球模型
        this.$message({
          message: '已切换到 2D 地形',
          type: 'success'
        });
        this.loading = false;
      }
    },
    // 更改底图
    changeMap(image) {
      this.imageLayers.removeAll();
      this.imageLayers.addImageryProvider(image);
    },
    //是否显示天气特性开关
    toggleWeather(value){
      this.weatherTool = value;
    },
    //天气特效
    weatherChange(val) {
      switch (val) {
        case "rain":
          if (snowObj) {
            snowObj.show(false);
          }
          if (fogObj) {
            fogObj.show(false);
          }
          if (!rainObj) {
            rainObj = new WeatherRain(this.viewer, {
              tiltAngle: -0.2,
              rainSize: 0.5,
              rainSpeed: 380.0,
            });
          }
          rainObj.show(true);
          break;
        case "snow":
          if (rainObj) {
            rainObj.show(false);
          }
          if (fogObj) {
            fogObj.show(false);
          }
          if (!snowObj) {
            snowObj = new WeatherSnow(this.viewer, {
              snowSize: 0.02, //雪大小
              snowSpeed: 80.0, //雪速
            });
          }
          snowObj.show(true);
          break;
        case "fog":
          if (rainObj) {
            rainObj.show(false);
          }
          if (snowObj) {
            snowObj.show(false);
          }
          if (!fogObj) {
            fogObj = new WeatherFog(this.viewer, {
              visibility: 0.25,
              color: new Cesium.Color(0.8, 0.8, 0.8, 0.3),
            });
          }
          fogObj.show(true);
          break;
      }
    },
    // 关闭天气特效
    weatherClose() {
      if (rainObj) {
        rainObj.show(false);
      }
      if (snowObj) {
        snowObj.show(false);
      }
      if (fogObj) {
        fogObj.show(false);
      }
    },
    getLocation() {
      let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
      handler.setInputAction(function (event) {
        let earthPosition = this.viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          let cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
          let lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
          let lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
          let height = cartographic.height.toFixed(2);
          console.log(earthPosition, {
            lon: lon,
            lat: lat,
            height: height,
          });
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    },
}
</script>

<style lang="less" scoped>
.weather-tools {
    position: absolute;
    z-index: 10;
    margin-left: -220px;
    margin-top: 30px;
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
