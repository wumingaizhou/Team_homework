(function(){"use strict";var e={393:function(e,t,i){var n=i(5319),o=i.n(n),r=i(4355),a=i.n(r),s=i(5596),l=i.n(s),c=i(8339),u=i.n(c),h=i(874),d=i.n(h),m=i(2916),g=i.n(m),f=i(9507),v=i.n(f),w=i(4932),p=i.n(w),y=i(7203),C=i.n(y),S=i(6848),x=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("container")],1)},b=[],T=function(){var e=this,t=e._self._c;return t("el-container",[t("el-header",[t("headerContainer")],1),t("el-container",[t("el-aside",{attrs:{width:"250px"}},[t("asideContainer")],1),t("el-main",[t("mainContainer")],1)],1)],1)},_=[],M=function(){var e=this,t=e._self._c;return t("header",{staticClass:"header"},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[t("el-menu-item",{attrs:{index:"1"}},[t("i",{staticClass:"el-icon-edit large-icon"}),e._v(" 处理中心 ")]),t("el-submenu",{attrs:{index:"2"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-s-operation large-icon"}),e._v("影像选择")]),t("el-menu-item",{attrs:{index:"2-1"},on:{click:function(t){return e.changeBaseMap(e.imageSourceArry.tdt)}}},[e._v("天地图")]),t("el-menu-item",{attrs:{index:"2-2"},on:{click:function(t){return e.changeBaseMap(e.imageSourceArry.esri)}}},[e._v("Arcgis底图")]),t("el-menu-item",{attrs:{index:"2-3"},on:{click:function(t){return e.changeBaseMap(e.imageSourceArry.osm)}}},[e._v("OSM底图（加载慢）")]),t("el-menu-item",{attrs:{index:"2-4"},on:{click:function(t){return e.changeBaseMap(e.imageSourceArry.stadiaLayer)}}},[e._v("简化视觉底图")])],2),t("el-submenu",{attrs:{index:"3"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-menu large-icon"}),e._v("基础功能")]),t("el-menu-item",{attrs:{index:"3-1"}},[e._v("切换地形 "),t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:e.toggleTerrain},model:{value:e.is3Dtrue,callback:function(t){e.is3Dtrue=t},expression:"is3Dtrue"}})],1),t("el-menu-item",{attrs:{index:"3-2"}},[e._v("天气特效 "),t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:e.toggleWeather},model:{value:e.isWeatherTrue,callback:function(t){e.isWeatherTrue=t},expression:"isWeatherTrue"}})],1)],2),t("el-menu-item",{attrs:{index:"4"}},[t("a",{attrs:{href:"https://dlkx.hunnu.edu.cn/",target:"_blank"}},[t("i",{staticClass:"el-icon-phone large-icon"}),e._v("联系我们")])])],1)],1)},k=[];const P=new S["default"];var z=P,E={data(){return{is3Dtrue:!1,isWeatherTrue:!0,activeIndex:"1",imageSourceArry:{tdt:new Cesium.UrlTemplateImageryProvider({url:"http://{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=2501982e131a281d49765ab584c34c24",subdomains:["t0","t1","t2","t3","t4","t5","t6","t7"],maximumLevel:18,minimumLevel:1,credit:"Tianditu"}),esri:new Cesium.WebMapTileServiceImageryProvider({url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS",layer:"World_Imagery",style:"default",format:"image/jpeg",tileMatrixSetID:"GoogleMapsCompatible",maximumLevel:19,credit:new Cesium.Credit("© Esri","https://www.esri.com/")}),osm:new Cesium.OpenStreetMapImageryProvider({url:"https://a.tile.openstreetmap.org/"}),stadiaLayer:new Cesium.UrlTemplateImageryProvider({url:"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png",credit:"© Stadia Maps, © OpenMapTiles, © OpenStreetMap contributors"})}}},methods:{handleSelect(e,t){console.log(e,t)},changeBaseMap(e){z.$emit("changeBaseMap",e)},toggleTerrain(e){z.$emit("toggle-terrain",e)},toggleWeather(e){z.$emit("toggle-weather",e)}}},O=E,D=i(1656),A=(0,D.A)(O,M,k,!1,null,"ef822166",null),W=A.exports,I=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%",height:"100%"},attrs:{id:"cesiumContainer"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.weatherTool,expression:"weatherTool"}],staticClass:"weather-tools"},[t("el-select",{attrs:{placeholder:"请选择天气"},on:{change:e.weatherChange},model:{value:e.weatherVal,callback:function(t){e.weatherVal=t},expression:"weatherVal"}},e._l(e.weatherOpts,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),t("el-button",{staticClass:"close-btn",attrs:{size:"mini"},on:{click:e.weatherClose}},[e._v("关闭")])],1)])},j=[];const $=new S["default"];var V=$;class B{constructor(e,t){if(!e)throw new Error("no viewer object!");t=t||{},this.tiltAngle=Cesium.defaultValue(t.tiltAngle,-.6),this.rainSize=Cesium.defaultValue(t.rainSize,.1),this.rainSpeed=Cesium.defaultValue(t.rainSpeed,1e3),this.viewer=e,this.init()}init(){this.rainStage=new Cesium.PostProcessStage({name:"czml_rain",fragmentShader:this.rain(),uniforms:{tiltAngle:()=>this.tiltAngle,rainSize:()=>this.rainSize,rainSpeed:()=>this.rainSpeed}}),this.viewer.scene.postProcessStages.add(this.rainStage)}destroy(){this.viewer&&this.rainStage&&(this.viewer.scene.postProcessStages.remove(this.rainStage),this.rainStage.destroy(),delete this.tiltAngle,delete this.rainSize,delete this.rainSpeed)}show(e){this.rainStage.enabled=e}rain(){return"#version 300 es\n    precision mediump float;\n\n    uniform sampler2D colorTexture;\n    in vec2 v_textureCoordinates;\n    uniform float tiltAngle;\n    uniform float rainSize;\n    uniform float rainSpeed;\n\n    float hash(float x) {\n        return fract(sin(x * 133.3) * 13.13);\n    }\n\n    out vec4 fragColor; // 输出颜色\n\n    void main(void) {\n        float time = czm_frameNumber / rainSpeed;\n        vec2 resolution = czm_viewport.zw;\n        vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n        vec3 c = vec3(.6, .7, .8);\n        float a = tiltAngle;\n        float si = sin(a), co = cos(a);\n        uv *= mat2(co, -si, si, co);\n        uv *= length(uv + vec2(0, 4.9)) * rainSize + 1.;\n        float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);\n        float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;\n        c *= v * b;\n        fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c, 1), .5);\n    }\n    "}}var L=B;class N{constructor(e,t){if(!e)throw new Error("no viewer object!");t=t||{},this.snowSize=Cesium.defaultValue(t.snowSize,.02),this.snowSpeed=Cesium.defaultValue(t.snowSpeed,60),this.viewer=e,this.init()}init(){this.snowStage=new Cesium.PostProcessStage({name:"czml_snow",fragmentShader:this.snow(),uniforms:{snowSize:()=>this.snowSize,snowSpeed:()=>this.snowSpeed}}),this.viewer.scene.postProcessStages.add(this.snowStage)}destroy(){this.viewer&&this.snowStage&&(this.viewer.scene.postProcessStages.remove(this.snowStage),this.snowStage.destroy(),delete this.snowSize,delete this.snowSpeed)}show(e){this.snowStage.enabled=e}snow(){return"#version 300 es\n    precision mediump float;\n\n    uniform sampler2D colorTexture;\n    in vec2 v_textureCoordinates;\n    uniform float snowSpeed;\n    uniform float snowSize;\n\n    float snow(vec2 uv, float scale) {\n        float time = czm_frameNumber / snowSpeed;\n        float w = smoothstep(1., 0., -uv.y * (scale / 10.));\n        if (w < .1) return 0.;\n        uv += time / scale;\n        uv.y += time * 2. / scale;\n        uv.x += sin(uv.y + time * .5) / scale;\n        uv *= scale;\n        vec2 s = floor(uv), f = fract(uv), p;\n        float k = 3., d;\n        p = .5 + .35 * sin(11. * fract(sin((s + p + scale) * mat2(7, 3, 6, 5)) * 5.)) - f;\n        d = length(p);\n        k = min(d, k);\n        k = smoothstep(0., k, sin(f.x + f.y) * snowSize);\n        return k * w;\n    }\n\n    out vec4 fragColor; // 输出颜色\n\n    void main(void) {\n        vec2 resolution = czm_viewport.zw;\n        vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n        vec3 finalColor = vec3(0.);\n        float c = 0.;\n        c += snow(uv, 30.) * 0.;\n        c += snow(uv, 20.) * 0.;\n        c += snow(uv, 15.) * 0.;\n        c += snow(uv, 10.);\n        c += snow(uv, 8.);\n        c += snow(uv, 6.);\n        c += snow(uv, 5.);\n        finalColor = (vec3(c));\n        fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(finalColor, 1), .5);\n    }\n    "}}var J=N;class R{constructor(e,t){if(!e)throw new Error("no viewer object!");t=t||{},this.visibility=Cesium.defaultValue(t.visibility,.1),this.color=Cesium.defaultValue(t.color,new Cesium.Color(.8,.8,.8,.5)),this._show=Cesium.defaultValue(t.show,!0),this.viewer=e,this.init()}init(){this.fogStage=new Cesium.PostProcessStage({name:"czml_fog",fragmentShader:this.fog(),uniforms:{visibility:()=>this.visibility,fogColor:()=>this.color}}),this.viewer.scene.postProcessStages.add(this.fogStage)}destroy(){this.viewer&&this.fogStage&&(this.viewer.scene.postProcessStages.remove(this.fogStage),this.fogStage.destroy(),delete this.visibility,delete this.color)}show(e){this._show=e,this.fogStage.enabled=this._show}fog(){return"#version 300 es\n    precision mediump float;\n\n    uniform sampler2D colorTexture;\n    uniform sampler2D depthTexture;\n    uniform float visibility;\n    uniform vec4 fogColor;\n    in vec2 v_textureCoordinates;\n    out vec4 fragColor; // 输出颜色\n\n    void main(void) {\n        vec4 origcolor = texture(colorTexture, v_textureCoordinates);\n        float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n        vec4 depthcolor = texture(depthTexture, v_textureCoordinates);\n        float f = visibility * (depthcolor.r - 0.3) / 0.2;\n        if (f < 0.0) f = 0.0;\n        else if (f > 1.0) f = 1.0;\n        fragColor = mix(origcolor, fogColor, f);\n    }\n    "}}var Y=R;let G={rain:void 0,snow:void 0,fog:void 0};var U={data(){return{loading:!1,weatherTool:!0,weatherVal:"请选择天气",weatherOpts:[{value:"rain",label:"雨"},{value:"snow",label:"雪"},{value:"fog",label:"雾"}],modelEntity:null}},async mounted(){Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGQ2OTY0OS05OWNiLTRmZDctYTcwNi1lYTY1NTVhODBhNDYiLCJpZCI6MjM5MTExLCJpYXQiOjE3MjU0NTU0ODZ9.JbglzGJ8dBc1tbZbb9GTKEuRlxyE6mXZKIWJ7E_diW4",this.viewer=new Cesium.Viewer("cesiumContainer",{animation:!1,timeline:!1,fullscreenButton:!0,homeButton:!1,sceneModePicker:!1,baseLayerPicker:!1,geocoder:!1,navigationHelpButton:!1,infoBox:!1,selectionIndicator:!1,terrainProvider:new Cesium.EllipsoidTerrainProvider}),this.viewer._cesiumWidget._creditContainer.style.display="none",this.imageLayers=this.viewer.imageryLayers,this.scene=this.viewer.scene,this.scene.globe.depthTestAgainstTerrain=!0;const e=Cesium.Math.toRadians(90),t=0,i=0,n=Cesium.Cartesian3.fromDegrees(112.94200862738568,28.192782062027646,0),o=this.viewer.entities.add({name:"3D Model with Multiple Materials",position:n,model:{uri:"3Dmodels/jinweilouWithTile.gltf",scale:1,minimumPixelSize:128,maximumScale:2e4},orientation:Cesium.Transforms.headingPitchRollQuaternion(n,new Cesium.HeadingPitchRoll(e,t,i))});this.modelEntity=o,this.viewer.flyTo(this.modelEntity,{duration:1.65}),z.$on("changeBaseMap",this.changeMap),z.$on("toggle-terrain",this.toggleTerrain),z.$on("toggle-weather",this.toggleWeather),V.$on("toggle-entitys",this.toggleEntitys),V.$on("toggle-scene",this.toggleScene),this.weatherChange("")},beforeDestroy(){z.$off("changeBaseMap",this.changeMap),z.$off("toggle-terrain",this.toggleTerrain),z.$off("toggle-weather",this.toggleWeather),V.$off("toggle-entitys",this.toggleEntitys),V.$off("toggle-scene",this.toggleScene)},methods:{async toggleTerrain(e){this.loading=!0;const t=e?await Cesium.createWorldTerrainAsync():new Cesium.EllipsoidTerrainProvider;this.viewer.terrainProvider=t,this.changeModel(),this.$message({message:`已切换到 ${e?"3D":"2D"} 地形`,type:"success"}),this.loading=!1},changeMap(e){this.imageLayers.removeAll(),this.imageLayers.addImageryProvider(e)},toggleWeather(e){this.weatherTool=e},async changeModel(){const e=112.94201062738567,t=28.19280962027645,i=Cesium.Cartographic.fromDegrees(e,t);if(this.viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider){console.warn("当前为椭球地形，无法获取真实地形高度。");var n=0;const i=Cesium.Cartesian3.fromDegrees(e,t,n);this.addModel(i)}else try{const n=await Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider,[i]),o=n[0].height-7||10,r=Cesium.Cartesian3.fromDegrees(e,t,o);this.addModel(r)}catch(o){console.error("地形采样错误:",o)}},addModel(e){const t=Cesium.Math.toRadians(90),i=0,n=0;this.modelEntity?(this.modelEntity.position=e,this.viewer.flyTo(this.modelEntity,{duration:1.65})):this.modelEntity=this.viewer.entities.add({name:"3D Model with Multiple Materials",position:e,model:{uri:"3Dmodels/jinweilouWithTile.gltf",scale:1,minimumPixelSize:128,maximumScale:2e4},orientation:Cesium.Transforms.headingPitchRollQuaternion(e,new Cesium.HeadingPitchRoll(t,i,n))})},weatherChange(e){if(this.clearWeatherEffects(),e&&!G[e])switch(e){case"rain":G.rain=new L(this.viewer,{tiltAngle:-.2,rainSize:.5,rainSpeed:380});break;case"snow":G.snow=new J(this.viewer,{snowSize:.02,snowSpeed:80});break;case"fog":G.fog=new Y(this.viewer,{visibility:.25,color:new Cesium.Color(.8,.8,.8,.3)});break}G[e]&&G[e].show(!0)},clearWeatherEffects(){Object.values(G).forEach((e=>e&&e.show(!1)))},weatherClose(){this.clearWeatherEffects()},toggleEntitys(e){this.modelEntity.show=e},toggleScene(e){this.viewer.scene.globe.show=e}}},Z=U,Q=(0,D.A)(Z,I,j,!1,null,"1967288a",null),X=Q.exports,F=function(){var e=this,t=e._self._c;return t("div",[t("el-switch",{staticClass:"asideSwitch1",attrs:{"active-text":"显示模型","inactive-text":"关闭模型"},on:{change:e.toggleEntitys},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}}),t("el-switch",{staticClass:"asideSwitch2",attrs:{"active-text":"显示地球","inactive-text":"关闭地球"},on:{change:e.toggleScene},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1)},H=[],K={data(){return{value1:!0,value2:!0}},methods:{toggleEntitys(e){V.$emit("toggle-entitys",e)},toggleScene(e){V.$emit("toggle-scene",e)}}},q=K,ee=(0,D.A)(q,F,H,!1,null,"dd71b79c",null),te=ee.exports,ie={components:{headerContainer:W,mainContainer:X,asideContainer:te}},ne=ie,oe=(0,D.A)(ne,T,_,!1,null,"bf0f05f2",null),re=oe.exports,ae={name:"App",components:{container:re}},se=ae,le=(0,D.A)(se,x,b,!1,null,null,null),ce=le.exports,ue=i(6178);S["default"].use(ue.Ay);const he=[],de=new ue.Ay({mode:"history",routes:he});var me=de;S["default"].use(C()),S["default"].use(p(),v(),g(),d(),u(),l(),a(),o()),S["default"].use(me),S["default"].config.productionTip=!1,new S["default"]({render:e=>e(ce),router:me}).$mount("#app")}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.m=e,function(){var e=[];i.O=function(t,n,o,r){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var s=!0,l=0;l<n.length;l++)(!1&r||a>=r)&&Object.keys(i.O).every((function(e){return i.O[e](n[l])}))?n.splice(l--,1):(s=!1,r<a&&(a=r));if(s){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,a=n[0],s=n[1],l=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)i.o(s,o)&&(i.m[o]=s[o]);if(l)var u=l(i)}for(t&&t(n);c<a.length;c++)r=a[c],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(u)},n=self["webpackChunkhomework"]=self["webpackChunkhomework"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=i.O(void 0,[504],(function(){return i(393)}));n=i.O(n)})();
//# sourceMappingURL=app.108e687a.js.map