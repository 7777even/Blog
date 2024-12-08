<template>
  <div class="back-top" title="返回顶部" @click="back"></div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      Interval: null,
    };
  },
  methods: {
    back() {
      let scroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (scroll > 100) {
        this.Interval = setInterval(() => {
          document.body.scrollTop =
            document.documentElement.scrollTop =
            scroll -=
              50;
          if (scroll <= 0) {
            clearInterval(this.Interval);
          }
        }, 5);
      }
    },
  },
};
</script>

<style scoped>
.back-top {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #222;
  color: #fff;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;

  position: fixed;
  bottom: 100px;
  right: 100px;
}
</style>