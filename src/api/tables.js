import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/tables/index',
    method: 'get',
    params: query
  })
}

export function fetchTable(id) {
  return request({
    url: '/tables/'+id,
    method: 'get',
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function addTable(data) {
  return request({
    url: '/tables/createTable',
    method: 'post',
    data
  })
}

export function updateTable(data) {
  return request({
    url: '/tables/updateTable',
    method: 'post',
    data
  })
}
