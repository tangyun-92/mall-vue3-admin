/*
 * @Author: 唐云
 * @Date: 2021-10-29 15:10:24
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 16:57:35
 操作记录
 */
<template>
  <div>
    <el-table :data="props.tableData">
      <el-table-column label="操作人" prop="operate_man" width="120"></el-table-column>
      <el-table-column label="操作时间" prop="create_time" width="160"></el-table-column>
      <el-table-column label="改变前价格" prop="price_old"></el-table-column>
      <el-table-column label="改变后价格" prop="price_new"></el-table-column>
      <el-table-column label="改变前优惠价" prop="sale_price_old"></el-table-column>
      <el-table-column label="改变后优惠价" prop="sale_price_new"></el-table-column>
      <el-table-column label="改变前积分" prop="gift_point_old"></el-table-column>
      <el-table-column label="改变后积分" prop="gift_point_new"></el-table-column>
      <el-table-column label="改变前积分使用限制" prop="use_point_limit_old"></el-table-column>
      <el-table-column label="改变后积分使用限制" prop="use_point_limit_new"></el-table-column>
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
