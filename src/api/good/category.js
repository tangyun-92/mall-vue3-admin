/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 09:45:42
 * 商品分类管理
 */
import request from '@/utils/request'

/**
 * 获取商品分类列表
 * @param {*} data
 * @returns
 */
export function getGoodsCategory(data) {
  return request({
    url: '/pms/product-categorys/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新商品分类
 * @param {*} data
 * @returns
 */
export function createOrEditCategory(data) {
  return request({
    url: '/pms/product-categorys/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品分类
 * @param {*} data
 * @returns
 */
export function delCategory(data) {
  return request({
    url: '/pms/product-categorys/delete',
    method: 'post',
    data
  })
}
