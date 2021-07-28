/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-28 17:25:52
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="角色">
          <el-input v-model="searchData.role" clearable></el-input>
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
          @click="multipleSelectionHandler({
            operation: '删除',
            reqFn: delRole,
            data: {
              id: selectIds
            }
          })"
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
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column prop="role" label="角色名称"> </el-table-column>
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
                @click="multipleSelectionHandler({
                  operation: '删除',
                  reqFn: delRole,
                  data: {
                    id: String(scope.row.id).split(' ')
                  },
                  single: true
                })"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 新增/编辑用户 -->
    <el-dialog
      v-if="operaData.formDialogVisible"
      v-model="operaData.formDialogVisible"
      :title="operaData.dialogTitle"
      width="400px"
    >
      <div class="form-container">
        <Form
          ref="formRef"
          :status="operaData.dialogStatus"
          :data="operaData.formData"
        ></Form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="operaData.formDialogVisible = false"
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
import { getRole, delRole } from '@/api/system/role'
import useBaseHooks from '@/hooks/useBaseHooks'
import useOperaHooks from '@/hooks/useOperaHooks'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'

export default defineComponent({
  name: 'User',
  components: {
    Form
  },
  setup() {
    const formRef = ref(null)
    // 搜索数据
    const searchData = reactive({
      role: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      role: '',
      id: null
    })

    const {
      data,
      handleSizeChange,
      handleCurrentChange,
      getTableList
    } = useBaseHooks({ reqFn: getRole, searchData })
    const {
      operaData,
      handleCreate,
      handleUpdate,
      handleSelectionChange,
      multipleSelectionHandler,
      selectIds
    } = useOperaHooks({ formDataDefault, getTableList, page: data.page })

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        operaData.formDialogVisible = false
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
      operaData,
      searchData,
      handleSubmit,
      handleSelectionChange,
      delRole,
      multipleSelectionHandler,
      selectIds
    }
  }
})
</script>

<style lang="scss" scoped></style>
