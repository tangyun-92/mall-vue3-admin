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
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in ifEnable"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import { defineProps, defineExpose, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditRole } from '@/api/system/role'
import { ElMessage } from 'element-plus'
import { ifEnable } from '@/constants/dictionary'

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
  description: '',
  status: '',
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '不能为空', trigger: 'change' }]
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
        const res = await createOrEditRole(formData)
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
