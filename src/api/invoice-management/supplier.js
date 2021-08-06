/*
 * @Author: 唐云
 * @Date: 2021-08-04 11:27:50
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 11:11:06
 * 供货商管理
 */
import request from '@/utils/request'

/**
 * 获取供货商列表
 * @param {*} data
 * @returns
 */
export function getSupplier(data) {
  return request({
    url: '/suppliers/list',
    method: 'post',
    data
  })
}

/**
 * 获取供货商中商品列表
 * @param {*} data
 * @returns
 */
export function findShop(data) {
  return request({
    url: '/suppliers/findShop',
    method: 'post',
    data
  })
}

/**
 * 创建/更新供货商
 * @param {*} data
 * @returns
 */
export function createOrEditSupplier(data) {
  return request({
    url: '/suppliers/update',
    method: 'post',
    data
  })
}

/**
 * 删除供货商
 * @param {*} data
 * @returns
 */
export function delSupplier(data) {
  return request({
    url: '/suppliers/delete',
    method: 'post',
    data
  })
}
