/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-08 14:11:32
 用户管理
 */

<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="用户名">
          <el-input
            v-model="searchData.username"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchData.status"
            placeholder="请选择"
            clearable
            @change="getTableList"
          >
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
              reqFn: delUser,
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
          <el-table-column prop="username" label="用戶名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="nick_name" label="昵称"> </el-table-column>
          <el-table-column prop="note" label="备注"> </el-table-column>
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
          <el-table-column fixed="right" label="操作" width="160">
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
                    reqFn: delUser,
                    data: {
                      id: String(scope.row.id).split(' ')
                    },
                    single: true
                  })
                "
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="handlePassword(scope.row.id)"
              >修改密码</el-button>
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
    <!-- 修改密码 -->
    <el-dialog
      v-if="passwordVisible"
      v-model="passwordVisible"
      title="修改密码"
      width="400px"
    >
      <div class="form-container">
        <el-form
          ref="passwordRef"
          :model="passwordForm"
          :rules="passwordRules"
          class="form-data"
          label-width="100px"
          label-position="right"
          size="small"
        >
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model.trim="passwordForm.password"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="passwordVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="updatePassword"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getUser,
  changeStatus,
  delUser,
  changePassword
} from '@/api/system/admin'
import AES from '@/utils/aes'
import useBaseHooks from '@/hooks/useBaseHooks'
import { ifEnable, ifEnableDict } from '@/constants/dictionary'
import { reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { ElMessage } from 'element-plus'

// 默认表单数据
const formDataDefault = reactive({
  username: '',
  status: '',
  email: '',
  nick_name: '',
  note: '',
  id: null
})
// 搜索数据
const searchData = reactive({
  username: '',
  status: ''
})

/**
 * 自定义 hooks
 */
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
} = useBaseHooks({ reqFn: getUser, searchData, formDataDefault })

// 新增/编辑表单提交
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}

/**
 * 修改密码
 */
const passwordVisible = ref(false)
const passwordId = ref(null)
const passwordRef = ref(null)
const passwordForm = reactive({
  password: ''
})
const passwordRules = {
  password: { required: true, message: '不能为空', trigger: 'blur' }
}
// 修改密码弹窗
const handlePassword = (id) => {
  passwordId.value = JSON.parse(JSON.stringify(id))
  passwordVisible.value = true
}
// 修改密码请求
const updatePassword = () => {
  passwordRef.value.validate(async (valid) => {
    if (valid) {
      const res = await changePassword({
        id: passwordId.value,
        password: AES.encrypt(passwordForm.password)
      })
      ElMessage.success(res.message)
      passwordVisible.value = false
    }
  })
}
</script>

<style lang="scss" scoped></style>
