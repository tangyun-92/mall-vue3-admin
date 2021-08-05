/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 16:48:40
 商品库存
 */
<template>
  <div>
    <el-table
      :data="data.tableData"
      stripe
    >
      <el-table-column prop="shop_name" label="商品名称"> </el-table-column>
      <el-table-column prop="num" label="库存数量" width="100"></el-table-column>
      <el-table-column prop="unit" label="库存单位" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import useBaseHooks from '@/hooks/useBaseHooks'
import { findShop } from '@/api/invoice-management/warehouse'

export default defineComponent({
  name: 'CategoryParamTable',
  props: {
    warehouseId: {
      type: Number,
      default() {
        return null
      }
    }
  },
  setup(props) {
    const searchData = reactive({
      warehouse_id: ''
    })
    const formDataDefault = reactive({
      name: '',
      warehouse_id: null,
      spp_id: null,
      numeric: null,
      unit: '',
      generic: null,
      searching: null,
      segements: '',
      id: null
    })

    onMounted(() => {
      searchData.warehouse_id = props.warehouseId
    })

    const {
      data,
      getTableList
    } = useBaseHooks({ reqFn: findShop, searchData, formDataDefault })

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
