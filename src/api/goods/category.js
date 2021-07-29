/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 16:52:59
 * 品类管理
 */
import request from '@/utils/request'

/**
 * 获取品类列表
 * @param {*} data
 * @returns
 */
export function getCategory(data) {
  return request({
    url: '/categorys/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新品类
 * @param {*} data
 * @returns
 */
export function createOrEditCategory(data) {
  return request({
    url: '/categorys/update',
    method: 'post',
    data
  })
}

/**
 * 删除品类
 * @param {*} data
 * @returns
 */
export function delCategory(data) {
  return request({
    url: '/categorys/delete',
    method: 'post',
    data
  })
}
