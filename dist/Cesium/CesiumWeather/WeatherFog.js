// 雾气效果
class FogEffect {
  constructor(viewer, options) {
    if (!viewer) throw new Error("no viewer object!");
    options = options || {};
    this.visibility = Cesium.defaultValue(options.visibility, 0.1);
    this.color = Cesium.defaultValue(
      options.color,
      new Cesium.Color(0.8, 0.8, 0.8, 0.5)
    );
    this._show = Cesium.defaultValue(options.show, true);
    this.viewer = viewer;
    this.init();
  }

  init() {
    this.fogStage = new Cesium.PostProcessStage({
      name: "czml_fog",
      fragmentShader: this.fog(),
      uniforms: {
        visibility: () => {
          return this.visibility;
        },
        fogColor: () => {
          return this.color;
        },
      },
    });
    this.viewer.scene.postProcessStages.add(this.fogStage);
  }

  // 销毁对象
  destroy() {
    if (!this.viewer || !this.fogStage) return;
    this.viewer.scene.postProcessStages.remove(this.fogStage);
    this.fogStage.destroy();
    delete this.visibility;
    delete this.color;
  }

  // 控制显示
  show(visible) {
    this._show = visible;
    this.fogStage.enabled = this._show;
  }

  // CLML对象，方便导出使用
  fog() {
    return `#version 300 es
    precision mediump float;

    uniform sampler2D colorTexture;
    uniform sampler2D depthTexture;
    uniform float visibility;
    uniform vec4 fogColor;
    in vec2 v_textureCoordinates;
    out vec4 fragColor; // 输出颜色

    void main(void) {
        vec4 origcolor = texture(colorTexture, v_textureCoordinates);
        float depth = czm_readDepth(depthTexture, v_textureCoordinates);
        vec4 depthcolor = texture(depthTexture, v_textureCoordinates);
        float f = visibility * (depthcolor.r - 0.3) / 0.2;
        if (f < 0.0) f = 0.0;
        else if (f > 1.0) f = 1.0;
        fragColor = mix(origcolor, fogColor, f);
    }
    `;
  }
}

export default FogEffect;
