const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  // vue项目中net::ERR_CONNECTION_TIMED_OUT错误,地址改为自己ip地址就可以了
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  }
}
