<template>
  <div class="nav-bar" v-if="Object.keys(userInfo).length !== 0">
    <div class="content">
      <el-menu
        class="el-menu"
        mode="horizontal"
        default-active="0"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item
          index="0"
          @click="homeClick"
          :style="{ backgroundColor: bgc }"
          >首页</el-menu-item
        >
        <el-dropdown class="user">
          <span class="el-dropdown-link">
            <img :src="userInfo.profile.avatar_url" alt="" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown">
            <el-dropdown-item @click.native="usercir"
              > 个人中心</el-dropdown-item
            >
            <el-dropdown-item @click.native="write"
              > 创作中心</el-dropdown-item
            >
            <el-dropdown-item @click.native="loginout"> 退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      bgc: "transparent",
    };
  },
  methods: {
    homeClick() {
      this.$router.push({
        path: "/home",
      });

      this.$emit("homeClick");
    },
    loginout() {
      window.sessionStorage.removeItem("token");
      this.$router.replace({ path: "/login" });
      location.reload();
    },
    usercir() {
      this.$router.push({
        path: "/user",
      });
    },
    write() {
      this.$router.push({
        path: "/write",
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  height: 61px;
  border-bottom: 1px solid #fff;
}
.el-menu {
  height: 100% !important;
  padding: 0 40px;
  background-color: transparent;
}
.el-menu-item {
  color: #fff;
}
.el-menu-item:hover {
  background-color: transparent !important;
}
.user {
  position: absolute;
  right: 40px;
  padding: 5px 0;
  cursor: pointer;
}
.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.dropdown {
  z-index: 999;
}
</style>