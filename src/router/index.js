// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
//import HelloWorld from '../components/HelloWorld'; // 引入组件
//import About from '../components/About'; // 另一个组件

Vue.use(Router);

const routes = [
  // {
  //   path: '/hello',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // }
];

const router = new Router({
  mode: 'history', // 使用 HTML5 History 模式
  routes
});

export default router;
