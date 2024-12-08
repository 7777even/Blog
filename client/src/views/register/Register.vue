<template>
  <div id="register">
    <div class="form">
      <div class="explain">欢迎注册</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-width="80px"
        class="ruleForm"
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
        <el-form-item label="手机" prop="phone">
          <el-input
            type="cellphone"
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            type="number"
            v-model="ruleForm.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" class="sex">
          <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" class="bir">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="success" @click="btnRegister">注册</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRegister } from "network/user/register";
import { getLogin } from "network/user/login";
import RSA from "common/rsa";
import { formatDate } from "common/utils";
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        age: "",
        birthday: "",
        phone: "",
        sex: "",
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
            min: 8,
            max: 18,
            message: "长度在 8 到 18 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
      },
    };
  },
  methods: {
    btnRegister() {
      let val = "";
      let re =
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      if (this.ruleForm.name === "") {
        val = "用户名不允许空";
      } else if (this.ruleForm.password === "") {
        val = "密码不允许为空";
      } else if (this.ruleForm.phone === "") {
        val = "手机号码不允许为空";
      } else if (this.ruleForm.age === "") {
        val = "年龄不允许为空";
      } else if (this.ruleForm.sex === "") {
        val = "请选择性别";
      } else if (this.ruleForm.birthday === "") {
        val = "请选择出生日期";
      }

      if (val !== "") {
        this.$message({
          showClose: true,
          message: val,
          type: "error",
        });
      } else if (
        val === "" &&
        this.ruleForm.phone !== "" &&
        !re.test(this.ruleForm.phone)
      ) {
        this.$message({
          showClose: true,
          message: "手机格式不正确",
          type: "error",
        });
      } else {
        let user = Object.assign({}, this.ruleForm);

        user.password = RSA.encrypt(user.password);
        user.phone = RSA.encrypt(user.phone);
        user.birthday = formatDate(user.birthday);

        this.getRegister(user);
      }
    },
    getRegister(user) {
      getRegister(user).then((res) => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        } else {
          let login = { name: user.name, password: user.password };
          this.getLogin(login);
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        }
      });
    },

    getLogin(user) {
      getLogin(user).then((res) => {
        this.$store.commit("saveUserInfo", res);
        this.$router.push({
          path: "/home",
        });
      });
    },
  },
};
</script>

<style scoped>
.sex {
  text-align: left;
}
.bir {
  text-align: left;
}
</style>