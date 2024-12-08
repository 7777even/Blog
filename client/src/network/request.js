import axios from "axios";
import vue from '../main'


export function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 6000
  })
  instance.interceptors.request.use(config => {
    // 发送请求的相关逻辑
    // config:对象  与 axios.defaults 相当
    // 借助config配置token
    let userinfo = window.sessionStorage.getItem('token')
    // 判断token存在再做配置
    if (userinfo) {
      let token = JSON.parse(userinfo).token
      // 注意：token前边有 'Bearer ' 的信息前缀,API接口需求，Bearer后边有空格
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(response => {
    return response.data
  }, err => {
    if (err.response.status === 401) {
      vue.$message.error('登录超时，请重新登录')
      vue.$router.push({
        path: '/login'
      })
      return
    }
  })

  return instance(config)
}

