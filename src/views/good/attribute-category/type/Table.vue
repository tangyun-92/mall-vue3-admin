/*
 * @Author: 唐云
 * @Date: 2021-10-09 15:45:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-11 13:19:47
 商品属性
 */

<template>
  <div>
    <el-button
      type="primary"
      size="small"
      plain
      @click="handleCreate"
    >新增</el-button>
    <el-button
      type="danger"
      size="small"
      plain
      @click="
        multipleSelectionHandler({
          operation: '删除',
          reqFn: delGoodsAttribute,
          data: {
            id: selectIds,
            product_attribute_category_id: id,
            type
          }
        })
      "
    >删除</el-button>
    <el-table
      :data="data.tableData"
      stripe
      style="width: 100%; margin: 12px 0 0 0"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="属性名称"> </el-table-column>
      <el-table-column prop="product_attribute_category_id" label="商品类型">
        <template #default="scope">
          {{ filterGoodAttribute(scope.row.product_attribute_category_id) }}
        </template>
      </el-table-column>
      <el-table-column prop="select_type" label="属性是否可选">
        <template #default="scope">
          {{
            scope.row.select_type
              ? filterConstants(scope.row.select_type, selectType)
              : null
          }}
        </template>
      </el-table-column>
      <el-table-column prop="input_type" label="属性录入方式">
        <template #default="scope">
          {{
            scope.row.input_type
              ? filterConstants(scope.row.input_type, inputType)
              : null
          }}
        </template>
      </el-table-column>
      <el-table-column prop="input_list" label="可选值列表"> </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="
              multipleSelectionHandler({
                operation: '删除',
                reqFn: delGoodsAttribute,
                data: {
                  id: String(scope.row.id).split(' '),
                  product_attribute_category_id: id,
                  type
                },
                single: true
              })
            "
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑参数 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="800px"
    >
      <div class="form-container">
        <Form
          :id="searchData.attributeCategoryId"
          ref="formRef"
          :list="goodAttributeList"
          :status="data.dialogStatus"
          :data="data.formData"
          :type="type"
        ></Form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="data.formDialogVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, reactive, ref } from 'vue'
import { getGoodsAttribute, delGoodsAttribute } from '@/api/good/attribute'
import { getGoodsAttributeCategoryMap } from '@/api/good/attribute-category'
import useBaseHooks from '@/hooks/useBaseHooks'
import Form from './Form.vue'
import { inputType, selectType } from '@/constants/dictionary'

const props = defineProps({
  id: {
    type: Number,
    default() {
      return null
    }
  },
  type: {
    type: Number,
    default() {
      return null
    }
  }
})

const searchData = reactive({
  attributeCategoryId: '',
  type: ''
})
const formDataDefault = reactive({
  name: '',
  product_attribute_category_id: null,
  select_type: null,
  input_type: null,
  input_list: '',
  sort: null,
  filter_type: null,
  search_type: null,
  id: null
})
const paramData = reactive({
  dialogParamStatus: ''
})

// 商品类型
const goodAttributeList = ref([])
const getGoodsAttributeCategoryMapList = () => {
  getGoodsAttributeCategoryMap().then((res) => {
    goodAttributeList.value = res.data.records
  })
}
// 商品类型值转换
const filterGoodAttribute = (id) => {
  const list = goodAttributeList.value.find((item) => item.id === id)
  return list.name
}
onMounted(() => {
  searchData.attributeCategoryId = props.id
  searchData.type = props.type
  getGoodsAttributeCategoryMapList()
})

const {
  data,
  getTableList,
  selectIds,
  handleSelectionChange,
  multipleSelectionHandler,
  handleCreate,
  handleUpdate,
  filterConstants
} = useBaseHooks({ reqFn: getGoodsAttribute, searchData, formDataDefault })

// 新增/编辑表单提交
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}
</script>

<style lang='scss' scoped>
</style>
