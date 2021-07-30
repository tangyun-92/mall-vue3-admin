/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 16:28:24
 参数配置Form
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
          <el-form-item label="参数名称" prop="name">
            <el-input
              v-model.trim="formData.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数编号" prop="spp_id">
            <el-input
              v-model.trim="formData.spp_id"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否为数字参数" prop="numeric">
            <el-select v-model="formData.numeric" placeholder="请选择" clearable>
              <el-option
                v-for="item in whether"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
            <el-input
              v-model.trim="formData.unit"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否为通用参数" prop="generic">
            <el-select v-model="formData.generic" placeholder="请选择" clearable>
              <el-option
                v-for="item in whether"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否用于通用搜索" prop="searching">
            <el-select v-model="formData.searching" placeholder="请选择" clearable>
              <el-option
                v-for="item in whether"
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
          <el-form-item label="参数值" prop="segements">
            <el-input
              v-model.trim="formData.segements"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditCategoryParam } from '@/api/goods/category'
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
    },
    id: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      name: '',
      spg_id: null,
      spp_id: null,
      numeric: null,
      unit: '',
      generic: null,
      searching: null,
      segements: '',
      id: null
    })
    // 校验规则
    const rules = {
      spp_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
      numeric: [{ required: true, message: '不能为空', trigger: 'blur' }],
      generic: [{ required: true, message: '不能为空', trigger: 'blur' }],
      searching: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
            const res = await createOrEditCategoryParam({
              ...formData,
              spp_id: Number(formData.spp_id),
              spg_id: props.id
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
