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
      title: '高德地图',
      showNavbar: false
    },
    component: () => import('@/views/Amap.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
