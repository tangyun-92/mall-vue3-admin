/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by:   唐云
 * @Last Modified time: 2021-07-29 11:10:10
 * 部门管理
 */
import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} data
 * @returns
 */
export function getDepartment(data) {
  return request({
    url: '/departments/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新角色
 * @param {*} data
 * @returns
 */
export function createOrEditDepartment(data) {
  return request({
    url: '/departments/update',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param {*} data
 * @returns
 */
export function delDepartment(data) {
  return request({
    url: '/departments/delete',
    method: 'post',
    data
  })
}
