import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/amap',
    name: 'Amap',
    meta: {
      title: '高德地图'
    },
    component: () => import('@/views/Amap')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/blog/index'),
    redirect: '/blog/list',
    children: [
      {
        path: 'list',
        name: 'blogList',
        meta: {
          title: '博客列表'
        },
        component: () => import('@/views/blog/list')
      },
      {
        path: 'detail',
        name: 'blogDetail',
        meta: {
          title: '博客详情',
          showNavbar: true
        },
        component: () => import('@/views/blog/detail')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
