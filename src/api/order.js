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

export function fetchKitchenOrder(status, query) {
  return request({
    url: '/order/kitchenList?status=' + status,
    method: 'get',
    params: query
  })
}

export function makeOrder(data) {
  return request({
    url: '/order/makeOrder',
    method: 'post',
    data
  })
}

export function delSubOrder(id) {
  return request({
    url: '/order/delSubOrder',
    method: 'post',
    params: {id: id}
  })
}

export function makingDone(id) {
  return request({
    url: '/order/makingDone',
    method: 'post',
    params: {id: id}
  })
}

export function orderDone(id){
  return request({
    url: '/order/orderDone',
    method: 'post',
    params: {id: id}
  })
}
