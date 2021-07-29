/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 11:10:47
 * 职位管理
 */
import request from '@/utils/request'

/**
 * 获取职位列表
 * @param {*} data
 * @returns
 */
export function getJob(data) {
  return request({
    url: '/jobs/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新职位
 * @param {*} data
 * @returns
 */
export function createOrEditJob(data) {
  return request({
    url: '/jobs/update',
    method: 'post',
    data
  })
}

/**
 * 删除职位
 * @param {*} data
 * @returns
 */
export function delJob(data) {
  return request({
    url: '/jobs/delete',
    method: 'post',
    data
  })
}
