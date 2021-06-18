// eslint-disable-next-line no-unused-vars
let KVue;
// 实现Store类
class Store {
  constructor(options) {
    // 响应式的state

    // 以下这样会暴露整个state
    // this.state = new KVue({
    //   data: options.state,
    // });

    this._vm = new KVue({
      data: {
        $$state: options.state,
      },
    });

    // 保存mutations
    this._mutations = options.mutations;

    // 保存actions
    this._actions = options.actions;

    // 绑定this到store实例
    const store = this;
    // this.commit = this.commit.bind(store);
    const { commit, action } = store;
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload);
    };
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload);
    };

    // getters
    // 1. 遍历用户传入getters所有key，动态赋值，其值应该是函数执行结果
    // 2. 确保它是响应式的，Object.defineProperty(this.getters, key, {get() {}})
    // 3. 缓存结果，可以利用computed
    // this.getters.doubleCounter = options.getters.doubleCounter(store.state);
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("please use replaceState to reset state");
  }

  // commit(type, payload): 执行mutation，修改状态
  commit(type, payload) {
    // 根据type获取对应的mutation
    const entry = this._mutations[type];

    if (!entry) {
      console.error("unknown mutation type");
      return;
    }

    return entry(this.state, payload);
  }

  // dispatch(type, payload)
  dispatch(type, payload) {
    // 根据type获取对应的mutation
    const entry = this._actions[type];

    if (!entry) {
      console.error("unknown action type");
      return;
    }

    // 注意这个this的问题
    return entry(this, payload);
  }
}

// 实现插件
function install(Vue) {
  KVue = Vue;

  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 此处导出的
export default { Store, install };
