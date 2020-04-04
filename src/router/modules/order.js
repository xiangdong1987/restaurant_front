/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/menu',
  name: '订单管理',
  meta: {
    title: '订单管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/order/menu'),
      name: '菜单',
      meta: { title: '菜单', icon: 'edit' }
    },
    {
      path: 'cart',
      component: () => import('@/views/order/cart'),
      name: '购物车',
      meta: { title: '购物车', icon: 'shopping', badge: 1 }
    },
    {
      path: 'list',
      component: () => import('@/views/order/list'),
      name: '订单列表',
      meta: { title: '订单列表', icon: 'list' }
    },
    {
      path: 'detail/:id(\\d+)',
      component: () => import('@/views/order/detail'),
      hidden: true
    }
  ]
}
export default orderRouter
