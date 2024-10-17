<template>
  <header class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-edit large-icon"></i>
        处理中心
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-operation large-icon"></i>影像选择</template>
        <el-menu-item index="2-1" @click="changeBaseMap(imageSourceArry.tdt)">天地图</el-menu-item>
        <el-menu-item index="2-2" @click="changeBaseMap(imageSourceArry.esri)">Arcgis底图</el-menu-item>
        <el-menu-item index="2-3" @click="changeBaseMap(imageSourceArry.osm)">OSM底图（加载慢）</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu large-icon"></i>基础功能</template>
        <el-menu-item index="3-1">切换地形
          <el-switch
            v-model="is3Dtrue"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleTerrain">
          </el-switch>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="4"><a href="https://dlkx.hunnu.edu.cn/" target="_blank"><i class="el-icon-phone large-icon"></i>联系我们</a></el-menu-item>
    </el-menu>
  </header>
</template>

<script>
  import imageBus from '@/utils/imageEvent';
  export default {
    data() {
      return {
        is3Dtrue:false,
        activeIndex: '1',
        imageSourceArry:{
          tdt: new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=2501982e131a281d49765ab584c34c24', // 天地图API密钥
            subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], // 天地图子域
            maximumLevel: 18,
            minimumLevel: 1,
            credit: 'Tianditu'
          }),
          esri: new Cesium.WebMapTileServiceImageryProvider({
            url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS',
            layer: 'World_Imagery',
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'GoogleMapsCompatible',
            maximumLevel: 19,
            credit: new Cesium.Credit('© Esri', 'https://www.esri.com/')
          }),
          osm:new Cesium.OpenStreetMapImageryProvider({
            url: 'https://a.tile.openstreetmap.org/' // OSM地图瓦片服务URL
          }),
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeBaseMap(imageSource){
        //发送切换底图事件
        imageBus.$emit('changeBaseMap',imageSource)
      },
      toggleTerrain(value) {
      // 发送切换地形事件
      imageBus.$emit('toggle-terrain', value);
    },
    }
  }
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #545c64;
  padding: 0 20px;
}

.el-menu-demo {
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
}

/* 控制字体大小 */
.el-menu-item {
  font-size: 18px;
}
>>> .el-submenu__title {
  font-size: 18px !important;
}
 /* 控制图标大小 */
.large-icon {
  font-size: 22px;
}
</style>