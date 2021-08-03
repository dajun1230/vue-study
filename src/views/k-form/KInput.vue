<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <!-- :value, @input -->
    <input :value="value" :type="type" @input="onInputChange" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInputChange(e) {
      this.$emit("input", e.target.value);

      // 触发校验
      // this.$parent.$emit("validate");
      this.dispatch("KFormItem", "validate");
    },
  },
};
</script>

<style></style>
