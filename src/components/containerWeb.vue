<template>
<el-container>
  <el-header>
    <headerContainer></headerContainer>
  </el-header>
  <el-container>
    <el-aside width="200px">
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
  components:{
    headerContainer,
    mainContainer,
    asideContainer
  }
}
</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100vh;
  }

  .el-header{
    display: flex;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    display: flex;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100vh;
  }
  
  body > .el-container {
    display: flex;
    margin-bottom: 40px;
  }

</style>