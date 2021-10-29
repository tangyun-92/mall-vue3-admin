/*
 * @Author: 唐云
 * @Date: 2021-10-29 14:29:10
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-29 15:54:59
 商品审核 Form
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="100px"
      label-position="right"
      size="small"
    >
      <el-form-item label="审核" prop="status">
        <!-- <el-select v-model="formData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in verifyStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <el-radio-group v-model="formData.status">
          <el-radio label="1">通过</el-radio>
          <el-radio label="2">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="反馈详情" prop="detail">
        <el-input
          v-model.trim="formData.detail"
          type="textarea"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, defineExpose, onMounted, reactive } from 'vue'
import { verifyStatus } from '@/constants/dictionary'
import { ElMessage } from 'element-plus'
import { verifyProduct } from '@/api/good/product'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  }
})
const formData = reactive({
  product_id: null,
  status: null,
  detail: ''
})
const formRef = ref(null)
const rules = {
  status: [{ required: true, message: '不能为空', trigger: 'change' }],
  detail: [{ required: true, message: '不能为空', trigger: 'blur' }]
}

onMounted(() => {
  Object.keys(formData).forEach(key => {
    formData[key] = props.data[key]
  })
})

// 提交表单
const submit = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate(async valid => {
      if (valid) {
        const res = await verifyProduct(formData)
        ElMessage.success(res.message)
        resolve(res)
      } else {
        reject('表单校验未通过')
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
