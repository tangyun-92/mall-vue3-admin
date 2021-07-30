/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 17:02:10
 参数配置
 */
<template>
  <div>
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
          reqFn: delCategoryParam,
          data: {
            id: selectIds
          }
        })
      "
    >删除</el-button>
    <el-table
      :data="data.tableData"
      stripe
      style="width: 100%; margin: 12px 0 0 0"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="spp_id" label="参数编号"> </el-table-column>
      <el-table-column prop="name" label="参数名称"> </el-table-column>
      <el-table-column prop="numeric" label="是否为数字参数">
        <template #default="scope">
          {{ filterConstants(scope.row.numeric, whether) }}
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位"> </el-table-column>
      <el-table-column prop="generic" label="是否为通用参数">
        <template #default="scope">
          {{ filterConstants(scope.row.generic, whether) }}
        </template>
      </el-table-column>
      <el-table-column prop="searching" label="是否用于通用搜索">
        <template #default="scope">
          {{ filterConstants(scope.row.searching, whether) }}
        </template>
      </el-table-column>
      <el-table-column prop="segements" label="参数值"></el-table-column>
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
            @click="
              multipleSelectionHandler({
                operation: '删除',
                reqFn: delCategoryParam,
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
    <!-- 新增/编辑参数 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="800px"
    >
      <div class="form-container">
        <ParamTableForm
          :id="searchData.spg_id"
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
        ></ParamTableForm>
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
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getCategoryParam, delCategoryParam } from '@/api/goods/category'
import useBaseHooks from '@/hooks/useBaseHooks'
import ParamTableForm from './ParamTableForm.vue'
import { whether } from '@/constants/dictionary'

export default defineComponent({
  name: 'CategoryParamTable',
  components: {
    ParamTableForm
  },
  props: {
    categoryId: {
      type: Number,
      default() {
        return null
      }
    }
  },
  setup(props) {
    const formRef = ref(null)
    const searchData = reactive({
      spg_id: ''
    })
    const formDataDefault = reactive({
      name: '',
      spg_id: null,
      spp_id: null,
      numeric: null,
      unit: '',
      generic: null,
      searching: null,
      segements: '',
      id: null
    })
    const paramData = reactive({
      dialogParamStatus: ''
    })

    onMounted(() => {
      searchData.spg_id = props.categoryId
    })

    const {
      data,
      getTableList,
      selectIds,
      handleSelectionChange,
      multipleSelectionHandler,
      handleCreate,
      handleUpdate,
      filterConstants
    } = useBaseHooks({ reqFn: getCategoryParam, searchData, formDataDefault })

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        data.formDialogVisible = false
        getTableList()
      })
    }

    return {
      data,
      getTableList,
      delCategoryParam,
      selectIds,
      handleSelectionChange,
      multipleSelectionHandler,
      paramData,
      handleCreate,
      handleUpdate,
      formRef,
      handleSubmit,
      searchData,
      whether,
      filterConstants
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
