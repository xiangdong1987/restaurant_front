import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dishes/list',
    method: 'get',
    params: query
  })
}

export function fetchItem(id) {
  return request({
    url: '/dishes/'+id,
    method: 'get',
  })
}

export function addItem(data) {
  return request({
    url: '/dishes/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/dishes/update',
    method: 'post',
    data
  })
}
