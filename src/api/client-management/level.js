/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-03 17:09:06
 * 会员等级管理
 */
import request from '@/utils/request'

/**
 * 获取会员等级列表
 * @param {*} data
 * @returns
 */
export function getLevel(data) {
  return request({
    url: '/levels/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新会员等级
 * @param {*} data
 * @returns
 */
export function createOrEditLevel(data) {
  return request({
    url: '/levels/update',
    method: 'post',
    data
  })
}

/**
 * 删除会员等级
 * @param {*} data
 * @returns
 */
export function delLevel(data) {
  return request({
    url: '/levels/delete',
    method: 'post',
    data
  })
}
