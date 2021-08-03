// 广播：自上而下派发事件
function broadcast(componentName, eventName, params) {
  // 遍历所有子元素，如果子元素componentName和传入的相同则派发事件
  this.$children.forEach((child) => {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
  // 该函数没有主动停止的逻辑判断，因此会造成一定的性能损失，使用的时候稍稍注意
}

export default {
  methods: {
    // 派发：冒泡查找componentName相同的组件并派发事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      // 向上查找直到找到相同名称的组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      // 如果找到就派发事件
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
