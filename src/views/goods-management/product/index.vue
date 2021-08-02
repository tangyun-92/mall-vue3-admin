/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 16:39:05
 产品管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="产品标题">
          <el-input
            v-model="searchData.title"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="searchData.saleable" placeholder="请选择" clearable @change="getTableList">
            <el-option
              v-for="item in whether"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="searchData.valid" placeholder="请选择" clearable @change="getTableList">
            <el-option
              v-for="item in whether"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
              reqFn: delProduct,
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
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="sub_title" label="副标题"> </el-table-column>
          <el-table-column prop="brand_name" label="所属品牌"> </el-table-column>
          <el-table-column prop="category_name" label="所属分类"> </el-table-column>
          <el-table-column prop="spec_group_name" label="所属品类"> </el-table-column>
          <el-table-column prop="saleable" label="是否上架">
            <template #default="scope">
              {{ filterConstants(scope.row.saleable, whether) }}
            </template>
          </el-table-column>
          <el-table-column prop="valid" label="是否有效">
            <template #default="scope">
              {{ filterConstants(scope.row.valid, whether) }}
            </template>
          </el-table-column>
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
                    reqFn: delProduct,
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
    <!-- 新增/编辑产品 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="800px"
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

<script>
import { getProduct, delProduct } from '@/api/goods/product'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { whether } from '@/constants/dictionary'

export default defineComponent({
  name: 'User',
  components: {
    Form
  },
  setup() {
    const formRef = ref(null)
    // 搜索数据
    const searchData = reactive({
      title: '',
      saleable: '',
      valid: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      title: '',
      sub_title: '',
      category_id: null,
      brand_id: null,
      spg_id: null,
      saleable: null,
      valid: null,
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
      selectIds,
      filterConstants
    } = useBaseHooks({ reqFn: getProduct, searchData, formDataDefault })

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        data.formDialogVisible = false
        getTableList()
      })
    }

    return {
      formRef,
      data,
      handleSizeChange,
      handleCurrentChange,
      getTableList,
      handleCreate,
      handleUpdate,
      searchData,
      handleSubmit,
      handleSelectionChange,
      delProduct,
      multipleSelectionHandler,
      selectIds,
      whether,
      filterConstants
    }
  }
})
</script>

<style lang="scss" scoped></style>
