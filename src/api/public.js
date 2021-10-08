import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ums/admins/login',
    method: 'post',
    data
  })
}
