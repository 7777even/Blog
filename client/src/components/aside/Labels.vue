<template>
  <div class="labels">
    <div class="label" v-for="item in labels" :keys="item.label" @click="itemClick(item.label)">
      <el-tag>{{ item.label }} {{ item.num }} </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "Labels",
  props: {
    labels: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(label) {
      this.$emit('labelInfo', label)
    }
  },
};
</script>

<style scoped>
.labels {
  width: 100%;
}
.label{
  display: inline-block;
  margin: 6px;
  cursor: pointer;
}
</style>