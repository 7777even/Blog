import Vue from 'vue'
import VueRouter from 'vue-router'



const Login = () => import('views/login/Login')
const Register = () => import('views/register/Register')
const Home = () => import('views/home/Home')
const User = () => import('views/user/User')
const Write = () => import('views/write/Write')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

// 解决项目中重复点击相同路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/write',
    component: Write
  },
  {
    path: '/detail',
    component: Detail,
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.path === '/register') return next()

//   let token = window.sessionStorage.getItem('token')
//   if (token) {
//     return next()
//   }
//   return next('/login')
// })



export default router
