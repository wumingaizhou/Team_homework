<template>
  <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">影像选择</template>
    <el-menu-item index="2-1" @click="changeBaseMap(imageSourceArry.tdt)">天地图</el-menu-item>
    <el-menu-item index="2-2" @click="changeBaseMap(imageSourceArry.esri)">Arcgis底图</el-menu-item>
    <el-menu-item index="2-3" @click="changeBaseMap(imageSourceArry.osm)">OSM底图（加载慢）</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>

</template>

<script>
  import imageBus from '@/utils/imageEvent';
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
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
        imageBus.$emit('changeBaseMap',imageSource)
      }
    }
  }
</script>

<style scoped> 
</style>