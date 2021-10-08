import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} data
 * @returns
 */
export function getRole(data) {
  return request({
    url: '/ums/roles/list',
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
    url: '/ums/roles/update',
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
    url: '/ums/roles/delete',
    method: 'post',
    data
  })
}

/**
 * 更改状态
 * @param {*} data
 * @returns
 */
export function changeStatus(data) {
  return request({
    url: '/ums/roles/changeStatus',
    method: 'post',
    data
  })
}
