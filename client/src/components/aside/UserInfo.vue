<template>
  <div class="user-info" v-if="Object.keys(userInfo).length !== 0">
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem('token'))
    }
  },
};
</script>

<style scoped>
.user-info {
  width: 100%;
  text-align: center;
  color: #fff;
}
</style>