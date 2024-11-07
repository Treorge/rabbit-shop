//createRouter创建router实例  createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Category = () => import('@/views/Category/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'category',
          component: Category,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
  ],
})

export default router
