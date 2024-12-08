### 问题：Chrome 提醒：[Violation] Added non-passive event listener to a scroll-blocking ‘mousewheel’ event. Consider marking event handler as ‘passive’ to make the page more responsive.
  --Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners。
    Passive Event Listeners：就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性passive的值为true的时候，代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，Chrome浏览器称这类型的监听器为被动（passive）监听器。目前Chrome主要利用该特性来优化页面的滑动性能，所以Passive Event Listeners特性当前仅支持mousewheel/touch相关事件。
  --解决方法：
    1、npm i default-passive-events -S
    2、main.js中加入：import 'default-passive-events'

### 可以通过给div添加tabindex属性，从而实现blur事件
  -- //设置了tabindex后，元素默认加虚线，通过ouline=0进行去除(IE设置hidefocus="true")
  --  <div tabindex="0" outline=0" hidefocus="true"></div>

### vue项目中net::ERR_CONNECTION_TIMED_OUT错误
  -- 出错的原因可能是network地址与本机ip地址不一致
      Network: http://192.168.13.30:8080/
      处理方法:
      在vue项目中新建一个vue.config.js文件
      配置上:
          module.exports = {
            devServer: {
              host: '0.0.0.0',
              port: 8080,
            }
          }
      这样重启项目,地址改为自己ip地址就可以了
### 后端使用axios加上cookie
-- axios.defaults.withCredentials = true
-- headers: {cookie: ''}

### 新添加的dom或v-html添加的虚拟dom，在实际意义上是一个子组件，vue中当我们给style设置了 scoped,该样式就只针对当前组件生效，样式不会渗透到子组件。
-- 解决办法：
      1.把样式写在公共全局css中。
      2.使用深度选择器 >>> 或 /deep/。注意：>>>只在css中生效，Less\Sass中不生效。语法：
        css:
            .parent  >>> .child{  } 或者 .parent  /deep/ .child{  }

        less/sass:
            .parent{
                 /deep/  .child{}
            }
### 绑定在window上 addEventListener 事件需要 第三个参数设置为true，不然事件不起作用
### window.removeEventListener('scroll', this.handleScroll,true);   //  离开页面清除（移除）滚轮滚动事件



