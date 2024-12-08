<template>
  <div class="List" v-if="textList.length !== 0">
    <div class="item" v-for="(item, index) in textList" :key="index" @click="itemClick(index)">
      <h1 class="title">{{ item.title }}</h1>
      <div class="cont" v-html="getContent(item.content)"></div>
      <div class="info">
        <span class="read"> {{item.read}} 阅读</span>
        <span class="recommend"> 评论</span>
        <span class="good">👍 {{item.good}} 点赞</span>
        <span class="timer">发布于 {{ getTime(item.createTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
import marked from "marked";
export default {
  name: "TextList",
  props: {
    textList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getContent(cont) {
      return marked(cont)
    },
    itemClick(index) {
      this.$router.push({
        path: '/detail',
        query: {
          index
        }
      })
    },
    getTime(time) {
      return formatDate(new Date(time * 1000));
    },
  },
};
</script>

<style scoped>
.list {
  width: 100%;
}
.item {
  width: 100%;
  margin: 30px 0;
  padding: 10px 10px 20px 10px;
  color: #222;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.item .title {
  font-size: 20px;
  padding: 0 10px;
}
.item .cont {
  width: 100%;
  padding: 0 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #444;
  font-size: 18px;
}
.info {
  width: 100%;
  padding: 20px 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6b6e74;
}
.info span {
  cursor: pointer;
}


.item .cont >>> h1,
.item .cont >>> h2,
.item .cont >>> h3,
.item .cont >>> h4,
.item .cont >>> h5,
.item .cont >>> h6,
.item .cont >>> strong,
.item .cont >>> b{
  font-size: 18px!important;
  font-weight: normal!important;
}
</style>