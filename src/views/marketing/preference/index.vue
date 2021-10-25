/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:13:32
 优选管理
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
        <el-form-item label="是否显示">
          <el-select
            v-model="searchData.show_status"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
          >
            <el-option
              v-for="item in ifShow"
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
              reqFn: delPreference,
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
          <el-table-column prop="pic" label="优选图片" width="120">
            <template #default="scope">
              <img v-if="scope.row.pic" class="brand-logo" :src="scope.row.pic" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="sub_title" label="副标题"> </el-table-column>
          <el-table-column prop="show_status" label="是否显示" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.show_status === 1" type="success">显示</el-tag>
              <el-tag v-if="scope.row.show_status === 0" type="danger">不显示</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序">
          </el-table-column>
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
                    reqFn: delPreference,
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
import { getPreference, delPreference } from '@/api/marketing/preference'
import useBaseHooks from '@/hooks/useBaseHooks'
import { onMounted, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { ifShow } from '@/constants/dictionary'

const formRef = ref(null)
// 搜索数据
const searchData = reactive({
  name: '',
  show_status: ''
})
// 默认表单数据
const formDataDefault = reactive({
  name: '',
  sub_title: '',
  show_status: null,
  pic: '',
  sort: null,
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
} = useBaseHooks({ reqFn: getPreference, searchData, formDataDefault })

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
  width: 80px;
  height: 50px;
  object-fit: cover;
}
</style>

