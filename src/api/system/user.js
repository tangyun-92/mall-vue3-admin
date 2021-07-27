import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} data
 * @returns
 */
export function getUser(data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}

/**
 * 新增用户
 * @param {*} data
 * @returns
 */
export function createUser(data) {
  return request({
    url: '/users/:id',
    method: 'post',
    data
  })
}

/**
 * 更新用户
 * @param {*} data
 * @returns
 */
export function updateUser(data) {
  return request({
    url: '/users/:id',
    method: 'patch',
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
    url: '/users/:id',
    method: 'delete',
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
    url: '/users/:id/status',
    method: 'patch',
    data
  })
}
