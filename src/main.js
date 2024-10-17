import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Container, Button, Menu, Icon, Switch, Message } from 'element-ui';
import router from './router';


Vue.use(ElementUI);
Vue.use(Container, Button, Menu, Icon, Switch, Message)
Vue.use(router)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
