<template>
  <div id="app">
    <keep-alive exclude="Write,User,Photo,Detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // //在页面加载时读取localStorage里的状态信息
    // localStorage.getItem("userMsg") &&
    //   this.$store.replaceState(
    //     Object.assign(
    //       this.$store.state,
    //       JSON.parse(localStorage.getItem("userMsg"))
    //     )
    //   );
    // //在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener("beforeunload", () => {
    //   localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    // });
  },
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function (e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  },
};
</script>

<style>
@import url("~assets/css/base.css");
#app {
  width: 100%;
  height: 100%;
}
</style>
