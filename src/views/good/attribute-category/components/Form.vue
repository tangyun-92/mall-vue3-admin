/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-09 15:29:42
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
      <el-form-item label="类型名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineExpose, defineProps, onMounted, reactive, ref } from 'vue'
import { createOrEditAttributeCategory } from '@/api/good/attribute-category'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'

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
  }
})

const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
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
        const res = await createOrEditAttributeCategory({
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
