/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-28 14:57:25
 */

<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="searchData.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in ifEnable"
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
        <el-button type="success" size="small" plain>启用</el-button>
        <el-button type="danger" size="small" plain>停用</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-main">
        <el-table :data="data.tableData" stripe style="width: 100%">
          <el-table-column prop="username" label="用戶名"> </el-table-column>
          <el-table-column prop="employee" label="员工姓名"> </el-table-column>
          <el-table-column prop="role" label="所属角色"> </el-table-column>
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
                @click="handleDel"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
    <el-dialog
      v-if="dialogData.formDialogVisible"
      v-model="dialogData.formDialogVisible"
      :title="dialogData.dialogTitle"
      width="400px"
    >
      <div class="form-container">
        <Form
          ref="formRef"
          :status="dialogData.dialogStatus"
          :data="dialogData.formData"
        ></Form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="dialogData.formDialogVisible = false"
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
import { getUser } from '@/api/system/user'
import AES from '@/utils/aes'
import useBaseHooks from '@/hooks/useBaseHooks'
import useOperaHooks from '@/hooks/useOperaHooks'
import { ifEnable, ifEnableDict } from '@/constants/dictionary'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'

export default defineComponent({
  components: {
    Form
  },
  setup() {
    const formRef = ref(null)
    const searchData = reactive({
      username: '',
      status: ''
    })
    const formDataDefault = reactive({
      username: '',
      status: '',
      role_id: '',
      emp_id: '',
      id: null
    })

    const { data, handleSizeChange, handleCurrentChange, getTableList } =
      useBaseHooks({ reqFn: getUser, searchData })
    const { dialogData, handleCreate, handleUpdate, handleDel } = useOperaHooks(
      { formDataDefault }
    )

    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        dialogData.formDialogVisible = false
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
      handleDel,
      dialogData,
      searchData,
      ifEnable,
      ifEnableDict,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped></style>
