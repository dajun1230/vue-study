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
import create from "../../utils/create";
import Notice from "@/components/Notice.vue";

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
      this.$refs["ruleForm"].validate((isValid) => {
        // 创建notice实例
        create(Notice, {
          title: "村长喊你来搬砖",
          message: isValid ? "请求登陆" : "校验失败",
          duration: 3000,
        }).show();
        // if (isValid) {
        //   // alert("验证通过!");
        // } else {
        //   // alert("校验失败!");
        // }
      });
    },
  },
};
</script>

<style></style>
