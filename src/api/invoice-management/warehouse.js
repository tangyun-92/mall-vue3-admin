/*
 * @Author: 唐云
 * @Date: 2021-08-04 11:27:50
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 16:25:02
 * 仓库管理
 */
import request from '@/utils/request'

/**
 * 获取仓库列表
 * @param {*} data
 * @returns
 */
export function getWarehouse(data) {
  return request({
    url: '/warehouses/list',
    method: 'post',
    data
  })
}

/**
 * 获取仓库中商品列表
 * @param {*} data
 * @returns
 */
export function findShop(data) {
  return request({
    url: '/warehouses/findShop',
    method: 'post',
    data
  })
}

/**
 * 创建/更新仓库
 * @param {*} data
 * @returns
 */
export function createOrEditWarehouse(data) {
  return request({
    url: '/warehouses/update',
    method: 'post',
    data
  })
}

/**
 * 删除仓库
 * @param {*} data
 * @returns
 */
export function delWarehouse(data) {
  return request({
    url: '/warehouses/delete',
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
