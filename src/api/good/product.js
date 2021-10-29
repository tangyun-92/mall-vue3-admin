/*
 * @Author: 唐云
 * @Date: 2021-08-02 11:17:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 16:54:33
 * 商品
 */
import request from '@/utils/request'

/**
 * 获取商品列表
 * @param {*} data
 * @returns
 */
export function getProduct(data) {
  return request({
    url: 'pms/products/list',
    method: 'post',
    data
  })
}

/**
 * 获取商品详情
 * @param {*} data
 * @returns
 */
export function getProductDetail(data) {
  return request({
    url: 'pms/products/detail',
    method: 'post',
    data
  })
}

/**
 * 创建/更新商品
 * @param {*} data
 * @returns
 */
export function createOrEditProduct(data) {
  return request({
    url: 'pms/products/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {*} data
 * @returns
 */
export function delProduct(data) {
  return request({
    url: 'pms/products/delete',
    method: 'post',
    data
  })
}

/**
 * 上传图片
 * @param {*} data
 * @returns
 */
export function uploadImage(data) {
  return request({
    url: 'pms/products/upload',
    method: 'post',
    data
  })
}

/**
 * 审核商品
 * @param {*} data
 * @returns
 */
export function verifyProduct(data) {
  return request({
    url: 'pms/products/verify',
    method: 'post',
    data
  })
}

/**
 * 审核记录
 * @param {*} data
 * @returns
 */
export function verifyRecord(data) {
  return request({
    url: 'pms/products/verifyRecord',
    method: 'post',
    data
  })
}

/**
 * 操作记录
 * @param {*} data
 * @returns
 */
export function operateRecord(data) {
  return request({
    url: 'pms/products/operateLog',
    method: 'post',
    data
  })
}
