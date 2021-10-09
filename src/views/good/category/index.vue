/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 13:57:52
 商品分类管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="名称">
          <el-input
            v-model="searchData.name"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="success"
        size="small"
        class="search"
        @click="getTableList"
      >查询</el-button>
    </div>
    <div class="table-container">
      <!-- 表格操作 -->
      <div class="opera-main">
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
              reqFn: delCategory,
              data: {
                id: selectIds
              }
            })
          "
        >删除</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-main">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="level" label="级别">
            <template #default="scope">
              {{ scope.row.level === 1 ? '一级' : '二级' }}
            </template>
          </el-table-column>
          <el-table-column prop="product_count" label="商品数量">
          </el-table-column>
          <el-table-column prop="product_unit" label="商品单位">
          </el-table-column>
          <el-table-column prop="nav_status" label="是否显示在导航栏">
            <template #default="scope">
              <el-tag v-if="scope.row.nav_status === 0" type="danger">不显示</el-tag>
              <el-tag v-if="scope.row.nav_status === 1" type="success">显示</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="show_status" label="显示状态">
            <template #default="scope">
              <el-tag v-if="scope.row.show_status === 0" type="danger">不显示</el-tag>
              <el-tag v-if="scope.row.show_status === 1" type="success">显示</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>
          <el-table-column fixed="right" label="操作">
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
                    reqFn: delCategory,
                    data: {
                      id: String(scope.row.id).split(' ')
                    },
                    single: true
                  })
                "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增/编辑商品分类 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="600px"
    >
      <div class="form-container">
        <Form
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
          :sub-category-data="subCategoryData"
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
import { getGoodsCategory, delCategory } from '@/api/good/category'
import useBaseHooks from '@/hooks/useBaseHooks'
import { computed, reactive, ref } from 'vue'
import Form from './components/Form.vue'

// 搜索数据
const searchData = reactive({
  name: ''
})
// 默认表单数据
const formDataDefault = reactive({
  name: '',
  parent_id: null,
  product_unit: '',
  nav_status: null,
  show_status: null,
  sort: null,
  keywords: '',
  description: '',
  id: null
})

// 上级分类数据
const subCategoryData = computed(() => {
  const obj = {
    id: 0,
    parent_id: 0,
    name: '无上级分类'
  }
  const arr = JSON.parse(JSON.stringify(data.tableData))
  arr.unshift(obj)
  return arr
})

const {
  data,
  getTableList,
  handleCreate,
  handleUpdate,
  handleSelectionChange,
  multipleSelectionHandler,
  selectIds
} = useBaseHooks({ reqFn: getGoodsCategory, searchData, formDataDefault })

// 新增/编辑表单提交
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}
</script>

<style lang="scss" scoped>
.brand-logo {
  width: 100px;
  height: 50px;
  object-fit: fill;
}
</style>

