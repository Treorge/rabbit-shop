//createRouter创建router实例  createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayBack = () => import('@/views/Pay/PayBack.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: SubCategory,
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail,
        },
        {
          path: 'cartlist',
          name: 'cartList',
          component: CartList,
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: Checkout,
        },
        {
          path: 'pay',
          name: 'pay',
          component: Pay,
        },
        {
          path: 'paycallback',
          name: 'payCallBack',
          component: PayBack,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
  ],
  //路由滚动行为
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
