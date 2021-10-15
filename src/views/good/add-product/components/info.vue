/*
 * @Author: 唐云
 * @Date: 2021-10-11 17:04:08
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-15 14:35:51
 填写商品信息
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      class="form-data"
      size="small"
    >
      <el-form-item label="商品分类" prop="product_category_id">
        <el-cascader
          v-model="formData.product_category_id"
          :options="productCategoryData"
          :props="cascaderProps"
          filterable
          @change="handleChangeCascader"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub_title">
        <el-input v-model="formData.sub_title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand_id">
        <el-select
          v-model="formData.brand_id"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in productBrandData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品货号" prop="product_sn">
        <el-input v-model="formData.product_sn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品售价" prop="price">
        <el-input v-model="formData.price" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="市场价" prop="original_price">
        <el-input v-model="formData.original_price" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input v-model="formData.stock" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="formData.unit" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="weight">
        <el-input v-model="formData.weight" placeholder="请输入"></el-input> 克
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getBrandMap } from '@/api/good/brand'
import { getGoodsCategory } from '@/api/good/category'
import { reactive, defineExpose, defineProps, onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
  },
  editId: null
})

const formRef = ref(null)
const rules = {
  product_category_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  sub_title: [{ required: true, message: '不能为空', trigger: 'blur' }],
  brand_id: [{ required: true, message: '不能为空', trigger: 'change' }]
}

// 从vuex中获取保存的商品信息
const productInfo = computed(() => store.state.baseData.productInfo)
const formData = computed(() => {
  return props.modelValue
})

onMounted(() => {
  getProductList()
  getBrandList()
})

/**
 * 商品分类数据
 */
const productCategoryData = ref([])
// 获取商品分类列表
const getProductList = () => {
  getGoodsCategory().then(res => {
    productCategoryData.value = res.data.records
  })
}
// 级联配置
const cascaderProps = reactive({
  value: 'id',
  label: 'name'
})
// 切换级联选择器
const handleChangeCascader = (arr) => {
  formData.value.product_category_id = arr[arr.length - 1]
}

/**
 * 商品品牌数据
 */
const productBrandData = ref([])
// 获取品牌列表
const getBrandList = () => {
  getBrandMap().then(res => {
    productBrandData.value = res.data.records
  })
}

const submit = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate(valid => {
      if (valid) {
        resolve()
      } else {
        reject('表单校验未通过')
      }
    })
  })
}

defineExpose({
  // formData,
  submit
})
</script>

<style lang='scss' scoped>
.form-data {
  width: 650px;
  margin: 20px auto;
}
.el-input, .el-select, .el-textarea {
  width: 500px;
}
</style>
