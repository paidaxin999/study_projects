import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入路由权限配置文件
// import './permission.js'

Vue.config.productionTip = false;
// console.log(process.env.VUE_APP_SERVER_URL);
// console.log(process.env.VUE_APP_API_BASEURL);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
