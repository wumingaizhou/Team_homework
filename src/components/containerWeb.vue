<template>
  <el-container>
    <el-header>
      <headerContainer></headerContainer>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <asideContainer></asideContainer>
      </el-aside>
      <el-main>
        <mainContainer></mainContainer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headerContainer from './headerContainer.vue';
import mainContainer from './mainContainer.vue';
import asideContainer from './asideContainer.vue';
export default {
  components: {
    headerContainer,
    mainContainer,
    asideContainer
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body > .el-container {
  display: flex;
  flex-direction: column; /* 垂直排列 header 和主内容 */
  height: 100vh; 
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  height: 60px; /* 确保 header 高度固定 */
}

.el-container > .el-container {
  display: flex;
  flex-grow: 1; /* 使内容区域占满剩余空间 */
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  height: 92vh; /* 或者根据需求设置 */
}

.el-main {
  height: 92vh; /* 根据需要调整高度 */
  flex-grow: 1; /* 让 el-main 占满剩余空间 */
  width: calc(100% - 200px); /* 减去 aside 的宽度 */
}
</style>
