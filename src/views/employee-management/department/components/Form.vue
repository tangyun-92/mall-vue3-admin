/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by:   唐云
 * @Last Modified time: 2021-07-29 10:37:09
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
      <el-form-item label="部门名称" prop="dname">
        <el-input
          v-model.trim="formData.dname"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditDepartment } from '@/api/employee/department'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'DepartmentForm',
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
      dname: '',
      id: null
    })
    // 校验规则
    const rules = {
      dname: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
            const res = await createOrEditDepartment(formData)
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
