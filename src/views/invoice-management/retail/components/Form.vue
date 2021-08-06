/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 17:16:53
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
      <el-form-item label="城市" prop="city_id">
        <el-cascader
          v-model="formData.city_id"
          :options="provinceCity"
          :props="cascaderProps"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model.trim="formData.address"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model.trim="formData.tel" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditShop } from '@/api/invoice-management/retail'
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
    },
    cascaderData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      city_id: '',
      address: '',
      tel: '',
      id: null
    })
    // 校验规则
    const rules = {
      city_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
      address: [{ required: true, message: '不能为空', trigger: 'blur' }],
      tel: [{ required: true, message: '不能为空', trigger: 'blur' }]
    }
    // 级联数据
    const provinceCity = computed(() => props.cascaderData)
    // 级联配置
    const cascaderProps = ref({
      label: 'name',
      value: 'id',
      checkStrictly: false,
      emitPath: false
    })

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
            const res = await createOrEditShop(formData)
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
      provinceCity,
      cascaderProps
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
