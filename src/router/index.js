import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import HomeForm from "../views/element-form";
// import HomeForm from "../views/k-form";

// 1. 为什么用use方法？ 它做了什么？
// VueRouter是插件，使用插件必须使用use方法
// this.$router 可以访问Router实例，内部Vue.prototype.$router
// 实现并注册两个全局组件 router-view
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeForm,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
