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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model.trim="formData.username"
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
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model.trim="formData.email"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick_name">
        <el-input
          v-model.trim="formData.nick_name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model.trim="formData.note"
          type="textarea"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ifEnable } from '@/constants/dictionary'
import { defineProps, onMounted, reactive, ref, defineExpose } from 'vue'
import { createOrEditUser } from '@/api/system/admin'
import { ElMessage } from 'element-plus'

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
  username: '',
  status: '',
  email: '',
  nick_name: '',
  note: '',
  id: null
})
// 校验规则
const rules = {
  username: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
        const res = await createOrEditUser({
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
