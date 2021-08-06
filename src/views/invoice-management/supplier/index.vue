/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 14:20:33
 供货商管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="编号">
          <el-input
            v-model="searchData.code"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchData.type" placeholder="请选择" clearable @change="getTableList">
            <el-option
              v-for="item in supplierType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.status" placeholder="请选择" clearable @change="getTableList">
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
          type="danger"
          size="small"
          plain
          @click="
            multipleSelectionHandler({
              operation: '删除',
              reqFn: delSupplier,
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
          <el-table-column prop="id" label="id" width="80"> </el-table-column>
          <el-table-column prop="code" label="供货商编号"> </el-table-column>
          <el-table-column prop="name" label="供货商名称"> </el-table-column>
          <el-table-column prop="type" label="类型">
            <template #default="scope">
              {{ filterConstants(scope.row.type, supplierType) }}
            </template>
          </el-table-column>
          <el-table-column prop="like_man" label="联系人"> </el-table-column>
          <el-table-column prop="tel" label="联系电话"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
              <el-tag v-if="scope.row.status === 2" type="danger">
                {{ ifEnableDict[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDetails(scope.row)"
              >查看</el-button>
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
                    reqFn: delSupplier,
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
                @click="shopSetting(scope.row.id)"
              >商品列表</el-button>
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
    <!-- 新增/编辑部门 -->
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
    <!-- 商品列表 -->
    <el-dialog
      v-if="shopDialogVisible"
      v-model="shopDialogVisible"
      title="商品列表"
      width="1200px"
    >
      <ShopTable :supplier-id="supplierId" />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="shopDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getSupplier, delSupplier } from '@/api/invoice-management/supplier'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import ShopTable from './components/ShopTable.vue'
import { ifEnable, ifEnableDict, supplierType } from '@/constants/dictionary'

export default defineComponent({
  name: 'Supplier',
  components: {
    Form,
    ShopTable
  },
  setup() {
    const formRef = ref(null)
    // 搜索数据
    const searchData = reactive({
      status: '',
      type: '',
      code: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      code: '',
      name: '',
      type: '',
      like_man: '',
      tel: '',
      bank_name: '',
      bank_account: '',
      address: '',
      status: '',
      id: null
    })
    // 商品列表弹窗
    const shopDialogVisible = ref(false)
    const supplierId = ref(null)

    const {
      data,
      handleSizeChange,
      handleCurrentChange,
      getTableList,
      handleCreate,
      handleUpdate,
      handleDetails,
      handleSelectionChange,
      multipleSelectionHandler,
      selectIds,
      filterConstants
    } = useBaseHooks({ reqFn: getSupplier, searchData, formDataDefault })

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        data.formDialogVisible = false
        getTableList()
      })
    }

    const shopSetting = (supplier_id) => {
      shopDialogVisible.value = true
      supplierId.value = supplier_id
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
      handleSelectionChange,
      delSupplier,
      multipleSelectionHandler,
      selectIds,
      shopSetting,
      supplierId,
      shopDialogVisible,
      ifEnable,
      ifEnableDict,
      supplierType,
      filterConstants
    }
  }
})
</script>

<style lang="scss" scoped></style>

