/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 15:56:00
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
    url: '/specGroups/list',
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
    url: '/specGroups/update',
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
    url: '/specGroups/delete',
    method: 'post',
    data
  })
}

/**
 * 获取品类参数列表
 * @param {*} data
 * @returns
 */
export function getCategoryParam(data) {
  return request({
    url: '/specGroups/findParam',
    method: 'post',
    data
  })
}

/**
 * 创建/更新品类
 * @param {*} data
 * @returns
 */
export function createOrEditCategoryParam(data) {
  return request({
    url: '/specGroups/updateParam',
    method: 'post',
    data
  })
}

/**
 * 删除品类
 * @param {*} data
 * @returns
 */
export function delCategoryParam(data) {
  return request({
    url: '/specGroups/deleteParam',
    method: 'post',
    data
  })
}
