<template>
  <div class="content">
    <el-form ref="form" :model="form">
      <el-form-item label="文章标题:">
        <el-col :span="6">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章标签:">
        <el-checkbox-group v-model="form.label">
          <el-checkbox
            v-for="item in options"
            :label="item.label"
            :key="item.label"
            :style="{ color: '#fff' }"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <mavon-editor
          v-model="form.content"
          :ishljs="true"
          :toolbarsFlag="true"
          :subfield="true"
          defaultOpen="preview"
          codeStyle="tomorrow-night-eighties"
          :tabSize="2"
          @imgAdd="imgAdd"
          class="md"
          ref="md"
        />
      </el-form-item>
    </el-form>
    <div class="btn">
      <button class="submit" @click="submit">
        {{ html ? "修改" : "发布" }}
      </button>
    </div>
  </div>
</template>

<script>
import { sendMd, sendImg, getLabels } from "network/md/mdEdit";
import { change } from "@/network/md/changeMdInfo";
export default {
  name: "EditMarkDown",
  data() {
    return {
      form: {
        title: "",
        label: [],
        content: "",
      },
      html: null,
      options: [],
    };
  },
  created() {
    if (this.$route.query.index) {
      this.html = this.$store.state.text[this.$route.query.index];
      this.form.content = this.html.content;
      this.form.title = this.html.title;
      this.form.label = this.html.label.split(",");
    }

    this.form.user_name = this.$store.state.userInfo.profile.user_name;
    this.form.user_id = this.$store.state.userInfo.profile.user_id;

    this.getLabels({
      user_id: this.form.user_id,
      user_name: this.form.user_name,
    });
  },
  beforeDestroy() {
    this.$bus.$off("updataHome");
  },
  methods: {
    submit() {
      if (this.form.title === "") {
        return this.$message.error("请填写标题");
      } else if (this.form.label.length === 0) {
        return this.$message.error("请选择标签");
      } else if (this.form.content === "") {
        return this.$message.error("内容不允许为空");
      }

      let day = new Date();
      day.setTime(day.getTime());
      let month = day.getMonth() + 1;
      month > 10 ? (month = month) : (month = "0" + month);
      this.form.createTime =
        day.getFullYear() + "-" + month + "-" + day.getDate();

      let oldLabel = this.form.label;
      this.form.label = this.form.label.join(",");

      this.sendMd(this.form);

      this.form.label = oldLabel;

      setTimeout(() => {
        this.$bus.$emit("updataHome");
      }, 500);
    },
    imgAdd(filename, $file) {
      let formdata = new FormData();
      formdata.append("images", $file);
      this.sendImg(formdata, filename);
    },
    sendMd(md) {
      if (this.html) {
        change({
          ...md,
          type: 3,
          id: this.$route.query.index,
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.$router.push({
              path: "/home",
            });
          } else {
            this.$message.error(res.msg);
          }
        });
        return;
      }

      sendMd(md).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg);
        } else {
          this.$message.success(res.msg);
          this.$router.push({
            path: "/home",
          });
        }
      });
    },
    sendImg(formdata, filename) {
      sendImg(formdata).then(res => {
        if (res.code === 200) {
          this.$refs.md.$img2Url(filename, res.url);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getLabels(user) {
      getLabels(user).then(res => {
        if (res !== undefined) {
          this.options = res.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.content {
  padding-top: 20px;
}
.md {
  height: calc(100vh - 120px);
}
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.el-checkbox {
  height: 40px;
  display: flex;
  align-items: center;
}
.btn {
  width: 100%;
  text-align: center;
}
.submit {
  padding: 10px 45px;
  color: #fff;
  background-color: #409eff;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
