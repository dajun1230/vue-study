<template>
  <div>
    <k-form>
      <k-form-item label="用户名" prop="username">
        <k-form-input v-model="model.username"></k-form-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-form-input type="password" v-model="model.password"></k-form-input>
      </k-form-item>
      <k-form-item>
        <button @click="onSubmit">提交</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KForm from "./KForm.vue";
import KFormItem from "./KFormItem.vue";
import KFormInput from "./KInput.vue";

export default {
  components: {
    KForm,
    KFormItem,
    KFormInput,
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.model);
    },
  },
};
</script>

<style></style>
