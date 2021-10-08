/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 15:36:36
 角色管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="角色名称">
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
          type="success"
          size="small"
          plain
          @click="
            multipleSelectionHandler({
              operation: '启用',
              reqFn: changeStatus,
              data: {
                id: selectIds,
                status: 1
              }
            })
          "
        >启用</el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="
            multipleSelectionHandler({
              operation: '停用',
              reqFn: changeStatus,
              data: {
                id: selectIds,
                status: 0
              }
            })
          "
        >停用</el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="
            multipleSelectionHandler({
              operation: '删除',
              reqFn: delRole,
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
          <el-table-column prop="name" label="角色名称"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="admin_count" label="用户数"> </el-table-column>
          <el-table-column prop="create_time" label="创建时间"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
              <el-tag v-if="scope.row.status === 0" type="danger">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
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
                :disabled="scope.row.status === 1"
                @click="
                  multipleSelectionHandler({
                    operation: '删除',
                    reqFn: delRole,
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
    <!-- 新增/编辑用户 -->
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
  </div>
</template>

<script setup>
import { getRole, delRole, changeStatus } from '@/api/system/role'
import useBaseHooks from '@/hooks/useBaseHooks'
import { reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { ifEnable, ifEnableDict } from '@/constants/dictionary'

// 搜索数据
const searchData = reactive({
  name: ''
})
// 默认表单数据
const formDataDefault = reactive({
  name: '',
  description: '',
  status: '',
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
} = useBaseHooks({ reqFn: getRole, searchData, formDataDefault })

// 新增/编辑表单提交
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}
</script>

<style lang="scss" scoped></style>
