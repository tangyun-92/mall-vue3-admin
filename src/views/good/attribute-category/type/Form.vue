/*
 * @Author: 唐云
 * @Date: 2021-10-09 16:12:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-12 14:07:48
 */

<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="150px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="属性名称" prop="name">
            <el-input
              v-model.trim="formData.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品类型" prop="product_attribute_category_id">
            <el-select
              v-model="formData.product_attribute_category_id"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="属性是否可选" prop="select_type">
            <el-select
              v-model="formData.select_type"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in selectType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="属性录入方式" prop="input_type">
            <el-select
              v-model="formData.input_type"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in inputType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="可选值列表" prop="input_list">
            <el-input
              v-model.trim="formData.input_list"
              placeholder="请输入"
              type="textarea"
            ></el-input>
            <span style="color:red;">使用逗号隔开</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input
              v-model.trim="formData.sort"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类筛选样式" prop="filter_type">
            <el-select
              v-model="formData.filter_type"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in filterType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检索类型" prop="search_type">
            <el-select
              v-model="formData.search_type"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in searchType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否支持手动新增" prop="hand_add_status">
            <el-select
              v-model="formData.hand_add_status"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in handAddStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, onMounted, reactive, ref } from 'vue'
import { createOrEditAttribute } from '@/api/good/attribute'
import { ElMessage } from 'element-plus'
import { searchType, filterType, inputType, selectType, handAddStatus } from '@/constants/dictionary'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  status: {
    type: String,
    default: 'create'
  },
  id: {
    type: Number,
    default: null
  },
  type: {
    type: Number,
    default: null
  },
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
  product_attribute_category_id: null,
  select_type: null,
  input_type: null,
  input_list: '',
  sort: null,
  filter_type: null,
  search_type: null,
  hand_add_status: null,
  id: null
})
// 校验规则
const rules = {
  product_attribute_category_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '不能为空', trigger: 'blur' }]
}

onMounted(() => {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.data[key]
  })
  formData.product_attribute_category_id = props.id
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await createOrEditAttribute({
          ...formData,
          type: props.type
        })
        ElMessage.success(res.message)
        resolve(res)
      } else {
        resject('表单验证未通过')
      }
    })
  })
}

defineExpose({
  submit
})
</script>

<style lang='scss' scoped>
</style>
