import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function fetchSubOrder(id, query) {
  return request({
    url: '/order/subList?order_id=' + id,
    method: 'get',
    params: query
  })
}

