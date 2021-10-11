/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-11 13:07:30
 商品类型管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="类型名称">
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
              reqFn: delAttributeCategory,
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="类型名称"> </el-table-column>
          <el-table-column prop="attribute_count" label="属性数量" width="120"> </el-table-column>
          <el-table-column prop="param_count" label="参数数量" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="handleType(scope.row)"
              >属性列表</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleParam(scope.row)"
              >参数列表</el-button>
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
                    reqFn: delAttributeCategory,
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
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currentPage"
      :page-sizes="[10, 20, 40, 50, 100]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 新增/编辑品牌 -->
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
    <!-- 商品属性 -->
    <el-dialog
      v-if="typeDialogVisible"
      v-model="typeDialogVisible"
      title="商品属性"
      width="1200px"
      @close="closeType"
    >
      <div class="form-container">
        <ProductType :id="attributeCategoryId" :type="1" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="closeType"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 商品参数 -->
    <el-dialog
      v-if="paramDialogVisible"
      v-model="paramDialogVisible"
      title="商品参数"
      width="1200px"
      @close="closeParam"
    >
      <div class="form-container">
        <ProductType :id="attributeCategoryId" :type="2" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="closeParam"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getGoodsAttributeCategory, delAttributeCategory } from '@/api/good/attribute-category'
import useBaseHooks from '@/hooks/useBaseHooks'
import { reactive, ref } from 'vue'
import Form from './components/Form.vue'
import ProductType from './type/Table.vue'

// 搜索数据
const searchData = reactive({
  name: ''
})
// 默认表单数据
const formDataDefault = reactive({
  name: '',
  id: null
})

const {
  data,
  handleSizeChange,
  handleCurrentChange,
  getTableList,
  handleCreate,
  handleUpdate,
  handleSelectionChange,
  multipleSelectionHandler,
  selectIds
} = useBaseHooks({ reqFn: getGoodsAttributeCategory, searchData, formDataDefault })

// 新增/编辑表单提交
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}

// 商品属性弹窗
const attributeCategoryId = ref(null)
const typeDialogVisible = ref(false)
const handleType = (row) => {
  attributeCategoryId.value = row.id
  typeDialogVisible.value = true
}
const closeType = () => {
  typeDialogVisible.value = false
  getTableList()
}

// 商品参数弹窗
const paramDialogVisible = ref(false)
const handleParam = (row) => {
  attributeCategoryId.value = row.id
  paramDialogVisible.value = true
}
const closeParam = () => {
  paramDialogVisible.value = false
  getTableList()
}

</script>

<style lang="scss" scoped>
.brand-logo {
  width: 50px;
  height: 50px;
  object-fit: fill;
}
</style>

