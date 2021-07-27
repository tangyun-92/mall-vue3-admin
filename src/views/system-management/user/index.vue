/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-27 16:59:37
 */

<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="searchData.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.status" placeholder="请选择">
            <el-option v-for="item in ifEnable" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="success" size="small" class="search" @click="getTableList">查询</el-button>
    </div>
    <div class="table-container">
      <!-- 表格操作 -->
      <div class="opera-main">
        <el-button type="primary" size="small" plain>新增</el-button>
        <el-button type="success" size="small" plain>启用</el-button>
        <el-button type="danger" size="small" plain>停用</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-main">
        <el-table :data="data.tableData" stripe style="width: 100%">
          <el-table-column prop="username" label="用戶名"> </el-table-column>
          <el-table-column prop="role" label="所属角色"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
              <el-tag v-if="scope.row.status === 0" type="danger">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      :current-page="data.currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { getUser } from '@/api/system/user'
import AES from '@/utils/aes'
import useBaseHooks from '@/hooks/useBaseHooks'
import { ifEnable, ifEnableDict } from '@/constants/dictionary'
import { reactive } from 'vue'

const searchData = reactive({
  username: '',
  status: 1
})
const { data, handleSizeChange, handleCurrentChange, getTableList } = useBaseHooks({ reqFn: getUser, searchData })
</script>

<style lang="scss" scoped></style>
