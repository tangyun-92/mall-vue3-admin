/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-02 10:35:29
 员工管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="姓名">
          <el-input
            v-model="searchData.ename"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input
            v-model="searchData.wid"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.status" placeholder="请选择" clearable @change="getTableList">
            <el-option
              v-for="item in ifJobStatus"
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
      </div>
      <!-- 表格 -->
      <div class="table-main">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="ename" label="姓名"> </el-table-column>
          <el-table-column prop="wid" label="工号"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="job" label="职位"> </el-table-column>
          <el-table-column prop="department" label="部门"> </el-table-column>
          <el-table-column prop="education" label="学历">
            <template #default="scope">
              {{ filterConstants(scope.row.education, education) }}
            </template>
          </el-table-column>
          <el-table-column prop="tel" label="联系方式"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success">
                {{ ifJobStatusDict[scope.row.status] }}
              </el-tag>
              <el-tag v-if="scope.row.status === 2" type="warning">
                {{ ifJobStatusDict[scope.row.status] }}
              </el-tag>
              <el-tag v-if="scope.row.status === 3" type="info">
                {{ ifJobStatusDict[scope.row.status] }}
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
                @click="handleDetails(scope.row)"
              >查看</el-button>
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
    <!-- 新增/编辑职位 -->
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
import { getEmployee } from '@/api/employee/employee'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { education, ifJobStatus, ifJobStatusDict } from '@/constants/dictionary'

export default defineComponent({
  name: 'Employee',
  components: {
    Form
  },
  setup() {
    const formRef = ref(null)
    // 搜索数据
    const searchData = reactive({
      ename: '',
      status: '',
      wid: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      wid: '',
      ename: '',
      sex: '',
      married: '',
      education: '',
      tel: '',
      email: '',
      address: '',
      job_id: '',
      dept_id: '',
      mgr_id: null,
      hiredate: '',
      termdate: null,
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
      handleDetails,
      filterConstants
    } = useBaseHooks({ reqFn: getEmployee, searchData, formDataDefault })

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
      handleDetails,
      searchData,
      handleSubmit,
      ifJobStatus,
      ifJobStatusDict,
      filterConstants,
      education
    }
  }
})
</script>

<style lang="scss" scoped></style>

