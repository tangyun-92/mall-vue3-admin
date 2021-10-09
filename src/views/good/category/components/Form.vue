/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 13:43:16
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="130px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="上级分类" prop="parent_id">
        <el-select v-model="formData.parent_id" placeholder="请选择" clearable>
          <el-option
            v-for="item in tableData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品单位" prop="product_unit">
        <el-input
          v-model.trim="formData.product_unit"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否显示在导航栏" prop="nav_status">
        <el-select v-model="formData.nav_status" placeholder="请选择" clearable>
          <el-option
            v-for="item in ifShow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示状态" prop="show_status">
        <el-select v-model="formData.show_status" placeholder="请选择" clearable>
          <el-option
            v-for="item in ifShow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model.trim="formData.sort"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input
          v-model.trim="formData.keywords"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model.trim="formData.description"
          type="textarea"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, onMounted, reactive, ref, computed } from 'vue'
import { createOrEditCategory } from '@/api/good/category'
import { ElMessage } from 'element-plus'
import { ifShow } from '@/constants/dictionary'

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
  tableData: {
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
  parent_id: null,
  product_unit: '',
  nav_status: null,
  show_status: null,
  sort: null,
  keywords: '',
  description: '',
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }]
}

onMounted(() => {
  Object.keys(formData).forEach(key => {
    formData[key] = props.data[key]
  })
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async valid => {
      if (valid) {
        const res = await createOrEditCategory({
          ...formData
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
