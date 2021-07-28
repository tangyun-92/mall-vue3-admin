import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} data
 * @returns
 */
export function getRole(data) {
  return request({
    url: '/roles/list',
    method: 'post',
    data
  })
}
