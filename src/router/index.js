import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * affix -- true表示子路由下顶部的 tags 无法删除
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/system',
    children: [
      {
        path: '/system',
        component: () => import('@/views/system/index.vue'),
        name: 'System',
        meta: { title: '系统管理', icon: 'el-icon-position', affix: false },
        redirect: '/system/user',
        children: [
          {
            path: '/system/user',
            name: 'User',
            component: () => import('@/views/system/user/index.vue'),
            meta: { title: '用户管理', icon: 'el-icon-position' }
          },
          {
            path: '/system/role',
            name: 'Role',
            component: () => import('@/views/system/role/index.vue'),
            meta: { title: '角色管理', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/views/goods/index.vue'),
        meta: { title: '商品管理', icon: 'el-icon-position' },
        redirect: '/goods/category',
        children: [
          {
            path: '/goods/category',
            component: () => import('@/views/goods/category/index.vue'),
            name: 'Category',
            meta: { title: '品类管理', icon: 'el-icon-position' }
          },
          {
            path: '/goods/parameter',
            component: () => import('@/views/goods/parameter/index.vue'),
            name: 'Parameter',
            meta: { title: '参数管理', icon: 'el-icon-position' }
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
