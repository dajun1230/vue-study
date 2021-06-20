import Vue from "vue";
import App from "./App.vue";

import router from "./router";
// import router from "./krouter";

import store from "./store";
// import store from "./kstore";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  // 设置router，它怎么起作用？
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
