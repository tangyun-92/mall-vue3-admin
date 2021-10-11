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
          // {
          //   path: '/good/category',
          //   component: () =>
          //     import('@/views/good/category/index.vue'),
          //   name: 'Category',
          //   meta: { title: '品类管理', icon: 'el-icon-position' }
          // },
          // {
          //   path: '/good/parameter',
          //   component: () => import('@/views/good/parameter/index.vue'),
          //   name: 'Parameter',
          //   meta: { title: '参数管理', icon: 'el-icon-position' }
          // },
          {
            path: '/good/category',
            component: () => import('@/views/good/category/index.vue'),
            name: 'GoodsCategory',
            meta: { title: '商品分类管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/attribute-category',
            component: () => import('@/views/good/attribute-category/index.vue'),
            name: 'AttributeCategory',
            meta: { title: '商品类型管理', icon: 'el-icon-position' }
          },
          {
            path: '/good/goods',
            component: () => import('@/views/good/goods/index.vue'),
            name: 'Goods',
            meta: { title: '商品管理', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/after-sale-management',
        name: 'AfterSaleManagement',
        component: () => import('@/views/after-sale-management/index.vue'),
        meta: { title: '订单与售后管理', icon: 'el-icon-position' },
        redirect: '/after-sale-management/order',
        children: [
          {
            path: '/after-sale-management/order',
            component: () =>
              import('@/views/after-sale-management/order/index.vue'),
            name: 'Order',
            meta: { title: '订单管理', icon: 'el-icon-position' }
          },
          {
            path: '/after-sale-management/expressage',
            component: () =>
              import('@/views/after-sale-management/expressage/index.vue'),
            name: 'Expressage',
            meta: { title: '快递管理', icon: 'el-icon-position' }
          },
          {
            path: '/after-sale-management/sales-return',
            component: () =>
              import('@/views/after-sale-management/sales-return/index.vue'),
            name: 'SalesReturn',
            meta: { title: '退货管理', icon: 'el-icon-position' }
          },
          {
            path: '/after-sale-management/evaluate',
            component: () =>
              import('@/views/after-sale-management/evaluate/index.vue'),
            name: 'Evaluate',
            meta: { title: '评价管理', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/employee-management',
        name: 'EmployeeManagement',
        component: () => import('@/views/employee-management/index.vue'),
        meta: { title: '员工管理', icon: 'el-icon-position' },
        redirect: '/employee-management/department',
        children: [
          {
            path: '/employee-management/department',
            component: () =>
              import('@/views/employee-management/department/index.vue'),
            name: 'Department',
            meta: { title: '部门管理', icon: 'el-icon-position' }
          },
          {
            path: '/employee-management/job',
            component: () =>
              import('@/views/employee-management/job/index.vue'),
            name: 'Job',
            meta: { title: '职位管理', icon: 'el-icon-position' }
          },
          {
            path: '/employee-management/employee',
            component: () =>
              import('@/views/employee-management/employee/index.vue'),
            name: 'Employee',
            meta: { title: '员工管理', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/client-management',
        name: 'ClientManagement',
        component: () => import('@/views/client-management/index.vue'),
        meta: { title: '客户管理', icon: 'el-icon-position' },
        redirect: '/client-management/member',
        children: [
          {
            path: '/client-management/member',
            component: () =>
              import('@/views/client-management/member/index.vue'),
            name: 'Member',
            meta: { title: '会员等级管理', icon: 'el-icon-position' }
          },
          {
            path: '/client-management/customer',
            component: () =>
              import('@/views/client-management/customer/index.vue'),
            name: 'Customer',
            meta: { title: '客户管理', icon: 'el-icon-position' }
          }
        ]
      },
      {
        path: '/invoice-management',
        name: 'InvoiceManagement',
        component: () => import('@/views/invoice-management/index.vue'),
        meta: { title: '进销存管理', icon: 'el-icon-position' },
        redirect: '/invoice-management/warehouse',
        children: [
          {
            path: '/invoice-management/warehouse',
            component: () =>
              import('@/views/invoice-management/warehouse/index.vue'),
            name: 'Warehouse',
            meta: { title: '仓库管理', icon: 'el-icon-position' }
          },
          {
            path: '/invoice-management/retail',
            component: () =>
              import('@/views/invoice-management/retail/index.vue'),
            name: 'Retail',
            meta: { title: '零售店管理', icon: 'el-icon-position' }
          },
          {
            path: '/invoice-management/supplier',
            component: () =>
              import('@/views/invoice-management/supplier/index.vue'),
            name: 'Supplier',
            meta: { title: '供货商管理', icon: 'el-icon-position' }
          },
          {
            path: '/invoice-management/purchase',
            component: () =>
              import('@/views/invoice-management/purchase/index.vue'),
            name: 'Purchase',
            meta: { title: '采购管理', icon: 'el-icon-position' }
          },
          {
            path: '/invoice-management/in-storage',
            component: () =>
              import('@/views/invoice-management/in-storage/index.vue'),
            name: 'InStorage',
            meta: { title: '入库信息管理', icon: 'el-icon-position' }
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
