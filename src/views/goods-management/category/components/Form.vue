/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-29 17:03:04
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
      :disabled="status === 'details'"
    >
      <el-form-item label="品类名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="品类编号" prop="spg_id">
        <el-input
          v-model.trim="formData.spg_id"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditCategory } from '@/api/goods/category'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'EmployeeForm',
  props: {
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
  },
  setup(props) {
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      spg_id: '',
      name: '',
      id: ''
    })
    // 校验规则
    const rules = {
      spg_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
            const res = await createOrEditCategory(formData)
            ElMessage.success(res.message)
            resolve(res)
          } else {
            resject('表单验证未通过')
          }
        })
      })
    }

    return {
      rules,
      submit,
      formData,
      formRef
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
