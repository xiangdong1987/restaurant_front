/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/list',
  name: '餐桌管理',
  meta: {
    title: '餐桌管理',
    icon: 'table'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/tables/create'),
      name: '创建餐桌',
      meta: { title: '创建餐桌', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/tables/edit'),
      name: '编辑餐桌',
      meta: { title: '编辑餐桌', noCache: true, activeMenu: '/tables/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/tables/list'),
      name: '餐桌列表',
      meta: { title: '餐桌列表', icon: 'list' }
    }
  ]
}

export default tableRouter
