/*
 * @Author: 唐云
 * @Date: 2021-08-02 11:17:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 17:02:15
 * 商品
 */
import request from '@/utils/request'

/**
 * 获取商品列表
 * @param {*} data
 * @returns
 */
export function getGood(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新商品
 * @param {*} data
 * @returns
 */
export function createOrEditGood(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {*} data
 * @returns
 */
export function delGood(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}
