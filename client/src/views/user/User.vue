<template>
  <div id="user" v-if="Object.keys(userInfo).length !== 0">
    <nav-bar :userInfo="userInfo" />
    <div class="content">
      <el-container>
        <el-main>
          <div class="top">
            <div class="pic" @mouseover="picOpen">
              <img :src="userInfo.profile.avatar_url" alt="" />
              <div
                class="mask"
                v-show="isShow"
                @mouseout="picOver"
                @click="openChangePic"
              >
                
              </div>
            </div>
            <span class="user-name">{{ userInfo.profile.user_name }}</span>
            <span class="create-time"> 注册时间 :  {{ createTime }}</span>
            <span class="desc" :title="this.userInfo.profile.user_desc">
              {{ this.userInfo.profile.user_desc }}
            </span>
          </div>
          <div class="middle">
            <el-table
              class="el-table"
              :data="tableData"
              style="width: 100%"
              :header-cell-style="getRowClass"
            >
              <el-table-column label="基本信息" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-user"></i>
                  <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
              </el-table-column>
              <el-table-column width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.info }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag
                        size="medium"
                        v-if="currentIndex !== scope.$index"
                        >{{ scope.row.info }}</el-tag
                      >
                      <input
                        :type="iptType(scope.$index)"
                        ref="ipt"
                        v-model="scope.row.info"
                        @blur="iptBlur(scope.$index)"
                        class="ipt"
                        maxlength="200"
                        v-else-if="currentIndex !== 4 && currentIndex !== -1"
                      />
                      <div
                        tabindex="1"
                        outline="0"
                        hidefocus="true"
                        ref="ipt"
                        v-else-if="currentIndex === 4 && currentIndex !== -1"
                        @blur="iptBlur(scope.$index)"
                        class="radio-sex"
                      >
                        <el-radio v-model="scope.row.info" label="男"
                          >男</el-radio
                        >
                        <el-radio v-model="scope.row.info" label="女"
                          >女</el-radio
                        >
                      </div>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-if="scope.$index > 1"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavBar from "components/navbar/NavBar";
import Upload from "components/upload/Upload";
import PhotoWall from "./components/PhotoWall";
import { formatDate } from "common/utils";
import { changeUser } from "network/user/changeUser";
import { getPhoto } from "network/user/photowall";
export default {
  name: "User",
  components: {
    NavBar,
    Upload,
    PhotoWall,
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem("token")),
      createTime: "",
      tableData: [],
      currentIndex: -1,
      timer: null,
      flag: true,
      isShow: false,
      isShowChangePic: false,
      photowall: {},
    };
  },
  created() {
    this.getPhoto();
  },
  mounted() {
    this.createTime = formatDate(new Date(this.userInfo.profile.createTime));
    if (this.userInfo.profile.user_birthday.indexOf("-") === -1) {
      this.userInfo.profile.user_birthday = formatDate(
        new Date(this.userInfo.profile.user_birthday * 1000)
      );
    }

    this.tableData.push({
      type: "姓名",
      info: this.userInfo.profile.user_name,
      key: "user_name",
    });
    this.tableData.push({
      type: "用户ID",
      info: this.userInfo.profile.user_id,
      key: "user_id",
    });
    this.tableData.push({
      type: "年龄",
      info: this.userInfo.profile.user_age,
      key: "user_age",
    });
    this.tableData.push({
      type: "出生日期",
      info: this.userInfo.profile.user_birthday,
      key: "user_birthday",
    });
    this.tableData.push({
      type: "性别",
      info: this.userInfo.profile.user_sex,
      key: "user_sex",
    });
    this.tableData.push({
      type: "个人简介",
      info: this.userInfo.profile.user_desc,
      key: "user_desc",
    });
  },
  beforeDestroy() {
    this.timer = null;
  },
  methods: {
    successChange(file) {
      let suffix = file.name.replace(/[^.]+/, ""); // 拿到文件后缀名
      this.userInfo.profile.avatar_url =
        "http://127.0.0.1:5000/public/img/user/" +
        this.userInfo.profile.user_name +
        suffix;
      this.$store.commit("saveUserInfo", this.userInfo);
      this.isShowChangePic = false;
    },
    closeChangePic() {
      this.isShowChangePic = false;
    },
    openChangePic() {
      this.isShowChangePic = true;
    },
    picOver() {
      this.isShow = false;
    },
    picOpen() {
      this.isShow = true;
    },
    getRowClass() {
      return "opacity: 0.6";
    },
    handleEdit(index, row) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /123456/,
        inputErrorMessage: "密码不正确",
      })
        .then(({ value }) => {
          if (this.flag) {
            this.currentIndex = index;
            this.timer = setTimeout(() => {
              this.$refs.ipt.focus();
            }, 500);
            this.flag = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    iptBlur(index) {
      let obj = {};
      this.timer = setTimeout(() => {
        if (
          this.tableData[index].info !==
          this.userInfo.profile[this.tableData[index].key]
        ) {
          if (this.tableData[index].info === "") {
            this.tableData[index].info = " ";
          }
          this.tableData.forEach(val => {
            let key = val.key.replace("user_", "");
            obj[key] = val.info;
          });
          this.changeUser(obj);
          this.currentIndex = -1;

          this.userInfo.profile[this.tableData[index].key] = this.tableData[
            index
          ].info;

          this.$store.commit("saveUserInfo", this.userInfo);
        } else {
          this.currentIndex = -1;
        }
        this.flag = true;
      }, 450);
    },
    iptType(index) {
      if (index === 2) {
        return "number";
      } else if (index === 3) {
        return "date";
      } else {
        return "text";
      }
    },
    changeUser(user) {
      changeUser(user).then(res => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    getPhoto() {
      getPhoto().then(res => {
        if (res !== undefined) {
          this.photowall = res;
          this.$store.commit("savePhoto", res.data);
        }
      });
    },
  },
};
</script>

<style scoped>
#user {
  width: 100%;
  height: 100%;
}

.top {
  width: 100%;
  height: 160px;
  background-color: transparent;
  box-shadow: 0 3px 10px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: left;
  padding: 0 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #fff;
}
.pic {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}
.pic:hover img {
  transform: scale(1.2);
}
.pic img {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  line-height: 90px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.user-name {
  font-size: 24px;
  color: #fff;
  margin: 0 20px;
}
.create-time {
  font-size: 14px;
  color: #fff;
}
.middle {
  margin: 50px 0;
  border-radius: 10px;
  overflow: hidden;
}
/* 
1.重写样式要加（>>>或者/deep/），不然不会生效
2.th ，tr都有背景颜色，都要重写，
*/

.middle /deep/ .el-table,
.el-table__expanded-cell {
  color: #222 !important;
  background-color: transparent !important;
}

.middle /deep/ .el-table tr {
  color: #222 !important;
  background-color: transparent !important;
}
.middle /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent !important;
  color: #fff !important;
}
.ipt {
  padding: 5px;
}
.desc {
  color: #fff;
  font-size: 22px;
  margin: 0 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
