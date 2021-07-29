/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 14:01:15
 * 员工管理
 */
import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {*} data
 * @returns
 */
export function getEmployee(data) {
  return request({
    url: '/employees/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新员工
 * @param {*} data
 * @returns
 */
export function createOrEditEmployee(data) {
  return request({
    url: '/employees/update',
    method: 'post',
    data
  })
}

