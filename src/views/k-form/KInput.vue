<template>
  <div>
    <input :value="value" :type="type" @input="onInputChange" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
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
    },
  },
};
</script>

<style></style>
