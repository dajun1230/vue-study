<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      require: true,
    },
    rules: Object,
  },
  methods: {
    validate(cb) {
      // 全局校验方法
      // 1.执行内部所有FormItem校验方法，统一处理结果
      // 将FormItem数组转换为Promise数组
      const tasks = this.$children
        .filter((item) => item.prop) // 过滤掉没有传递props的，比如提交按钮
        .map((item) => item.validate());

      // 2.所有任务必须全部成功才算校验通过，任一失败则校验失败
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style></style>
