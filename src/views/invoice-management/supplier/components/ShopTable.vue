/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 14:22:32
 商品库存
 */
<template>
  <div>
    <el-table
      :data="data.tableData"
      stripe
    >
      <el-table-column prop="shop_name" label="商品名称"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import useBaseHooks from '@/hooks/useBaseHooks'
import { findShop } from '@/api/invoice-management/supplier'

export default defineComponent({
  name: 'CategoryParamTable',
  props: {
    supplierId: {
      type: Number,
      default() {
        return null
      }
    }
  },
  setup(props) {
    const searchData = reactive({
      supplier_id: ''
    })

    onMounted(() => {
      searchData.supplier_id = props.supplierId
    })

    const {
      data,
      getTableList
    } = useBaseHooks({ reqFn: findShop, searchData })

    return {
      data,
      getTableList,
      searchData
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
