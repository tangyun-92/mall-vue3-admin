/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-06 14:17:17
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="120px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商编号" prop="code">
            <el-input
              v-model.trim="formData.code"
              placeholder="请输入"
              :maxlength="8"
            ></el-input>
          </el-form-item>
          <el-form-item label="供货商名称" prop="name">
            <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in supplierType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="like_man">
            <el-input v-model.trim="formData.like_man" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="tel">
            <el-input
              v-model.trim="formData.tel"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户行名称" prop="bank_name">
            <el-input v-model.trim="formData.bank_name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行账号" prop="bank_account">
            <el-input
              v-model.trim="formData.bank_account"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.trim="formData.address" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditSupplier } from '@/api/invoice-management/supplier'
import { ElMessage } from 'element-plus'
import { ifEnable, supplierType } from '@/constants/dictionary'

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
      code: '',
      name: '',
      type: '',
      like_man: '',
      tel: '',
      bank_name: '',
      bank_account: '',
      address: '',
      status: '',
      id: null
    })
    // 校验规则
    const rules = {
      code: [{ required: true, message: '不能为空', trigger: 'blur' }],
      name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      type: [{ required: true, message: '不能为空', trigger: 'change' }],
      like_man: [{ required: true, message: '不能为空', trigger: 'blur' }],
      tel: [{ required: true, message: '不能为空', trigger: 'blur' }],
      address: [{ required: true, message: '不能为空', trigger: 'blur' }],
      status: [{ required: true, message: '不能为空', trigger: 'change' }]
    }

    onMounted(() => {
      Object.keys(formData).forEach((key) => {
        formData[key] = props.data[key]
      })
    })

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createOrEditSupplier(formData)
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
      ifEnable,
      supplierType
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
