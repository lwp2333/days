import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/user'
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index'),
    redirect: '/user/list',
    children: [
      {
        path: 'list',
        name: 'userList',
        meta: {
          title: '成员列表'
        },
        component: () => import('@/views/user/list')
      },
      {
        path: 'detail',
        name: 'userDetail',
        meta: {
          title: '成员信息',
          showNavbar: true
        },
        component: () => import('@/views/user/detail')
      }
    ]
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
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('@/views/apply/index'),
    redirect: '/apply/list',
    children: [
      {
        path: 'list',
        name: 'applyList',
        meta: {
          title: '可申请列表'
        },
        component: () => import('@/views/apply/applyList')
      },
      {
        path: 'detail',
        name: 'applyDetail',
        meta: {
          title: '已申请详情',
          showNavbar: true
        },
        component: () => import('@/views/apply/applyDetail')
      },
      {
        path: 'result',
        name: 'applyResult',
        meta: {
          title: '申诉结果',
          showNavbar: true
        },
        component: () => import('@/views/apply/applyResult')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  NProgress.done()
})
export default router
