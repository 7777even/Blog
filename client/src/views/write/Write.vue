<template>
  <div class="write">
    <nav-bar :userInfo="userInfo" />
    <edit-mark-down/>
  </div>
</template>

<script>
import NavBar from "components/navbar/NavBar";
import EditMarkDown from "./components/EditMarkDown"
export default {
  name: "Write",
  components: {
    NavBar,
    EditMarkDown  
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem("token")),
    };
  },
};
</script>

<style scoped>
</style>