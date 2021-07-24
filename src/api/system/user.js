import request from '@/utils/request'

export function getUser(data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
