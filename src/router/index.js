import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Classify = () => import('../views/classify/Classify')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Order = () => import('../views/order/Order')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/classify',
    component: Classify
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
