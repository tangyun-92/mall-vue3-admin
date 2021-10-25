/*
 * @Author: 唐云
 * @Date: 2021-07-29 11:10:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:12:54
 * 优选主题管理
 */
import request from '@/utils/request'

/**
 * 获取优选主题列表
 * @param {*} data
 * @returns
 */
export function getPreference(data) {
  return request({
    url: '/cms/preferences/list',
    method: 'post',
    data
  })
}

/**
 * 获取所有优选主题map
 * @param {*} data
 * @returns
 */
export function getPreferenceMap(data) {
  return request({
    url: '/cms/preferences/listMap',
    method: 'post',
    data
  })
}

/**
 * 创建/更新优选主题
 * @param {*} data
 * @returns
 */
export function createOrEditPreference(data) {
  return request({
    url: '/cms/preferences/update',
    method: 'post',
    data
  })
}

/**
 * 删除优选主题
 * @param {*} data
 * @returns
 */
export function delPreference(data) {
  return request({
    url: '/cms/preferences/delete',
    method: 'post',
    data
  })
}
