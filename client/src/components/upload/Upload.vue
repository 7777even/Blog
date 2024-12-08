<template>
  <div class="upload">
    <div class="model-mask"></div>
    <div class="model">
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:5000/api/changeAvatar"
        :data="uploadData"
        :headers="header"
        :show-file-list="false"
        :on-success="getAvatarSuccess" 
        :before-upload="beforeAvatarUpload"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div class="close" @click="closeClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      // 上传的参数
      uploadData: {
        user_name: this.$store.state.userInfo.profile.user_name
      },
      header: {}
    };
  },
  created() {
    this.header['Authorization'] = 'Bearer ' + this.$store.state.userInfo.token
  },
  methods: {
    closeClick() {
      this.$emit('closeChangePic')
    },
    // 上传成功回调
    getAvatarSuccess(res, file) {
      // res是响应数据   file是文件信息
      if(res.code !== 200) {
        this.$message.error(res.msg)
      } else {
        this.$message.success(res.msg)
        this.$emit('successChange', file)
      }
    },
    // 上传前调用的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //返回 true 时进行请求上传
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.model-mask {
  width: 100%;
  height: 100%;
  background-color: #222;
  opacity: 0.5;
}
.model {
  width: 350px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.close{
  position: absolute;
  top: 15px;
  right: 20px;
  color: #222;
  font-size: 18px;
  cursor: pointer;
}
</style>