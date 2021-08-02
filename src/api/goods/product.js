/*
 * @Author: 唐云
 * @Date: 2021-08-02 11:17:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 11:17:55
 * 产品
 */
import request from '@/utils/request'

/**
 * 获取产品列表
 * @param {*} data
 * @returns
 */
export function getProduct(data) {
  return request({
    url: '/products/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新产品
 * @param {*} data
 * @returns
 */
export function createOrEditProduct(data) {
  return request({
    url: '/products/update',
    method: 'post',
    data
  })
}

/**
 * 删除产品
 * @param {*} data
 * @returns
 */
export function delProduct(data) {
  return request({
    url: '/products/delete',
    method: 'post',
    data
  })
}
