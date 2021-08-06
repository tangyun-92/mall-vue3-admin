/*
 * @Author: 唐云
 * @Date: 2021-08-04 11:27:50
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 17:11:02
 * 零售店管理
 */
import request from '@/utils/request'

/**
 * 获取零售店列表
 * @param {*} data
 * @returns
 */
export function getShop(data) {
  return request({
    url: '/shops/list',
    method: 'post',
    data
  })
}

/**
 * 获取零售店中商品列表
 * @param {*} data
 * @returns
 */
export function findShop(data) {
  return request({
    url: '/shops/findShop',
    method: 'post',
    data
  })
}

/**
 * 创建/更新零售店
 * @param {*} data
 * @returns
 */
export function createOrEditShop(data) {
  return request({
    url: '/shops/update',
    method: 'post',
    data
  })
}

/**
 * 删除零售店
 * @param {*} data
 * @returns
 */
export function delShop(data) {
  return request({
    url: '/shops/delete',
    method: 'post',
    data
  })
}

/**
 * 获取省市级联数据
 * @param {*} data
 * @returns
 */
export function getCascader(data) {
  return request({
    url: '/provinces/getCascader',
    method: 'post',
    data
  })
}
