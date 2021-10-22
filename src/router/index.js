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
        name: 'SystemManagement',
        meta: { title: '系统', icon: 'el-icon-position', affix: false },
        redirect: '/system/admin',
        children: [
          {
            path: '/system/admin',
            name: 'Admin',
            component: () => import('@/views/system/admin/index.vue'),
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
        path: '/good',
        name: 'GoodManagement',
        component: () => import('@/views/good/index.vue'),
        meta: { title: '商品', icon: 'el-icon-position' },
        redirect: '/good/brand',
        children: [
          {
            path: '/good/brand',
            component: () => import('@/views/good/brand/index.vue'),
            name: 'Brand',
            meta: { title: '品牌管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/category',
            component: () => import('@/views/good/category/index.vue'),
            name: 'GoodsCategory',
            meta: { title: '商品分类管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/attribute-category',
            component: () =>
              import('@/views/good/attribute-category/index.vue'),
            name: 'AttributeCategory',
            meta: { title: '商品类型管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/product',
            component: () => import('@/views/good/product/index.vue'),
            name: 'Product',
            meta: { title: '商品管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/add-product',
            component: () => import('@/views/good/add-product/index.vue'),
            name: 'NewProduct',
            meta: { title: '新增商品', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/marketing',
        name: 'Marketing',
        component: () => import('@/views/marketing/index.vue'),
        meta: { title: '营销', icon: 'el-icon-position' },
        redirect: '/marketing/subject',
        children: [
          {
            path: '/marketing/subject',
            component: () => import('@/views/marketing/subject/index.vue'),
            name: 'Subject',
            meta: { title: '专题管理', icon: 'el-icon-position' }
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
