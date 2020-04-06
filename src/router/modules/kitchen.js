/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const kitchenRouter = {
  path: '/kitchen',
  component: Layout,
  redirect: '/kitchen/index',
  name: '后厨管理',
  meta: {
    title: '后厨管理',
    icon: 'kitchen'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/order/making'),
      name: '待出餐',
      meta: { title: '待出餐', icon: 'food' }
    },
    {
      path: 'offer',
      component: () => import('@/views/order/made'),
      name: '已出餐',
      meta: { title: '已出餐', icon: 'dish' }
    }
  ]
}
export default kitchenRouter
