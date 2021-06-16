import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import router from "./krouter";

Vue.config.productionTip = false;

new Vue({
  router, // 设置router，它怎么起作用？
  render: (h) => h(App),
}).$mount("#app");
