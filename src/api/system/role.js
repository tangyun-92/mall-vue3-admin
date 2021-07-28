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

/**
 * 创建/更新角色
 * @param {*} data
 * @returns
 */
export function createOrEditRole(data) {
  return request({
    url: '/roles/update',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param {*} data
 * @returns
 */
export function delRole(data) {
  return request({
    url: '/roles/delete',
    method: 'post',
    data
  })
}

