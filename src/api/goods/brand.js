/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 10:21:43
 * 品牌管理
 */
import request from '@/utils/request'

/**
 * 获取品牌列表
 * @param {*} data
 * @returns
 */
export function getBrand(data) {
  return request({
    url: '/brands/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新品牌
 * @param {*} data
 * @returns
 */
export function createOrEditBrand(data) {
  return request({
    url: '/brands/update',
    method: 'post',
    data
  })
}

/**
 * 删除品牌
 * @param {*} data
 * @returns
 */
export function delBrand(data) {
  return request({
    url: '/brands/delete',
    method: 'post',
    data
  })
}

/**
 * 上传logo
 * @param {*} data
 * @returns
 */
export function uploadLogo(data) {
  return request({
    url: '/brands/upload',
    method: 'post',
    data
  })
}
