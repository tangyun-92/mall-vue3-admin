import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function getUser(data) {
  return request({
    url: '/ums/admins/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新用户
 * @param {*} data
 * @returns
 */
export function createOrEditUser(data) {
  return request({
    url: '/ums/admins/update',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 * @param {*} data
 * @returns
 */
export function delUser(data) {
  return request({
    url: '/ums/admins/delete',
    method: 'post',
    data
  })
}

/**
 * 修改用户状态
 * @param {*} data
 * @returns
 */
export function changeStatus(data) {
  return request({
    url: '/ums/admins/changeStatus',
    method: 'post',
    data
  })
}

/**
 * 修改用户密码
 * @param {*} data
 * @returns
 */
export function changePassword(data) {
  return request({
    url: '/ums/admins/password',
    method: 'post',
    data
  })
}
