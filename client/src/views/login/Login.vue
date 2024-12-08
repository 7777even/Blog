<template>
  <div id="login">
    <div class="form">
      <div class="explain">请登录</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-width="80px"
        class="ruleForm"
        ref="ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="success" @click="btnLogin">登录</el-button>
      </el-row>
      <div class="register" @click="btnRegister">还没有账号?点击去注册</div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "network/user/login";
import RSA from "common/rsa";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    btnRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    btnLogin() {
      if (this.ruleForm.name === "") {
        this.$message({
          showClose: true,
          message: "请输入用户名",
          type: "error",
        });
      } else if (this.ruleForm.password === "") {
        this.$message({
          showClose: true,
          message: "请输入密码",
          type: "error",
        });
      } else {
        let user = Object.assign({}, this.ruleForm);
        user.password = RSA.encrypt(user.password);
        this.getLogin(this.ruleForm);
      }
    },
    getLogin(user) {
      getLogin(user).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
          this.$refs.ruleForm.resetFields();
        } else {
          this.$store.commit("saveUserInfo", res);
          this.$router.push({
            path: "/home",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
  width: 100%;
  color: deepskyblue;
  cursor: pointer;
}
</style>
