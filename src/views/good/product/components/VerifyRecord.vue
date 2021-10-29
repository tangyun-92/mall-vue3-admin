/*
 * @Author: 唐云
 * @Date: 2021-10-29 15:10:24
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 15:27:48
 审核记录
 */
<template>
  <div>
    <el-table :data="props.tableData">
      <el-table-column label="审核人" prop="verify_man" width="200"></el-table-column>
      <el-table-column label="审核状态" prop="status" width="150">
        <template #default="scope">
          <el-tag
            v-if="scope.row.status === 2"
            type="danger"
          >审核不通过</el-tag>
          <el-tag
            v-if="scope.row.status === 1"
            type="success"
          >审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" prop="create_time" width="200"></el-table-column>
      <el-table-column label="审核详情" prop="detail"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
