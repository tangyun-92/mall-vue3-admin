/*
 * @Author: 唐云
 * @Date: 2021-10-09 15:21:11
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 15:57:12
 * 商品属性管理
 */

import request from '@/utils/request'

/**
 * 获取商品属性列表
 * @param {*} data
 * @returns
 */
export function getGoodsAttribute(data) {
  return request({
    url: '/pms/product-attribute/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新商品属性
 * @param {*} data
 * @returns
 */
export function createOrEditAttribute(data) {
  return request({
    url: '/pms/product-attribute/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品属性
 * @param {*} data
 * @returns
 */
export function delGoodsAttribute(data) {
  return request({
    url: '/pms/product-attribute/delete',
    method: 'post',
    data
  })
}
