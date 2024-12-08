<template>
  <div class="photo-wall" v-if="Object.keys(photowall).length !== 0">
    <el-carousel indicator-position="outside" height="220px">
      <el-carousel-item v-for="(item, index) in photowall.data" :key="index">
        <img :src="item" alt="" class="photo" @click="photoClick(index)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "PhotoWall",
  props: {
    photowall: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    photoClick(index) {
      this.$router.push({
        path: '/photo',
        query: {
          index
        }
      })
    }
  }
};
</script>

<style scoped>
.photo-wall {
  width: 100%;
  height: 220px;
  border-radius: 5px;
  overflow: hidden;
}
.photo{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>