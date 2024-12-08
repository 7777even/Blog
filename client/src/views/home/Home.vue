<template>
  <div id="home">
    <nav-bar :userInfo="userInfo" @homeClick="homeClick" />
    <div class="content">
      <el-container>
        <el-aside width="300px">
          <body-bgc />
          <labels :labels="labels" @labelInfo="labelClick" />
        </el-aside>
        <el-main>
          <div class="tip" v-if="text.length === 0">
            您还未有博客，赶快写一写自己的博客吧~
          </div>
          <text-list :textList="text" />
          <back-top />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import NavBar from "components/navbar/NavBar";
import UserInfo from "components/aside/UserInfo";
import BodyBgc from "components/aside/BodyBgc";
import Labels from "components/aside/Labels";
import BackTop from "components/backtop/BackTop";
import TextList from "./components/TextList";
import { getMd, getLabelInfo } from "network/md/getMd";
import { getLabels } from "network/md/mdEdit";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    NavBar,
    TextList,
    UserInfo,
    BackTop,
    BodyBgc,
    Labels,
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem("token")),
      textList: [],
      user: {},
      scroll: 0,
      labels: [],
    };
  },
  mounted() {
    this.user = {
      user_name: this.userInfo.profile.user_name,
      user_id: this.userInfo.profile.user_id,
    };

    this.getMd(this.user);
    this.getLabels(this.user);
  },
  activated() {
    document.body.scrollTo(0, this.scroll);

    this.$bus.$on("updataHome", () => {
      this.getMd(this.user);
      this.getLabels(this.user);
    });

    window.addEventListener("scroll", this.menu, true);
  },
  deactivated() {
    document.body.scrollTo(0, 0);

    window.removeEventListener("scroll", this.menu, true);
  },
  computed: {
    ...mapGetters(["text"]),
  },
  methods: {
    homeClick() {
      this.getMd(this.user);
    },
    labelClick(label) {
      let user = Object.assign({}, this.user);
      user.label = label;
      this.getLabelInfo(user);
    },
    menu() {
      this.scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    },
    getMd(user) {
      getMd(user).then((res) => {
        this.$store.commit("saveText", res.data.user_md);
      });
    },
    getLabels(user) {
      getLabels(user).then((res) => {
        this.labels = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].num > 0) {
            this.labels.push(res.data[i]);
          }
        }

        this.$store.commit("saveLabels", this.labels);
      });
    },
    getLabelInfo(user) {
      getLabelInfo(user).then((res) => {
        this.$store.commit("saveText", res.data);
      });
    },
  },
};
</script>

<style scoped>
.el-aside {
  padding: 50px 0;
}
</style>