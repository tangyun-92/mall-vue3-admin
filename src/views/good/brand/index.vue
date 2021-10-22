/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-22 15:51:08
 品牌管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="品牌名称">
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
              reqFn: delBrand,
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
          <el-table-column prop="logo" label="品牌logo" width="120">
            <template #default="scope">
              <img v-if="scope.row.logo" class="brand-logo" :src="scope.row.logo" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="品牌名称"> </el-table-column>
          <el-table-column prop="first_letter" label="品牌首字母" width="120"> </el-table-column>
          <el-table-column prop="factory_status" label="是否为品牌制造商" width="150">
            <template #default="scope">
              <el-tag v-if="scope.row.factory_status === 1" type="success">是</el-tag>
              <el-tag v-if="scope.row.factory_status === 0" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="show_status" label="是否显示" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.show_status === 1" type="success">是</el-tag>
              <el-tag v-if="scope.row.show_status === 0" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="product_count" label="产品数量" width="120">
          </el-table-column>
          <el-table-column prop="product_comment_count" label="产品评论数量" width="120"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
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
                    reqFn: delBrand,
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
  </div>
</template>

<script setup>
import { getBrand, delBrand } from '@/api/good/brand'
import useBaseHooks from '@/hooks/useBaseHooks'
import { reactive, ref } from 'vue'
import Form from './components/Form.vue'

const formRef = ref(null)
// 搜索数据
const searchData = reactive({
  name: ''
})
// 默认表单数据
const formDataDefault = reactive({
  name: '',
  first_letter: '',
  factory_status: null,
  show_status: null,
  logo: '',
  brand_story: '',
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
} = useBaseHooks({ reqFn: getBrand, searchData, formDataDefault })

// 新增/编辑表单提交
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}

</script>

<style lang="scss" scoped>
.brand-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>

