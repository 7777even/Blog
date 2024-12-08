<template>
  <div class="body-bgc" v-if="picList.length !== 0">
    <el-carousel indicator-position="none" autoplay height="220px">
      <el-carousel-item v-for="item in picList" :key="item">
        <img :src="item" alt="" @click="itemClick(item)">
      </el-carousel-item>
    </el-carousel>
    <div class="updata">点击更改背景</div>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "BodyBgc",
  data() {
    return {
      picList: []
    }
  },
  created() {
    for (let i = 0; i < 7; i++) {  
      let num = i + 1
      let str = require('assets/img/bgc/'+ num +'.jpg')
      this.picList.push(str)
    }
  },
  methods: {
    itemClick(img){
      $('body').css('background', 'url('+ img + ') no-repeat')
      $('body').css('background-size', '100% 100%')
    }
  },
};
</script>

<style scoped>
.body-bgc {
  width: 100%;
  text-align: center;
  margin: 10px 0;
}
.updata{
  font-size: 18px;
  color: #fff;
}
.body-bgc img{
  width: 100%;
  height: 220px;
  border-radius: 3px;
  cursor: pointer;
}
</style>