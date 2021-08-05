/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 15:43:17
 仓库管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="城市">
          <el-cascader
            v-model="searchData.city_id"
            :options="cascaderData"
            :props="cascaderProps"
            filterable
            clearable
            @change="getTableList"
          ></el-cascader>
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
              reqFn: delWarehouse,
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
          <el-table-column prop="province_id" label="省份">
            <template #default="scope">
              {{ filterProvince(scope.row.province_id) }}
            </template>
          </el-table-column>
          <el-table-column prop="city" label="城市"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="tel" label="联系电话"> </el-table-column>
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
                    reqFn: delWarehouse,
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
    <!-- 新增/编辑部门 -->
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
          :cascader-data="cascaderData"
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
import { getWarehouse, delWarehouse, getCascader } from '@/api/invoice-management/warehouse'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Form from './components/Form.vue'

export default defineComponent({
  name: 'Warehouse',
  components: {
    Form
  },
  setup() {
    const formRef = ref(null)
    // 搜索数据
    const searchData = reactive({
      city_id: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      city_id: '',
      address: '',
      tel: '',
      id: null
    })
    // 级联数据
    const cascaderData = ref([])
    // 级联配置
    const cascaderProps = ref({
      label: 'name',
      value: 'id',
      checkStrictly: false,
      emitPath: false
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
    } = useBaseHooks({ reqFn: getWarehouse, searchData, formDataDefault })

    onMounted(() => {
      getCascaderList()
    })

    // 获取省市级联数据
    const getCascaderList = async () => {
      const res = await getCascader()
      cascaderData.value = res.data.records
    }
    // 根据省份id过滤出省份名称
    const filterProvince = (id) => {
      const res = cascaderData.value.find(item => item.id === id)
      return res && res.name
    }

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
      delWarehouse,
      multipleSelectionHandler,
      selectIds,
      filterProvince,
      cascaderData,
      cascaderProps
    }
  }
})
</script>

<style lang="scss" scoped></style>

