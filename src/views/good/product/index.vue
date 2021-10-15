/*
 * @Author: 唐云
 * @Date: 2021-07-24 22:27:13
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 10:06:57
 商品管理
 */
<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="商品名称">
          <el-input
            v-model="searchData.name"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select
            v-model="searchData.brand_id"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
          >
            <el-option
              v-for="item in product"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select
            v-model="searchData.brand_id"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
          >
            <el-option
              v-for="item in product"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货号">
          <el-input
            v-model="searchData.product_sn"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select
            v-model="searchData.publish_status"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
          >
            <el-option
              v-for="item in product"
              :key="item.id"
              :label="item.title"
              :value="item.id"
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
              reqFn: delProduct,
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
          <el-table-column prop="product_name" label="商品图片"> </el-table-column>
          <el-table-column prop="name" label="商品名称"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="product_sn" label="货号"> </el-table-column>
          <el-table-column prop="publish_status" label="上架状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.publish_status === 2" type="success">上架</el-tag>
              <el-tag v-if="scope.row.publish_status === 1" type="danger">下架</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="new_status" label="新品状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.new_status === 2" type="success">新品</el-tag>
              <el-tag v-if="scope.row.new_status === 1" type="danger">不是新品</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="recommend_status" label="推荐状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.recommend_status === 2" type="success">推荐</el-tag>
              <el-tag v-if="scope.row.recommend_status === 1" type="danger">不推荐</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sale" label="销量" width="100"></el-table-column>
          <el-table-column prop="verify_status" label="审核状态" width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.verifyStatus === 2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.verifyStatus === 1" type="danger">未审核</el-tag>
            </template>
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
                    reqFn: delProduct,
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
    <!-- 新增/编辑商品 -->
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
          :product="product"
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
import { getProduct, delProduct } from '@/api/good/product'
import useBaseHooks from '@/hooks/useBaseHooks'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import { whether } from '@/constants/dictionary'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref(null)
const product = ref([])
// 搜索数据
const searchData = reactive({
  name: '',
  brand_id: '',
  product_category_id: '',
  product_sn: '',
  publish_status: ''
})
// 默认表单数据
const formDataDefault = reactive({
  spu_id: null,
  title: '',
  images: '',
  price: null,
  param: '',
  saleable: null,
  valid: null,
  id: null
})

const {
  data,
  handleSizeChange,
  handleCurrentChange,
  getTableList,
  handleSelectionChange,
  multipleSelectionHandler,
  selectIds,
  filterConstants
} = useBaseHooks({ reqFn: getProduct, searchData, formDataDefault })

onMounted(() => {
  // getProductList()
})

// 获取产品列表
// const getProductList = async () => {
//   const res = await getProduct({
//     page: 1,
//     pageSize: 5000
//   })
//   product.value = res.data.records
// }

// 新增/编辑表单提交
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}

// 新增商品
const handleCreate = () => {
  router.push('/good/add-product')
}
// 编辑商品
const handleUpdate = (row) => {
  router.push({
    path: '/good/add-product',
    query: {
      id: row.id
    }
  })
}

</script>

<style lang="scss" scoped></style>
