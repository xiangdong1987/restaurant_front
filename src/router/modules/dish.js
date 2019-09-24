/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dishRouter = {
  path: '/dish',
  component: Layout,
  redirect: '/dish/list',
  name: '菜单管理',
  meta: {
    title: '菜单管理',
    icon: 'list'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/dish/create'),
      name: '创建菜品',
      meta: { title: '创建菜品', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/dish/edit'),
      name: '编辑菜品',
      meta: { title: '编辑菜品', noCache: true, activeMenu: '/dish/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/dish/list'),
      name: '菜品列表',
      meta: { title: '菜品列表', icon: 'list' }
    }
  ]
}

export default dishRouter
