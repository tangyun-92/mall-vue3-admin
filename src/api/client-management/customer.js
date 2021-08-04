/*
 * @Author: 唐云
 * @Date: 2021-08-04 11:27:50
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-04 11:28:22
 * 客户管理
 */
import request from '@/utils/request'

/**
 * 获取客户列表
 * @param {*} data
 * @returns
 */
export function getCustomer(data) {
  return request({
    url: '/customers/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新客户
 * @param {*} data
 * @returns
 */
export function createOrEditCustomer(data) {
  return request({
    url: '/customers/update',
    method: 'post',
    data
  })
}

/**
 * 删除客户
 * @param {*} data
 * @returns
 */
export function delCustomer(data) {
  return request({
    url: '/customers/delete',
    method: 'post',
    data
  })
}

/**
 * 修改客户密码
 * @param {*} data
 * @returns
 */
export function changePassword(data) {
  return request({
    url: '/customers/password',
    method: 'post',
    data
  })
}
