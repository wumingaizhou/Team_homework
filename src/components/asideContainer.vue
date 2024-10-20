<template>
  <div>
    <el-switch
  class="asideSwitch1"
  v-model="value1"
  active-text="显示模型"
  inactive-text="关闭模型"
  @change="toggleEntitys">
    </el-switch>  
    <el-switch
  class="asideSwitch2"
  v-model="value2"
  active-text="显示地球"
  inactive-text="关闭地球"
  @change="toggleScene">
    </el-switch>
  </div>
</template>

<script>
  import eventAsideMain from '../utils/eventAsideMain';
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    },
    methods:{
      toggleEntitys(value){
        eventAsideMain.$emit('toggle-entitys',value)
      },
      toggleScene(value){
        eventAsideMain.$emit('toggle-scene',value)
      }
    }
  };
</script>

<style scoped>
 .asideSwitch1{
  margin-top: 20px;
  margin-left: 20px;
 }
 .asideSwitch2{
  margin-top: 30px;
  margin-left: 20px;
 }
</style>