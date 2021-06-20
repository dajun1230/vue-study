import Vue from "vue";

// eslint-disable-next-line no-unused-vars
let KVue;

// 插件
// 1. 实现一个install方法
class KVueRouter {
  constructor(options) {
    this.$options = options;

    // 优化
    // 缓存path和route映射关系
    // this.routeMap = {};
    // this.$options.routes.forEach((route) => {
    //   this.routeMap[route.path] = route;
    // });

    // 响应式数据
    const initial = window.location.hash.slice(1) || "/";
    // KVue.util.defineReactive(this, "current", initial);
    // this.current = "/";

    this.current = initial;
    Vue.util.defineReactive(this, "matched", []);
    // match方法可以递归遍历路由表，获取匹配关系数组
    this.match();

    // 监听事件
    window.addEventListener("hashchange", this.onhashChange.bind(this));
    window.addEventListener("load", this.onhashChange.bind(this));
  }

  onhashChange() {
    this.current = window.location.hash.slice(1);

    this.matched = [];
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes;

    // 递归遍历 - 比较粗暴的方法
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }

      // /about/info
      if (route.path !== "/" && this.current.indexOf(route.path) != -1) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
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
      // const routes = this.$router.$options.routes;
      // const current = this.$router.current;
      // const route = routes.find((route) => route.path === current);
      // const comp = route ? route.component : null;

      // 解决路由嵌套的问题
      // 标记当前router-view深度
      this.$vnode.data.routerView = true;

      let depth = 0;
      let parent = this.$parent;
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data;
        if (vnodeData) {
          if (vnodeData.routerView) {
            // 说明当前parent是一个router-view
            depth++;
          }
        }

        parent = parent.$parent;
      }

      // 获取path对应的component
      let comp = null;
      const route = this.$router.matched[depth];
      if (route) {
        comp = route.component;
      }

      // 优化
      // const { routeMap, current } = this.$router;
      // const comp = routeMap[current] ? routeMap[current].component : null;

      // 获取路由表 '/'
      return h(comp);
    },
  });
};

export default KVueRouter;
