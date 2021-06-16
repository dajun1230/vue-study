// eslint-disable-next-line no-unused-vars
let KVue;

// 插件
// 1. 实现一个install方法
class KVueRouter {
  constructor(options) {
    this.$options = options;

    // 响应式数据
    const initial = window.location.hash.slice(1) || "/";
    KVue.util.defineReactive(this, "current", initial);
    // this.current = "/";

    // 监听事件
    window.addEventListener("hashchange", this.onhashChange.bind(this));
    window.addEventListener("load", this.onhashChange.bind(this));
  }

  onhashChange() {
    this.current = window.location.hash.slice(1);
    console.log(this.current);
  }
}

// 形参是Vue构造函数
KVueRouter.install = function (Vue) {
  // 保存构造函数
  KVue = Vue;

  // 1. 挂载$router
  Vue.mixin({
    beforeCreate() {
      // 全局混入，将来在组件实例化的时候才执行
      // 此时router实例是不是已经存在了
      // this指的是组件实例
      if (this.$options.router) {
        // 挂载
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 2. 实现两个全局组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    // h是createElement函数
    render(h) {
      // <a href="#/xxx"></a>

      // jsx语法也可以用（但是需要专门的loader去处理，因为不建议这样做）
      // return <a href={"#" + this.to}>{this.$slots.default}</a>;

      // h(tag, props, children)

      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      // 1. 获取路由器实例
      const routes = this.$router.$options.routes;
      const current = this.$router.current;
      const route = routes.find((route) => route.path === current);
      const comp = route ? route.component : null;
      // 获取路由表 '/'
      return h(comp);
    },
  });
};

export default KVueRouter;
