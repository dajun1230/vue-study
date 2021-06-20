<template>
  <div>
    <label>{{ label }}</label>
    <slot></slot>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "",
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
