/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 16:01:47
 品类管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="品类名称">
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="品类名称"> </el-table-column>
          <el-table-column prop="spg_id" label="品类编号"> </el-table-column>
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
              <el-button type="text" size="small" @click="paramSetting(scope.row.spg_id)">参数配置</el-button>
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
    <!-- 新增/编辑品类 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="400px"
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
    <!-- 参数配置 -->
    <el-dialog
      v-if="paramDialogVisible"
      v-model="paramDialogVisible"
      title="参数配置"
      width="1200px"
    >
      <ParamTable :category-id="categoryId" />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="paramDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, delCategory } from '@/api/goods/category'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import ParamTable from './components/ParamTable.vue'

export default defineComponent({
  name: 'Category',
  components: {
    Form,
    ParamTable
  },
  setup() {
    const formRef = ref(null)
    const paramDialogVisible = ref(false)
    const categoryId = ref(null) // 品类编号
    // 搜索数据
    const searchData = reactive({
      name: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      name: '',
      spg_id: '',
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
    } = useBaseHooks({ reqFn: getCategory, searchData, formDataDefault })

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        data.formDialogVisible = false
        getTableList()
      })
    }

    /**
     * id 品类编号
     */
    const paramSetting = (id) => {
      paramDialogVisible.value = true
      categoryId.value = id
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
      delCategory,
      multipleSelectionHandler,
      selectIds,
      paramSetting,
      paramDialogVisible,
      categoryId
    }
  }
})
</script>

<style lang="scss" scoped></style>

