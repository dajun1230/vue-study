<template>
  <div>
    <k-form :model="model" :rules="rules" ref="ruleForm">
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
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // alert("验证通过!");
        } else {
          // alert("校验失败!");
        }
      });
    },
  },
};
</script>

<style></style>
