/*
 * @Author: 唐云
 * @Date: 2021-10-09 15:21:11
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 16:36:58
 * 商品类型管理
 */

import request from '@/utils/request'

/**
 * 获取商品类型列表
 * @param {*} data
 * @returns
 */
export function getGoodsAttributeCategory(data) {
  return request({
    url: '/pms/product-attribute-categorys/list',
    method: 'post',
    data
  })
}

/**
 * 获取商品类型列表
 * @param {*} data
 * @returns
 */
export function getGoodsAttributeCategoryMap(data) {
  return request({
    url: '/pms/product-attribute-categorys/findMap',
    method: 'post',
    data
  })
}

/**
 * 创建/更新商品类型
 * @param {*} data
 * @returns
 */
export function createOrEditAttributeCategory(data) {
  return request({
    url: '/pms/product-attribute-categorys/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品类型
 * @param {*} data
 * @returns
 */
export function delAttributeCategory(data) {
  return request({
    url: '/pms/product-attribute-categorys/delete',
    method: 'post',
    data
  })
}
