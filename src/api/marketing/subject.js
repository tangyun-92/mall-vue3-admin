/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 14:06:15
 * 专题管理
 */
import request from '@/utils/request'

/**
 * 获取专题列表
 * @param {*} data
 * @returns
 */
export function getSubject(data) {
  return request({
    url: '/cms/subjects/list',
    method: 'post',
    data
  })
}

/**
 * 获取所有专题map
 * @param {*} data
 * @returns
 */
export function getSubjectMap(data) {
  return request({
    url: '/cms/subjects/listMap',
    method: 'post',
    data
  })
}

/**
 * 创建/更新专题
 * @param {*} data
 * @returns
 */
export function createOrEditSubject(data) {
  return request({
    url: '/cms/subjects/update',
    method: 'post',
    data
  })
}

/**
 * 删除专题
 * @param {*} data
 * @returns
 */
export function delSubject(data) {
  return request({
    url: '/cms/subjects/delete',
    method: 'post',
    data
  })
}

/**
 * 获取专题分类列表
 * @param {*} data
 * @returns
 */
export function findSubjectCategory(data) {
  return request({
    url: '/cms/subjects/findSubjectCategory',
    method: 'post',
    data
  })
}
