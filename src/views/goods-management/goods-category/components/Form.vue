/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 13:55:31
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
      <el-form-item label="上级分类id" prop="parent_id">
        <el-input
          v-model.trim="formData.parent_id"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否有下级分类" prop="if_parent">
        <el-select v-model="formData.if_parent" placeholder="请选择" clearable>
          <el-option
            v-for="item in whether"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排名指数" prop="sort">
        <el-input
          v-model.trim="formData.sort"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditCategory } from '@/api/goods/goods-category'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'

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
      name: '',
      parent_id: null,
      if_parent: '',
      sort: '',
      id: null
    })
    // 校验规则
    const rules = {
      name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      if_parent: [{ required: true, message: '不能为空', trigger: 'change' }],
      sort: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
              ...formData,
              sort: Number(formData.sort)
            })
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
      formRef,
      whether
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
