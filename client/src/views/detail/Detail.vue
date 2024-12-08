<template>
  <div id="detail">
    <nav-bar :userInfo="userInfo" />
    <div class="content">
      <el-container>
        <el-aside width="300px">
          <user-info />
          <body-bgc />
        </el-aside>
        <el-main>
          <h1 class="title">{{ html.title }}</h1>
          <div class="label"><span>标签:</span> {{ html.label }}</div>
          <div class="info">
            <span class="time">{{ getTime(html.createTime) }}</span>
            <span class="read">  {{ html.read }} </span>
            <span class="good"> 👍 {{ html.good }} </span>
            <span class="update" @click="updateClick">修改此博客</span>
            <span class="del" @click="delClick">删除此博客</span>
          </div>
          <show-mark-down :content="content" />
          <div class="btn">
            👍
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              @click.native="btnClick"
            ></el-button>
          </div>
          <div class="comment-info">
            <div class="send-comment">
              <h2>发表你的评论</h2>
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入内容"
                v-model="textarea"
              >
              </el-input>
              <div class="btn-box">
                <el-button type="primary" @click="handleSendComment"
                  >发表</el-button
                >
              </div>
            </div>
            <div class="watch-comment">
              <h2>评论内容</h2>
              <div class="comments">
                <div
                  class="comment-item"
                  v-for="item in comments"
                  :key="item._id"
                >
                  <div class="left">
                    <img
                      :src="item.user.avatar_url"
                      style="width:45px;height:45px;border-radius: 50%;"
                    />
                  </div>
                  <div class="right">
                    <div class="r-username">{{ item.user.user_name }}</div>
                    <div class="r-content">{{ item.content }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavBar from "components/navbar/NavBar";
import UserInfo from "components/aside/UserInfo";
import BodyBgc from "components/aside/BodyBgc";
import ShowMarkDown from "./components/ShowMarkDown";
import { formatDate } from "common/utils";

import { del } from "network/md/delMd";
import { change } from "network/md/changeMdInfo";

import { getComment, addComment } from "@/network/md/comment";

export default {
  name: "Detail",
  components: {
    NavBar,
    UserInfo,
    BodyBgc,
    ShowMarkDown,
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem("token")),
      html: "",
      content: "",
      info: {},
      textarea: "",
      comments: [],
    };
  },
  created() {
    this.html = this.$store.state.text[this.$route.query.index];
    this.content = this.html.content;

    this.info = {
      user_id: this.userInfo.profile.user_id,
      user_name: this.userInfo.profile.user_name,
      title: this.html.title,
    };

    let info = Object.assign({}, this.info);
    info.type = 2;
    this.change(info);
    this.getCommentApi();
  },
  beforeDestroy() {
    this.$bus.$off("updataHome");
  },
  methods: {
    async getCommentApi() {
      try {
        const res = await getComment({
          user_id: this.userInfo.profile.user_id,
          md_id: this.html.id,
        });
        if (res.code !== 200) {
          this.$message.error("error");
          return;
        }
        this.comments = res.list;
      } catch (err) {
        console.error(err);
        this.$message.error(err.message);
      }
    },

    async addCommentApi() {
      try {
        const res = await addComment({
          user_id: this.userInfo.profile.user_id,
          md_id: this.html.id,
          content: this.textarea,
        });
        if (res.code !== 200) {
          this.$message.error("error");
          return;
        }
        this.textarea = "";
        this.getCommentApi();
      } catch (err) {
        console.error(err);
        this.$message.error(err.message);
      }
    },
    handleSendComment() {
      if (!this.textarea) {
        this.$message.error("内容不允许为空");
        return;
      }
      this.addCommentApi();
    },
    btnClick() {
      let info = Object.assign({}, this.info);
      info.type = 1;

      this.change(info);
    },
    delClick() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /123456/,
        inputErrorMessage: "密码不正确",
      })
        .then(({ value }) => {
          this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.del(this.info);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getTime(time) {
      return formatDate(new Date(time * 1000));
    },
    del(info) {
      del(info).then(res => {
        if (res.code !== 200) {
          console.log(res.msg);
          this.$message.error("删除错误，请稍后再试");
        } else {
          this.$bus.$emit("updataHome");
          this.$router.push({
            path: "/home",
          });
        }
      });
    },
    change(info) {
      change(info).then(res => {
        if (info.type === 1) {
          if (res.code !== 200) {
            return this.$message.error("服务器开了点小差，点赞未成功");
          } else {
            this.$message.success("点赞成功");
            this.html.good = this.html.good + 1;
          }
        } else if (info.type === 2) {
          this.html.read = this.html.read + 1;
        }

        this.$bus.$emit("updataHome");
      });
    },
    updateClick() {
      this.$router.push({
        path: "/write?index=" + this.$route.query.index,
      });
    },
  },
};
</script>

<style scoped>
#detail {
  color: #fff;
}
.el-aside {
  padding: 50px 0;
}
.info {
  margin: 20px 0;
}
.del,
.update {
  cursor: pointer;
  color: red;
  margin: 0 10px;
}
.update {
  color: yellow;
}
.btn {
  margin: 15px 0;
  text-align: right;
  cursor: pointer;
}
.btn-box {
  margin: 10px 0;
  text-align: right;
}
.comments {
  margin: 10px 0;
}
.comment-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.left {
  margin-right: 10px;
}
.right .r-username {
  font-size: 20px;
}
.right .r-content {
  color: #f2f2f2;
}
</style>
